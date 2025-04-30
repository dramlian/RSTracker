using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class Welness // Changed from 'record' to 'class' for EF Core compatibility
    {
        public Welness() { }

        // Primary key should be mutable
        [Key]
        public int Id { get; set; }

        // Changed 'init' to regular properties with getters and setters
        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int MuscleStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int RecoveryStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int StressStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int SleepStatus { get; set; }

        [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
        public int LeagueWeek { get; set; }

        // Changed to a mutable property
        public DateOnly Date { get; set; }

        // Constructor to initialize properties
        public Welness(int muscleStatus, int recoveryStatus, int stressStatus, int sleepStatus, DateOnly date, int leagueWeek)
        {
            MuscleStatus = muscleStatus;
            RecoveryStatus = recoveryStatus;
            StressStatus = stressStatus;
            SleepStatus = sleepStatus;
            LeagueWeek = leagueWeek;
            Date = date; // Use Date instead of _date
        }
    }
}
