using RSTracker.Models;
namespace RSTracker.Helpers;
public class PlayerHelper
{
    private readonly PlayerDbContext _context;
    public PlayerHelper(PlayerDbContext context)
    {
        _context = context;
    }

    public async Task AddPlayerToDbAsync(PlayerInput player)
    {
        try
        {
            Player newPlayer = new Player
            {
                Name = player.Name,
                Age = player.Age,
                Position = player.Position,
                Weight = player.Weight,
                Height = player.Height
            };

            await _context.Players.AddAsync(newPlayer);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while adding the player to the database.", ex);
        }
    }
}