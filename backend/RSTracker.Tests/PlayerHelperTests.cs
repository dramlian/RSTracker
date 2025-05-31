using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Configurations;
using Microsoft.EntityFrameworkCore;


namespace RSTracker.Tests;

public class PostgresTestContainerFixture : IAsyncLifetime
{
    public PostgreSqlTestcontainer Container { get; }

    public PlayerDbContext? DbContext { get; private set; }

    public PostgresTestContainerFixture()
    {
        Container = new TestcontainersBuilder<PostgreSqlTestcontainer>()
            .WithDatabase(new PostgreSqlTestcontainerConfiguration
            {
                Database = "testdb",
                Username = "postgres",
                Password = "postgres"
            })
            .WithImage("postgres:15")
            .WithCleanUp(true)
            .Build();
    }

    public async Task InitializeAsync()
    {
        await Container.StartAsync();

        var options = new DbContextOptionsBuilder<PlayerDbContext>()
            .UseNpgsql(Container.ConnectionString)
            .Options;

        DbContext = new PlayerDbContext(options);

        await DbContext.Database.MigrateAsync();
    }

    public async Task DisposeAsync()
    {
        await Container.StopAsync();
        await Container.DisposeAsync();
    }
}

public class PlayerHelperTests : IClassFixture<PostgresTestContainerFixture>
{
    private readonly PlayerDbContext? _context;

    public PlayerHelperTests(PostgresTestContainerFixture fixture)
    {
        _context = fixture.DbContext;
    }

    [Fact]
    public async Task TestEmptyDatabase()
    {
        var count = _context?.Players != null ? await _context.Players.CountAsync() : 0;
        Assert.Equal(0, count);
    }
}
