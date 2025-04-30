using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class Player
    {
        // Primary key property should be mutable and not readonly
        [Key]
        public int Id { get; set; } // Change readonly field to a mutable property

        // Change readonly fields to properties with public setters
        public string Name { get; set; }
        public int Age { get; set; }
        public string Position { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }

        // Navigation properties (should also be mutable)
        public IEnumerable<Welness>? WelnessRecords { get; set; }
        public IEnumerable<RPE>? RPERecords { get; set; }

        // Default constructor is required by EF Core for materialization
        public Player() { }

        // Constructor with parameters to initialize properties
        public Player(string name, int age, string position, int weight, int height)
        {
            Name = name;
            Age = age;
            Position = position;
            Weight = weight;
            Height = height;
        }

        // Methods to add wellness and RPE records (as before)
        public void AddWelnessRecord(Welness welness)
        {
            if (WelnessRecords == null)
            {
                WelnessRecords = new List<Welness>();
            }
            ((List<Welness>)WelnessRecords).Add(welness);
        }

        public void AddRPERecord(RPE rpe)
        {
            if (RPERecords == null)
            {
                RPERecords = new List<RPE>();
            }
            ((List<RPE>)RPERecords).Add(rpe);
        }
    }
}
