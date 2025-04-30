using System.ComponentModel.DataAnnotations;

namespace RSTracker.Models
{
    public class Player
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Age { get; set; }
        public string Position { get; set; } = null!;
        public int Weight { get; set; }
        public int Height { get; set; }

        public IEnumerable<Welness>? WelnessRecords { get; set; }
        public IEnumerable<RPE>? RPERecords { get; set; }

        public Player() { }

        public Player(string name, int age, string position, int weight, int height)
        {
            Name = name;
            Age = age;
            Position = position;
            Weight = weight;
            Height = height;
        }

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
