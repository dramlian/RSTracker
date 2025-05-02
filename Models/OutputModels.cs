namespace RSTracker.Models;

public class GetWelnessOfaDayOutput
{
    public double muscleAverage { get; set; }
    public double recoveryAverage { get; set; }
    public double stressAverage { get; set; }
    public double sleepAverage { get; set; }
    public double totalWelnessAverage { get; set; }
    public IEnumerable<GetWelnessOfaDayOutputPlayers> outcomeplayers { get; set; }


    public GetWelnessOfaDayOutput(IEnumerable<GetWelnessOfaDayOutputPlayers> players)
    {
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