using Microsoft.EntityFrameworkCore;

namespace RSTracker.Tests;

public class PlayerHelperTests : IClassFixture<PostgresTestContainerFixture>
{
    private readonly IDbContextFactory<PlayerDbContext>? _contextFactory;

    public PlayerHelperTests(PostgresTestContainerFixture fixture)
    {
        _contextFactory = fixture.ContextFactory;
    }

    [Fact]
    public async Task TestEmptyDatabase()
    {

    }
}
