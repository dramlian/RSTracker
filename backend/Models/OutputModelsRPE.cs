using System.Text.Json.Serialization;
namespace RSTracker.Models;

public class GetRPEWeekOutput
{
    public IEnumerable<GetRPEDayOutput> Days { get; }
    public double TotalWeekVolume { get; }
    public double TotalWeekIntensity { get; }
    public double TotalWeekRpe { get; }
    public IEnumerable<DayAverage> Norms { get; }
    public IEnumerable<DayAverage> TotalWeekAverages { get; }

    public GetRPEWeekOutput(List<GetRPEDayOutput> days)
    {
        Days = days;
        int dayCount = days.Count;
        TotalWeekAverages = days.Select(x => new DayAverage(x.DayOfWeek, x.TotalAverage));
        days = days.Where(x => !x.NoData).ToList();
        TotalWeekVolume = Math.Round(days.Sum(x => x.Volume) / dayCount, 2);
        TotalWeekIntensity = Math.Round(days.Sum(x => x.Intensity) / dayCount, 2);
        TotalWeekRpe = Math.Round(days.Sum(x => x.TotalAverage), 2);

        Norms = new List<DayAverage>
        {
            new DayAverage(DayOfWeek.Monday, 300),
            new DayAverage(DayOfWeek.Tuesday, 600),
            new DayAverage(DayOfWeek.Wednesday, 580),
            new DayAverage(DayOfWeek.Thursday, 110),
            new DayAverage(DayOfWeek.Friday, 220),
            new DayAverage(DayOfWeek.Saturday, 760),
            new DayAverage(DayOfWeek.Sunday, 0)
        };
        Norms = Norms.OrderBy(x => TotalWeekAverages.Select(x => x.day).ToList().IndexOf(x.day));
    }

    public class DayAverage
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DayOfWeek day { get; set; }
        public double average { get; set; }


        public DayAverage(DayOfWeek day, double average)
        {
            this.day = day;
            this.average = average;
        }

    }
}

public class GetRPEDayOutput
{
    public DayOfWeek DayOfWeek { get; }
    public string DayOfWeekString { get; }
    public DateOnly Date { get; }
    public double TotalAverage { get; }
    public double Volume { get; }
    public double Intensity { get; }
    public int CommonTime { get; }
    public bool NoData { get; }
    public IEnumerable<GetRPEDayOutputPlayers> OutcomePlayers { get; }

    public GetRPEDayOutput(IEnumerable<GetRPEDayOutputPlayers> players, DateOnly day)
    {
        DayOfWeek = day.DayOfWeek;
        DayOfWeekString = day.ToString("dddd");
        Date = day;
        OutcomePlayers = players.OrderBy(x => x.Id).ToList();
        NoData = OutcomePlayers.All(x => x.NoData);

        var evalData = players
            .Where(x => !x.NoData)
            .Select(x => new { x.TotalValue, x.Duration })
            .ToList();

        var count = evalData.Count;
        if (count == 0) return;

        var totalSum = evalData.Sum(x => x.TotalValue);
        var durationSum = evalData.Sum(x => x.Duration);

        TotalAverage = Math.Round((double)totalSum / count, 1);
        CommonTime = durationSum / count;
        Volume = Math.Round(TotalAverage / 760 * 100, 2);
        Intensity = Math.Round(Volume / (CommonTime / 95.0), 2);
    }
}

public class GetRPEDayOutputPlayers
{
    public int Id { get; }
    public string Name { get; }
    public int Value { get; }
    public int Duration { get; }
    public int TotalValue { get; }
    public bool NoData => Value == 0 && Duration == 0 && TotalValue == 0;

    public GetRPEDayOutputPlayers(int id, string name, RPE? rpeRecord)
    {
        Id = id;
        Name = name;
        Value = rpeRecord?.Rpevalue ?? 0;
        Duration = rpeRecord?.IntervalInMinutes ?? 0;
        TotalValue = rpeRecord?.TotalRpeValue ?? 0;
    }
}

