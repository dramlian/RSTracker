namespace RSTracker.Models;

public class GetRPEWeekOutput
{
    public Dictionary<int, GetRPEDayOutput> days { get; set; }

    public double totalWeekVolume { get; set; }
    public double totalWeekIntensity { get; set; }
    public double totalWeekRpe { get; set; }
    public Dictionary<int, int> norms { get; set; }
    public GetRPEWeekOutput(Dictionary<int, GetRPEDayOutput> days)
    {
        this.days = days;
        this.totalWeekVolume = Math.Round(days.Values.Sum(x => x.volume) / (double)days.Count, 2);
        this.totalWeekIntensity = Math.Round(days.Values.Sum(x => x.intensity) / (double)days.Count, 2);
        this.norms = new Dictionary<int, int>{
            { 1, 300 },
            { 2, 600 },
            { 3, 580 },
            { 4, 110 },
            { 5, 220 },
            { 6, 760 },
            { 7, 0 }
        };
        this.totalWeekRpe = Math.Round(days.Values.Sum(x => x.totalAverage), 2);
    }
}


public class GetRPEDayOutput
{
    public double totalAverage { get; set; }
    public double volume { get; set; }
    public double intensity { get; set; }
    public int commonTime { get; set; }
    public IEnumerable<GetRPEDayOutputPlayers>? outcomeplayers { get; set; }

    public GetRPEDayOutput(IEnumerable<GetRPEDayOutputPlayers> players)
    {
        if (!players.Any()) return;
        outcomeplayers = players.OrderBy(x => x.id);
        totalAverage = Math.Round(players.Select(x => x.totalvalue).Sum() / (double)players.Count(), 1);
        commonTime = players.Select(x => x.duration).Sum() / players.Count();
        volume = Math.Round(totalAverage / 760 * 100, 2);
        intensity = Math.Round(volume / (commonTime / 95.0), 2);
    }
}

public class GetRPEDayOutputPlayers
{
    public int id { get; set; }
    public string name { get; set; } = null!;
    public int value { get; set; }
    public int duration { get; set; }
    public int totalvalue { get; set; }
    public bool noData => value == 0 && duration == 0 && totalvalue == 0;

    public GetRPEDayOutputPlayers(int id, string name, RPE? rpeRecord)
    {
        this.id = id;
        this.name = name;
        this.value = rpeRecord?.Rpevalue ?? 0;
        this.duration = rpeRecord?.IntervalInMinutes ?? 0;
        this.totalvalue = rpeRecord?.TotalRpeValue ?? 0;

    }
}
