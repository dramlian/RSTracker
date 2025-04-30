using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class RPE // Changed from 'record' to 'class' for EF Core compatibility
    {
        public RPE() { }

        // Primary key should be mutable, change readonly to property with a setter
        [Key]
        public int Id { get; set; }

        // Other fields should be mutable as well
        public int IntervalInMinutes { get; set; }
        public int Value { get; set; }

        [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
        public int LeagueWeek { get; set; }  // Changed from 'init' to a regular setter

        public DateOnly Date { get; set; }  // Made mutable by removing 'readonly'

        // Constructor with parameters to initialize properties
        public RPE(int intervalInMinutes, int value)
        {
            IntervalInMinutes = intervalInMinutes;
            Value = value;
        }
    }
}
