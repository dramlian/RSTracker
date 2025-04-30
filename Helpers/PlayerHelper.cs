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

    public async Task AddWelnessToDbAsync(int playerId, WelnessInput input)
    {
        try
        {
            var player = _context.Players.Where(x => x.Id.Equals(playerId)).FirstOrDefault();
            if (player == null)
            {
                throw new HttpRequestException("Player not found.");
            }

            Welness newWelness = new Welness
                (input.MuscleStatus, input.RecoveryStatus,
                input.StressStatus, input.SleepStatus,
                input.Date, input.LeagueWeek,
                input.DayOfWeek);

            player.AddWelnessRecord(newWelness);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while adding the wellness data to the database.", ex);
        }
    }

    public async Task AddRpeToDbAsync(int playerId, RpeInput input)
    {
        try
        {
            var player = _context.Players.Where(x => x.Id.Equals(playerId)).FirstOrDefault();
            if (player == null)
            {
                throw new HttpRequestException("Player not found.");
            }

            RPE newRpe = new RPE
                (input.IntervalInMinutes, input.Value,
                input.LeagueWeek, input.Date, input.DayOfWeek);
            player.AddRPERecord(newRpe);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while adding the RPE data to the database.", ex);
        }
    }
}