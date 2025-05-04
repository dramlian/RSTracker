using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class RPE
    {
        public RPE() { }

        [Key]
        public int Id { get; set; }
        public int IntervalInMinutes { get; set; }
        public int Rpevalue { get; set; }
        public int LeagueWeek { get; set; }
        public DateOnly Date { get; set; }
        public DayOfWeekEnum DayOfWeek { get; set; }
        public int TotalRpeValue { get; set; }

        public RPE(int intervalInMinutes, int rpevalue, int leagueWeek, DateOnly date, DayOfWeekEnum dayOfWeek)
        {
            IntervalInMinutes = intervalInMinutes;
            Rpevalue = rpevalue;
            LeagueWeek = leagueWeek;
            Date = date;
            DayOfWeek = dayOfWeek;
            TotalRpeValue = rpevalue * intervalInMinutes;
        }
    }
}
