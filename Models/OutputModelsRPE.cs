namespace RSTracker.Models;
public class GetRPEOfaDayOutput
{
    public double totalRPEAverage { get; set; }
    public double volume { get; set; }
    public double intensity { get; set; }
    public int commonTime { get; set; }
    public IEnumerable<GetRPEOfaDayOutputPlayers>? outcomeplayers { get; set; }

    public GetRPEOfaDayOutput(IEnumerable<GetRPEOfaDayOutputPlayers> players)
    {
        if (!players.Any()) return;
        outcomeplayers = players;
        totalRPEAverage = Math.Round(players.SelectMany(x => x.rpeRecords).Select(x => x.TotalRpeValue).Sum() / (double)players.Count(), 1);
        commonTime = players.SelectMany(x => x.rpeRecords).Select(x => x.IntervalInMinutes).Sum() / players.Count();
        volume = Math.Round(totalRPEAverage / 760 * 100, 2);
        intensity = Math.Round(volume / (commonTime / 95.0), 2);
    }
}

public class GetRPEOfaDayOutputPlayers
{
    public int id { get; set; }
    public string name { get; set; } = null!;
    public IEnumerable<RPE> rpeRecords { get; set; } = null!;

    public GetRPEOfaDayOutputPlayers(int id, string name, IEnumerable<RPE> rpeRecords)
    {
        this.id = id;
        this.name = name;
        this.rpeRecords = rpeRecords;
    }
}

public class RpeDataOutput
{
    public double Volume { get; set; }
    public double Intensity { get; set; }

    public RpeDataOutput(double volume, double intensity)
    {
        Volume = volume;
        Intensity = intensity;
    }
}
