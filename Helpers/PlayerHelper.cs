using RSTracker.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task DeletePlayer(int playerId)
    {
        try
        {
            var player = _context.Players.Where(x => x.Id.Equals(playerId)).FirstOrDefault();
            if (player == null)
            {
                throw new HttpRequestException("Player not found.");
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while deleting the player from the database.", ex);
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

    public async Task DeleteWelness(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
    {
        try
        {
            var player = await _context.Players
                .Include(p => p.WelnessRecords)
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
            {
                throw new HttpRequestException("Player not found.");
            }
            var welnessRecord = player.WelnessRecords?
                .Where(x => x.DayOfWeek.Equals(dayOfWeek) && x.LeagueWeek.Equals(LeagueWeek))
                .FirstOrDefault();

            if (welnessRecord == null)
            {
                throw new HttpRequestException("Wellness record not found.");
            }

            _context.WelnessRecords.Remove(welnessRecord);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while deleting the wellness data from the database.", ex);
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

    public async Task DeleteRPE(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
    {
        try
        {
            var player = await _context.Players
                .Include(p => p.RPERecords)
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
            {
                throw new HttpRequestException("Player not found.");
            }

            var rpeRecord = player.RPERecords?
                .Where(x => x.DayOfWeek.Equals(dayOfWeek) && x.LeagueWeek.Equals(LeagueWeek))
                .FirstOrDefault();

            if (rpeRecord == null)
            {
                throw new HttpRequestException("RPE record not found.");
            }
            _context.RPEs.Remove(rpeRecord);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("An error occurred while deleting the RPE data from the database.", ex);
        }
    }
}