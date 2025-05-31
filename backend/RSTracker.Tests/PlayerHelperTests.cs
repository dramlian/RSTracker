using RSTracker.Helpers;
using RSTracker.Models;

namespace RSTracker.Tests;

public class PlayerHelperTests : IClassFixture<TestFixture>
{
    private readonly PlayerHelper playerHelper;

    public PlayerHelperTests(TestFixture fixture)
    {
        playerHelper = new PlayerHelper(fixture.ContextFactory, fixture.BlobLogger, fixture.CacheService);
    }

    [Fact]
    public async Task AddPlayerToDb_ShouldAddPlayer()
    {
        var player = new PlayerInput(
            Name: "Lionel Messi",
            Age: 36,
            Position: "Forward",
            Weight: 72,
            Height: 170
        );

        await playerHelper.AddPlayerToDb(player);

        var players = await playerHelper.GetAllPlayers();

        Assert.Single(players);
        Assert.Equal("Lionel Messi", players.First().Name);
    }

    [Fact]
    public async Task DeletePlayer_ShouldRemovePlayer()
    {
        var player = new PlayerInput(
            Name: "Cristiano Ronaldo",
            Age: 39,
            Position: "Forward",
            Weight: 85,
            Height: 187
        );

        await playerHelper.AddPlayerToDb(player);
        var players = await playerHelper.GetAllPlayers();
        var playerId = players.First().Id;

        await playerHelper.DeletePlayer(playerId);
        var remainingPlayers = await playerHelper.GetAllPlayers();

        Assert.DoesNotContain(remainingPlayers, p => p.Id == playerId);
    }

}
