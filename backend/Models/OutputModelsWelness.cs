namespace RSTracker.Models;

public class GetWelnessWeekOutput
{
    public Dictionary<int, GetWelnessDayOutput> days { get; set; }
    public double totalWeekWelness { get; set; }
    public double averageThree { get; set; }
    public GetWelnessWeekOutput(Dictionary<DayOfWeek, GetWelnessDayOutput> days)
    {
        this.days = days.ToDictionary(x => (int)x.Key, y => y.Value);
        this.totalWeekWelness = days.Values.Sum(x => x.totalWelnessAverage);
        this.averageThree = Math.Round(days.Where(x => x.Key == DayOfWeek.Wednesday || x.Key == DayOfWeek.Thursday || x.Key == DayOfWeek.Friday).Sum(x => x.Value.totalWelnessAverage) / 3, 1);
    }
}

public class GetWelnessDayOutput
{
    public double muscleAverage { get; set; }
    public double recoveryAverage { get; set; }
    public double stressAverage { get; set; }
    public double sleepAverage { get; set; }
    public double totalWelnessAverage { get; set; }
    public IEnumerable<GetWelnessDayOutputPlayers>? outcomeplayers { get; set; }

    public GetWelnessDayOutput(IEnumerable<GetWelnessDayOutputPlayers> players)
    {
        if (!players.Any()) return;
        this.outcomeplayers = players.OrderBy(x => x.id);
        this.muscleAverage = Math.Round(players.Select(x => x.muscle).Sum() / (double)players.Count(), 1);
        this.recoveryAverage = Math.Round(players.Select(x => x.recovery).Sum() / (double)players.Count(), 1);
        this.stressAverage = Math.Round(players.Select(x => x.stress).Sum() / (double)players.Count(), 1);
        this.sleepAverage = Math.Round(players.Select(x => x.sleep).Sum() / (double)players.Count(), 1);
        this.totalWelnessAverage = Math.Round(muscleAverage + recoveryAverage + stressAverage + sleepAverage, 1);
    }
}

public class GetWelnessDayOutputPlayers
{
    public int id { get; set; }
    public string name { get; set; } = null!;
    public int muscle { get; set; }
    public int recovery { get; set; }
    public int stress { get; set; }
    public int sleep { get; set; }

    public bool noData => muscle == 0 && recovery == 0 && stress == 0 && sleep == 0;

    public GetWelnessDayOutputPlayers(int id, string name, Welness? welnessrecord)
    {
        this.id = id;
        this.name = name;
        this.muscle = welnessrecord?.MuscleStatus ?? 0;
        this.recovery = welnessrecord?.RecoveryStatus ?? 0;
        this.stress = welnessrecord?.StressStatus ?? 0;
        this.sleep = welnessrecord?.SleepStatus ?? 0;
    }

}
