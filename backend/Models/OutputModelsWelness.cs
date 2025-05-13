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
        outcomeplayers = players.OrderBy(x => x.id);
        muscleAverage = Math.Round(players.Select(x => x.muscle).Sum() / (double)players.Count(), 1);
        recoveryAverage = Math.Round(players.Select(x => x.recovery).Sum() / (double)players.Count(), 1);
        stressAverage = Math.Round(players.Select(x => x.stress).Sum() / (double)players.Count(), 1);
        sleepAverage = Math.Round(players.Select(x => x.sleep).Sum() / (double)players.Count(), 1);
        totalWelnessAverage = Math.Round(muscleAverage + recoveryAverage + stressAverage + sleepAverage, 1);
    }
}

public class GetWelnessOfaDayOutputPlayers
{
    public int id { get; set; }
    public string name { get; set; } = null!;
    public int muscle { get; set; }
    public int recovery { get; set; }
    public int stress { get; set; }
    public int sleep { get; set; }

    public bool noData => muscle == 0 && recovery == 0 && stress == 0 && sleep == 0;

    public GetWelnessOfaDayOutputPlayers(int id, string name, Welness? welnessrecord)
    {
        this.id = id;
        this.name = name;
        this.muscle = welnessrecord?.MuscleStatus ?? 0;
        this.recovery = welnessrecord?.RecoveryStatus ?? 0;
        this.stress = welnessrecord?.StressStatus ?? 0;
        this.sleep = welnessrecord?.SleepStatus ?? 0;
    }

}
