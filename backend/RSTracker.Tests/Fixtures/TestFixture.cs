using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RSTracker.Abstractions;
using RSTracker.Services;


namespace RSTracker.Tests;

public class TestFixture : IAsyncLifetime
{
    public PostgreSqlTestcontainer Container { get; private set; } = null!;
    public IDbContextFactory<PlayerDbContext> ContextFactory { get; private set; } = null!;
    public ICacheService CacheService { get; private set; } = null!;
    public IBlobLogger BlobLogger { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        Container = new TestcontainersBuilder<PostgreSqlTestcontainer>()
            .WithDatabase(new PostgreSqlTestcontainerConfiguration
            {
                Database = "testdb",
                Username = "postgres",
                Password = "postgres"
            })
            .WithImage("postgres:15-alpine")
            // this image has to be also on the local machine, can be setup to be fetched automatically it just did not work
            .WithCleanUp(true)
            .Build();

        await Container.StartAsync();

        var services = new ServiceCollection();

        services.AddDbContextFactory<PlayerDbContext>(options =>
            options.UseNpgsql(Container.ConnectionString));

        services.AddMemoryCache();
        services.AddScoped<IBlobLogger, BlobLoggerMocked>();
        services.AddScoped<ICacheService, CacheService>();

        var provider = services.BuildServiceProvider();
        ContextFactory = provider.GetRequiredService<IDbContextFactory<PlayerDbContext>>();
        CacheService = provider.GetRequiredService<ICacheService>();
        BlobLogger = provider.GetRequiredService<IBlobLogger>();

        (await ContextFactory.CreateDbContextAsync()).Database.Migrate();
    }

    public async Task DisposeAsync()
    {
        await Container.DisposeAsync();
    }
}