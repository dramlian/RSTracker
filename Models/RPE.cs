using System.ComponentModel.DataAnnotations;
namespace RSTracker.Models;

public record RPE
{
    private readonly int _intervalInMinutes;
    private readonly int _value;

    [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
    public int LeagueWeek { get; init; }
    private readonly DateOnly _date;
    public RPE(int intervalInMinutes, int value)
    {
        _intervalInMinutes = intervalInMinutes;
        _value = value;
    }
}