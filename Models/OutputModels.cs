namespace RSTracker.Models;

public class GetWelnessOfaDayOutput
{
    public double muscleAverage { get; set; }
    public double recoveryAverage { get; set; }
    public double stressAverage { get; set; }
    public double sleepAverage { get; set; }
    public double totalWelnessAverage { get; set; }
    public IEnumerable<GetWelnessOfaDayOutputPlayers>? outcomeplayers { get; set; }


    public GetWelnessOfaDayOutput(IEnumerable<GetWelnessOfaDayOutputPlayers> players)
    {
        if (!players.Any()) return;
        outcomeplayers = players;
        muscleAverage = Math.Round(players.SelectMany(x => x.welnessrecords).Select(x => x.MuscleStatus).Sum() / (double)players.Count(), 1);
        recoveryAverage = Math.Round(players.SelectMany(x => x.welnessrecords).Select(x => x.RecoveryStatus).Sum() / (double)players.Count(), 1);
        stressAverage = Math.Round(players.SelectMany(x => x.welnessrecords).Select(x => x.StressStatus).Sum() / (double)players.Count(), 1);
        sleepAverage = Math.Round(players.SelectMany(x => x.welnessrecords).Select(x => x.SleepStatus).Sum() / (double)players.Count(), 1);
        totalWelnessAverage = Math.Round(muscleAverage + recoveryAverage + stressAverage + sleepAverage, 1);
    }
}

public class GetWelnessOfaDayOutputPlayers
{
    public int id { get; set; }
    public string name { get; set; } = null!;
    public IEnumerable<Welness> welnessrecords { get; set; } = null!;

    public GetWelnessOfaDayOutputPlayers(int id, string name, IEnumerable<Welness> welnessrecords)
    {
        this.id = id;
        this.name = name;
        this.welnessrecords = welnessrecords;
    }

}

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
