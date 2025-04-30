using Microsoft.EntityFrameworkCore;
using RSTracker.Models;

public class PlayerDbContext : DbContext
{
    public PlayerDbContext(DbContextOptions<PlayerDbContext> options) : base(options) { }

    public DbSet<Player> Players { get; set; }
    public DbSet<RPE> RPEs { get; set; }
    public DbSet<Welness> WelnessRecords { get; set; }
}
