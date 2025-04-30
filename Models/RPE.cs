using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class RPE
    {
        public RPE() { }

        [Key]
        public int Id { get; set; }
        public int IntervalInMinutes { get; set; }
        public int Value { get; set; }
        public int LeagueWeek { get; set; }
        public DateOnly Date { get; set; }
        public DayOfWeekEnum DayOfWeek { get; set; }

        public RPE(int intervalInMinutes, int value, int leagueWeek, DateOnly date, DayOfWeekEnum dayOfWeek)
        {
            IntervalInMinutes = intervalInMinutes;
            Value = value;
            LeagueWeek = leagueWeek;
            Date = date;
            DayOfWeek = dayOfWeek;
        }
    }
}
