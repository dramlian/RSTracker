using RSTracker.Helpers;
using RSTracker.Models;
using Newtonsoft.Json;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
public class WelnessManager : PlayerHelper
{

    public WelnessManager(IDbContextFactory<PlayerDbContext> contextFactory, BlobLogger blobLogger, CacheService cacheService)
        : base(contextFactory, blobLogger, cacheService)
    {
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

}