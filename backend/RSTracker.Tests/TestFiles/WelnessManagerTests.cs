using RSTracker.Models;
using RSTracker.Tests;
public class WelnessManagerTests : IClassFixture<TestFixture>
{
    private readonly WelnessManager welnessManager;

    public WelnessManagerTests(TestFixture fixture)
    {
        welnessManager = new WelnessManager(fixture.ContextFactory, fixture.BlobLogger, fixture.CacheService);
    }

    [Fact]
    public async Task GetWelnessOfLeagueWeek_ShouldReturnCorrectAggregatedValues()
    {
        var playerInput = new PlayerInput("Test Player", 25, "Midfield", 75, 180);
        await welnessManager.AddPlayerToDb(playerInput);

        var players = await welnessManager.GetAllPlayers();
        var playerId = players.First().Id;

        var startDate = DateOnly.FromDateTime(DateTime.Today);

        await welnessManager.AddWelnessToDb(playerId, new WelnessInput(
            MuscleStatus: 4,
            RecoveryStatus: 3,
            StressStatus: 2,
            SleepStatus: 5,
            Date: startDate
        ));

        await welnessManager.AddWelnessToDb(playerId, new WelnessInput(
            MuscleStatus: 5,
            RecoveryStatus: 4,
            StressStatus: 3,
            SleepStatus: 4,
            Date: startDate.AddDays(2)
        ));

        await welnessManager.AddWelnessToDb(playerId, new WelnessInput(
            MuscleStatus: 3,
            RecoveryStatus: 2,
            StressStatus: 1,
            SleepStatus: 5,
            Date: startDate.AddDays(5)
        ));


        var weekWellness = await welnessManager.GetWelnessOfLeagueWeek(startDate);
        var days = weekWellness.Days.ToDictionary(d => d.Date);

        var day1 = days[startDate];
        Assert.Equal(startDate.DayOfWeek, day1.DayOfWeek);
        Assert.Equal(startDate.ToString("dddd"), day1.DayOfWeekString);
        Assert.Equal(startDate, day1.Date);
        Assert.False(day1.NoData);
        Assert.Equal(4, day1.MuscleAverage);
        Assert.Equal(3, day1.RecoveryAverage);
        Assert.Equal(2, day1.StressAverage);
        Assert.Equal(5, day1.SleepAverage);
        Assert.Equal(14, day1.TotalWelnessAverage);

        var dayNoData = days[startDate.AddDays(1)];
        Assert.True(dayNoData.NoData);

        var day3 = days[startDate.AddDays(2)];
        Assert.Equal(5, day3.MuscleAverage);
        Assert.Equal(4, day3.RecoveryAverage);
        Assert.Equal(3, day3.StressAverage);
        Assert.Equal(4, day3.SleepAverage);
        Assert.Equal(16, day3.TotalWelnessAverage);
    }
}
