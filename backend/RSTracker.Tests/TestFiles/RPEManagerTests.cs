using RSTracker.Tests;
using RSTracker.Models;
public class RPEManagerTests : IClassFixture<TestFixture>
{
    private readonly RPEManager rpeManager;

    public RPEManagerTests(TestFixture fixture)
    {
        rpeManager = new RPEManager(fixture.ContextFactory, fixture.BlobLogger, fixture.CacheService);
    }

    [Fact]
    public async Task GetRPEOfLeagueWeek_ShouldReturnRpeDataForAllDays()
    {
        var player = new PlayerInput("Test Player", 25, "Midfield", 75, 180);
        await rpeManager.AddPlayerToDb(player);
        var players = await rpeManager.GetAllPlayers();
        var playerId = players.First().Id;

        var startDate = DateOnly.FromDateTime(DateTime.Today);

        await rpeManager.AddRPEToDb(playerId, new RpeInput(60, 5, startDate));
        await rpeManager.AddRPEToDb(playerId, new RpeInput(60, 7, startDate.AddDays(2)));
        await rpeManager.AddRPEToDb(playerId, new RpeInput(60, 6, startDate.AddDays(5)));

        var weekRpe = await rpeManager.GetRPEOfLeagueWeek(startDate);

        Assert.Equal(7, weekRpe.Days.Count());
        var rpeDays = weekRpe.Days.ToDictionary(r => r.Date);

        Assert.True(rpeDays.ContainsKey(startDate));
        Assert.Equal(5, rpeDays[startDate].OutcomePlayers.First()?.Value);

        Assert.True(rpeDays.ContainsKey(startDate.AddDays(2)));
        Assert.Equal(7, rpeDays[startDate.AddDays(2)].OutcomePlayers.First()?.Value);

        Assert.True(rpeDays.ContainsKey(startDate.AddDays(5)));
        Assert.Equal(6, rpeDays[startDate.AddDays(5)].OutcomePlayers.First()?.Value);
    }

}
