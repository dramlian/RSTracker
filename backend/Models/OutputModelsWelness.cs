namespace RSTracker.Models;

public class GetWelnessWeekOutput
{
    public Dictionary<int, GetWelnessDayOutput> Days { get; }
    public double TotalWeekWelness { get; }
    public double AverageThree { get; }
    public GetWelnessWeekOutput(List<(DayOfWeek, GetWelnessDayOutput)> days)
    {
        Days = days.ToDictionary(x => (int)x.Item1, y => y.Item2);
        TotalWeekWelness = days.Select(x => x.Item2).Sum(x => x.TotalWelnessAverage);
        AverageThree = Math.Round(days.Where(x => x.Item1 == DayOfWeek.Wednesday || x.Item1 == DayOfWeek.Thursday || x.Item1 == DayOfWeek.Friday).Sum(x => x.Item2.TotalWelnessAverage) / 3, 1);
    }
}

public class GetWelnessDayOutput
{
    public double MuscleAverage { get; }
    public double RecoveryAverage { get; }
    public double StressAverage { get; }
    public double SleepAverage { get; }
    public double TotalWelnessAverage { get; }
    public IEnumerable<GetWelnessDayOutputPlayers> OutcomePlayers { get; }

    public GetWelnessDayOutput(IEnumerable<GetWelnessDayOutputPlayers> players)
    {
        OutcomePlayers = players.OrderBy(x => x.Id).ToList();
        var evalPlayers = OutcomePlayers.Where(x => !x.NoData).ToList();

        if (!evalPlayers.Any()) return;

        MuscleAverage = Math.Round(evalPlayers.Average(x => x.Muscle), 1);
        RecoveryAverage = Math.Round(evalPlayers.Average(x => x.Recovery), 1);
        StressAverage = Math.Round(evalPlayers.Average(x => x.Stress), 1);
        SleepAverage = Math.Round(evalPlayers.Average(x => x.Sleep), 1);
        TotalWelnessAverage = Math.Round(MuscleAverage + RecoveryAverage + StressAverage + SleepAverage, 1);
    }
}


public class GetWelnessDayOutputPlayers
{
    public int Id { get; }
    public string Name { get; }
    public int Muscle { get; }
    public int Recovery { get; }
    public int Stress { get; }
    public int Sleep { get; }

    public bool NoData => Muscle == 0 && Recovery == 0 && Stress == 0 && Sleep == 0;

    public GetWelnessDayOutputPlayers(int id, string name, Welness? welnessRecord)
    {
        Id = id;
        Name = name;
        Muscle = welnessRecord?.MuscleStatus ?? 0;
        Recovery = welnessRecord?.RecoveryStatus ?? 0;
        Stress = welnessRecord?.StressStatus ?? 0;
        Sleep = welnessRecord?.SleepStatus ?? 0;
    }
}

