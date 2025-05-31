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
        public DateOnly Date { get; set; }
        public int TotalRpeValue { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; } = null!;

        public RPE(int intervalInMinutes, int rpevalue, DateOnly date)
        {
            IntervalInMinutes = intervalInMinutes;
            Rpevalue = rpevalue;
            Date = date;
            TotalRpeValue = rpevalue * intervalInMinutes;
        }
    }
}
