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

        [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
        public int LeagueWeek { get; set; }

        public DateOnly Date { get; set; }

        public RPE(int intervalInMinutes, int value, int leagueWeek, DateOnly date)
        {
            IntervalInMinutes = intervalInMinutes;
            Value = value;
            LeagueWeek = leagueWeek;
            Date = date;
        }
    }
}
