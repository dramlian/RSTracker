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
    public async Task GetRPEOfLeagueWeek_ShouldReturnCorrectAggregatedValues()
    {
        var player = new PlayerInput("Test Player", 25, "Midfield", 75, 180);
        await rpeManager.AddPlayerToDb(player);
        var players = await rpeManager.GetAllPlayers();
        var playerId = players.First().Id;
        var startDate = DateOnly.FromDateTime(DateTime.Today);

        await rpeManager.AddRPEToDb(playerId, new RpeInput(60, 760, startDate));
        await rpeManager.AddRPEToDb(playerId, new RpeInput(95, 1520, startDate.AddDays(2)));
        await rpeManager.AddRPEToDb(playerId, new RpeInput(120, 1140, startDate.AddDays(5)));

        var weekRpe = await rpeManager.GetRPEOfLeagueWeek(startDate);
        var rpeDays = weekRpe.Days.ToDictionary(r => r.Date);

        var day1 = rpeDays[startDate];
        Assert.Equal(startDate.DayOfWeek, day1.DayOfWeek);
        Assert.Equal(startDate.ToString("dddd"), day1.DayOfWeekString);
        Assert.Equal(startDate, day1.Date);
        Assert.False(day1.NoData);

        Assert.Equal(45600, day1.TotalAverage);
        Assert.Equal(60, day1.CommonTime);
        Assert.Equal(6000, day1.Volume);
        Assert.Equal(9500, day1.Intensity);

        var dayNoData = rpeDays[startDate.AddDays(1)];
        Assert.True(dayNoData.NoData);

        var day3 = rpeDays[startDate.AddDays(2)];
        Assert.Equal(144400, day3.TotalAverage);
        Assert.Equal(95, day3.CommonTime);
        Assert.Equal(19000, day3.Volume);
        Assert.Equal(Math.Round(day3.Volume / (day3.CommonTime / 95.0), 2), day3.Intensity);
    }

}
