using System.ComponentModel.DataAnnotations;
namespace RSTracker.Models;

public record Welness
{
    [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
    public int MuscleStatus { get; init; }

    [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
    public int RecoveryStatus { get; init; }

    [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
    public int StressStatus { get; init; }

    [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
    public int SleepStatus { get; init; }

    [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
    public int LeagueWeek { get; init; }
    private readonly DateOnly _date;

    public Welness(int muscleStatus, int recoveryStatus, int stressStatus, int sleepStatus, DateOnly date, int leagueWeek)
    {
        MuscleStatus = muscleStatus;
        RecoveryStatus = recoveryStatus;
        StressStatus = stressStatus;
        SleepStatus = sleepStatus;
        LeagueWeek = leagueWeek;
        _date = date;
    }
}