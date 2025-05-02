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

        public ICollection<Welness> WelnessRecords { get; set; } = new List<Welness>();
        public ICollection<RPE> RPERecords { get; set; } = new List<RPE>();

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
            WelnessRecords.Add(welness);
        }

        public void AddRPERecord(RPE rpe)
        {
            RPERecords.Add(rpe);
        }
    }
}
