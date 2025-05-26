namespace RSTracker.Models;

public class GetWelnessWeekOutput
{
    public IEnumerable<GetWelnessDayOutput> Days { get; }
    public double TotalWeekWelness { get; }
    public double AverageThree { get; }
    public GetWelnessWeekOutput(IEnumerable<GetWelnessDayOutput> days)
    {
        Days = days;
        days = days.Where(x => !x.NoData).ToList();
        TotalWeekWelness = days.Sum(x => x.TotalWelnessAverage);
        AverageThree = Math.Round(days.Where(x => x.DayOfWeek == DayOfWeek.Wednesday || x.DayOfWeek == DayOfWeek.Thursday || x.DayOfWeek == DayOfWeek.Friday).Sum(x => x.TotalWelnessAverage) / 3, 1);
    }
}

public class GetWelnessDayOutput
{
    public DayOfWeek DayOfWeek { get; }
    public string DayOfWeekString { get; }
    public DateOnly Date { get; }
    public double MuscleAverage { get; }
    public double RecoveryAverage { get; }
    public double StressAverage { get; }
    public double SleepAverage { get; }
    public double TotalWelnessAverage { get; }
    public bool NoData { get; }
    public IEnumerable<GetWelnessDayOutputPlayers> OutcomePlayers { get; }

    public GetWelnessDayOutput(IEnumerable<GetWelnessDayOutputPlayers> players, DateOnly day)
    {
        DayOfWeek = day.DayOfWeek;
        DayOfWeekString = day.ToString("dddd");
        Date = day;
        OutcomePlayers = players.OrderBy(x => x.Id).ToList();
        NoData = OutcomePlayers.All(x => x.NoData);

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

