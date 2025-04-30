using Microsoft.EntityFrameworkCore;
using RSTracker.Models;

public class PlayerDbContext : DbContext
{
    public PlayerDbContext(DbContextOptions<PlayerDbContext> options) : base(options) { }

    public DbSet<Player> Players { get; set; }
    public DbSet<RPE> RPEs { get; set; }
    public DbSet<Welness> WelnessRecords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>()
            .HasMany(p => p.RPERecords)
            .WithOne()
            .HasForeignKey("PlayerId")
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Player>()
            .HasMany(p => p.WelnessRecords)
            .WithOne()
            .HasForeignKey("PlayerId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
