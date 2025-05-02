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

    public async Task AddPlayerToDb(PlayerInput player)
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

    public async Task DeletePlayer(int playerId)
    {
        var player = _context.Players.Where(x => x.Id.Equals(playerId)).FirstOrDefault();
        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }
        _context.Players.Remove(player);
        await _context.SaveChangesAsync();
    }

    public async Task AddWelnessToDb(int playerId, WelnessInput input)
    {
        var player = _context.Players
        .Where(x => x.Id.Equals(playerId))
        .Include(p => p.WelnessRecords).FirstOrDefault();

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        if (player.WelnessRecords != null && player.WelnessRecords.Any(x => x.DayOfWeek.Equals(input.DayOfWeek) && x.LeagueWeek.Equals(input.LeagueWeek)))
        {
            throw new ArgumentException("Welness record already exists for this player.");
        }

        Welness newWelness = new Welness
            (input.MuscleStatus, input.RecoveryStatus,
            input.StressStatus, input.SleepStatus,
            input.Date, input.LeagueWeek,
            input.DayOfWeek);

        player.AddWelnessRecord(newWelness);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteWelness(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
    {
        var player = _context.Players
            .Include(p => p.WelnessRecords)
            .FirstOrDefault(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }
        var welnessRecord = player.WelnessRecords?
            .Where(x => x.DayOfWeek.Equals(dayOfWeek) && x.LeagueWeek.Equals(LeagueWeek))
            .FirstOrDefault();

        if (welnessRecord == null)
        {
            throw new KeyNotFoundException("Wellness record not found.");
        }

        _context.WelnessRecords.Remove(welnessRecord);
        await _context.SaveChangesAsync();
    }

    public async Task AddRPEToDb(int playerId, RpeInput input)
    {
        var player = await _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefaultAsync(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        if (player.RPERecords != null && player.RPERecords.Any(x => x.DayOfWeek.Equals(input.DayOfWeek) && x.LeagueWeek.Equals(input.LeagueWeek)))
        {
            throw new ArgumentException("RPE record already exists for this player.");
        }

        RPE newRpe = new RPE
            (input.IntervalInMinutes, input.Value,
            input.LeagueWeek, input.Date, input.DayOfWeek);
        player.AddRPERecord(newRpe);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteRPE(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
    {
        var player = await _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefaultAsync(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        var rpeRecord = player.RPERecords?
            .Where(x => x.DayOfWeek.Equals(dayOfWeek) && x.LeagueWeek.Equals(LeagueWeek))
            .FirstOrDefault();

        if (rpeRecord == null)
        {
            throw new KeyNotFoundException("RPE record not found.");
        }
        _context.RPEs.Remove(rpeRecord);
        await _context.SaveChangesAsync();
    }

    public async Task<GetWelnessOfaDayOutput> GetWelness(int leagueweek, DayOfWeekEnum dayofweek)
    {
        var players = await _context.Players
            .Select(p => new GetWelnessOfaDayOutputPlayers(
                p.Id,
                p.Name,
                p.WelnessRecords
                    .Where(w => w.LeagueWeek == leagueweek && w.DayOfWeek == dayofweek)
                    .ToList()
            ))
            .ToListAsync();

        return new GetWelnessOfaDayOutput(players.Where(x => x.welnessrecords.Any()));
    }


    public async Task<Dictionary<string, double>> GetWelnessOfaWeek(int leagueweek, DayOfWeekEnum start, DayOfWeekEnum end)
    {
        var daysRange = Enumerable.Range((int)start, (int)end - (int)start + 1).ToArray();
        Dictionary<string, double> returnDic = new();
        foreach (var day in daysRange)
        {
            var welness = (await GetWelness(leagueweek, (DayOfWeekEnum)day)).totalWelnessAverage;
            returnDic.Add(((DayOfWeekEnum)day).ToString(), welness);
        }
        return returnDic;
    }
}