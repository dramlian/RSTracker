using RSTracker.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RSTracker.Helpers;

public class PlayerHelper
{
    private readonly PlayerDbContext _context;
    private readonly BlobLogger _blobLogger;
    public PlayerHelper(PlayerDbContext context, BlobLogger blobLogger)
    {
        _context = context;
        _blobLogger = blobLogger;
    }

    public async Task AddPlayerToDb(PlayerInput player)
    {
        await _blobLogger.LogAsync($"Adding player {JsonConvert.SerializeObject(player)}");
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
        await _blobLogger.LogAsync($"Deleting player with ID {playerId}");
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
        await _blobLogger.LogAsync($"Adding wellness data for player {playerId} {JsonConvert.SerializeObject(input)}");
        var player = _context.Players
        .Where(x => x.Id.Equals(playerId))
        .Include(p => p.WelnessRecords).FirstOrDefault();

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        Welness? welnessRecord = player.WelnessRecords
            .Where(x => x.Date.Equals(input.Date))
            .FirstOrDefault();

        if (welnessRecord != null)
        {
            _context.WelnessRecords.Remove(welnessRecord);
            await _context.SaveChangesAsync();
        }

        Welness newWelness = new Welness
            (input.MuscleStatus, input.RecoveryStatus,
            input.StressStatus, input.SleepStatus,
            input.Date);

        player.AddWelnessRecord(newWelness);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteWelness(int playerId, DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Deleting wellness data for player {playerId} on {dateTarget}");
        var player = _context.Players
            .Include(p => p.WelnessRecords)
            .FirstOrDefault(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }
        var welnessRecord = player.WelnessRecords?
            .Where(x => x.Date.Equals(dateTarget))
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
        await _blobLogger.LogAsync($"Adding RPE data for player {playerId} {JsonConvert.SerializeObject(input)}");
        var player = await _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefaultAsync(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        RPE? rpeRecord = player.RPERecords
            .Where(x => x.Date.Equals(input.Date))
            .FirstOrDefault();

        if (rpeRecord != null)
        {
            _context.RPEs.Remove(rpeRecord);
            await _context.SaveChangesAsync();
        }

        RPE newRpe = new RPE
            (input.IntervalInMinutes, input.Value, input.Date);

        player.AddRPERecord(newRpe);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteRPE(int playerId, DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Deleting RPE data for player {playerId} on {dateTarget}");
        var player = await _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefaultAsync(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        var rpeRecord = player.RPERecords?
            .Where(x => x.Date.Equals(dateTarget))
            .FirstOrDefault();

        if (rpeRecord == null)
        {
            throw new KeyNotFoundException("RPE record not found.");
        }
        _context.RPEs.Remove(rpeRecord);
        await _context.SaveChangesAsync();
    }

    public async Task<GetRPEWeekOutput> GetRPEOfLeagueWeek(DateOnly startDate)
    {
        IEnumerable<DateOnly> dates = Enumerable.Range(0, 7)
            .Select(i => startDate.AddDays(i));

        await _blobLogger.LogAsync($"Getting RPE data for league week starting with {startDate}");

        var returnDic = new List<GetRPEDayOutput>();
        foreach (var date in dates)
        {
            var rpe = await GetRPE(date);
            returnDic.Add(rpe);
        }
        return new GetRPEWeekOutput(returnDic);
    }

    public async Task<GetRPEDayOutput> GetRPE(DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Getting RPE data for league week {dateTarget}");

        var players = await _context.Players
            .Select(p => new
            {
                Player = p,
                RPE = p.RPERecords.FirstOrDefault(r => r.Date.Equals(dateTarget))
            })
            .ToListAsync();

        var outputPlayers = players.Select(x =>
            new GetRPEDayOutputPlayers(
                x.Player.Id,
                x.Player.Name,
                x.RPE
            )
        );

        return new GetRPEDayOutput(outputPlayers, dateTarget);
    }


    public async Task<GetWelnessWeekOutput> GetWelnessOfLeagueWeek(DateOnly startDate)
    {
        IEnumerable<DateOnly> dates = Enumerable.Range(0, 7)
            .Select(i => startDate.AddDays(i));

        await _blobLogger.LogAsync($"Getting wellness data for league week starting with {startDate}");

        var returnDic = new List<GetWelnessDayOutput>();
        foreach (var date in dates)
        {
            var welness = await GetWelness(date);
            returnDic.Add(welness);
        }
        return new GetWelnessWeekOutput(returnDic);
    }

    public async Task<GetWelnessDayOutput> GetWelness(DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Getting wellness data for league week {dateTarget}");

        var players = await _context.Players
            .Select(p => new
            {
                Player = p,
                Wellness = p.WelnessRecords.FirstOrDefault(w => w.Date.Equals(dateTarget))
            })
            .ToListAsync();

        var outputPlayers = players.Select(x =>
            new GetWelnessDayOutputPlayers(
                x.Player.Id,
                x.Player.Name,
                x.Wellness
            )
        );

        return new GetWelnessDayOutput(outputPlayers, dateTarget);
    }


    public async Task<List<Player>> GetAllPlayers()
    {
        await _blobLogger.LogAsync($"Getting all players");
        var players = await _context.Players.ToListAsync();
        return players;
    }
}