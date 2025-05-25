using RSTracker.Helpers;
using RSTracker.Models;
using Newtonsoft.Json;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
public class RPEManager : PlayerHelper
{
    public RPEManager(IDbContextFactory<PlayerDbContext> contextFactory, BlobLogger blobLogger, CacheService cacheService)
        : base(contextFactory, blobLogger, cacheService)
    {
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
        var dates = Enumerable.Range(0, 7)
            .Select(i => startDate.AddDays(i))
            .ToList();

        await _blobLogger.LogAsync($"Getting RPE data for league week starting with {startDate}");

        var tasks = dates.Select(async date =>
        {
            return await GetRPE(date);
        });

        var results = await Task.WhenAll(tasks);
        return new GetRPEWeekOutput(results.OrderBy(x => x.Date));
    }


    public async Task<GetRPEDayOutput> GetRPE(DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Getting RPE data for league week {dateTarget}");

        using var context = _contextFactory.CreateDbContext();

        var players = await context.Players
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

}




