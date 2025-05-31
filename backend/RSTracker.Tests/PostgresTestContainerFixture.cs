using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace RSTracker.Tests;

public class PostgresTestContainerFixture : IAsyncLifetime
{
    public PostgreSqlTestcontainer Container { get; private set; } = null!;
    public IDbContextFactory<PlayerDbContext> ContextFactory { get; private set; } = null!;

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
            .WithCleanUp(true)
            .Build();

        await Container.StartAsync();

        var services = new ServiceCollection();

        services.AddDbContextFactory<PlayerDbContext>(options =>
            options.UseNpgsql(Container.ConnectionString));

        ContextFactory = services.BuildServiceProvider()
            .GetRequiredService<IDbContextFactory<PlayerDbContext>>();
    }

    public async Task DisposeAsync()
    {
        await Container.DisposeAsync();
    }
}