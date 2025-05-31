using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class Welness
    {
        public Welness() { }

        [Key]
        public int Id { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int MuscleStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int RecoveryStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int StressStatus { get; set; }

        [Range(1, 7, ErrorMessage = "Value must be between 1 and 7.")]
        public int SleepStatus { get; set; }

        [Range(1, 52, ErrorMessage = "Value must be between 1 and 52.")]
        public DateOnly Date { get; set; }

        public int PlayerId { get; set; }
        public Player Player { get; set; } = null!;

        public Welness(int muscleStatus, int recoveryStatus, int stressStatus, int sleepStatus, DateOnly date)
        {
            MuscleStatus = muscleStatus;
            RecoveryStatus = recoveryStatus;
            StressStatus = stressStatus;
            SleepStatus = sleepStatus;
            Date = date;
        }
    }
}
