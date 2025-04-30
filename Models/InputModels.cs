namespace RSTracker.Models;

public record PlayerInput(
    int Id,
    string Name,
    int Age,
    string Position,
    int Weight,
    int Height
);

public record RpeInput
(
    int IntervalInMinutes,
    int Value,
    int LeagueWeek,
    DateOnly Date
);

public record WelnessInput
(
    int MuscleStatus,
    int RecoveryStatus,
    int StressStatus,
    int SleepStatus,
    int LeagueWeek,
    DateOnly Date
);
