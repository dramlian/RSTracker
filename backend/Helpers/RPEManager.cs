using RSTracker.Helpers;
using RSTracker.Models;
using Newtonsoft.Json;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;

public class RPEManager : PlayerHelper
{
    public RPEManager(IDbContextFactory<PlayerDbContext> contextFactory, BlobLogger blobLogger, CacheService cacheService)
        : base(contextFactory, blobLogger, cacheService)
    {
    }

    public async Task AddRPEToDb(int playerId, RpeInput input)
    {
        await _blobLogger.LogAsync($"Adding RPE data for player {playerId} {JsonConvert.SerializeObject(input)}");

        var player = _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefault(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        var existingRecord = player.RPERecords
            .FirstOrDefault(x => x.Date.Equals(input.Date));

        if (existingRecord != null)
        {
            _context.RPEs.Remove(existingRecord);
            await _context.SaveChangesAsync();
        }

        RPE newRpe = new RPE(input.IntervalInMinutes, input.Value, input.Date);

        player.AddRPERecord(newRpe);
        await _context.SaveChangesAsync();

        _cacheService.Remove(GetCacheKey(playerId, input.Date, "rpe"));
    }

    public async Task DeleteRPE(int playerId, DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Deleting RPE data for player {playerId} on {dateTarget}");

        var player = _context.Players
            .Include(p => p.RPERecords)
            .FirstOrDefault(p => p.Id == playerId);

        if (player == null)
        {
            throw new KeyNotFoundException("Player not found.");
        }

        var rpeRecord = player.RPERecords?
            .FirstOrDefault(x => x.Date.Equals(dateTarget));

        if (rpeRecord == null)
        {
            throw new KeyNotFoundException("RPE record not found.");
        }

        _context.RPEs.Remove(rpeRecord);
        await _context.SaveChangesAsync();

        _cacheService.Remove(GetCacheKey(playerId, dateTarget, "rpe"));
    }

    public async Task<GetRPEWeekOutput> GetRPEOfLeagueWeek(DateOnly startDate)
    {
        var dates = Enumerable.Range(0, 7)
            .Select(i => startDate.AddDays(i))
            .ToList();

        await _blobLogger.LogAsync($"Getting RPE data for league week starting with {startDate}");

        var tasks = dates.Select(date => GetRPE(date));
        var results = await Task.WhenAll(tasks);

        return new GetRPEWeekOutput(results.OrderBy(x => x.Date));
    }

    public async Task<GetRPEDayOutput> GetRPE(DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Getting RPE data for league day {dateTarget}");

        using var context = _contextFactory.CreateDbContext();
        var players = await context.Players.ToListAsync();

        var outputPlayers = new ConcurrentBag<GetRPEDayOutputPlayers>();

        var tasks = players.Select(async player =>
        {
            var rpe = await _cacheService.GetAsync(GetCacheKey(player.Id, dateTarget, "rpe"), async () =>
            {
                using var innerContext = _contextFactory.CreateDbContext();
                return await innerContext.RPEs
                    .Where(r => EF.Property<int>(r, "PlayerId") == player.Id && r.Date == dateTarget)
                    .FirstOrDefaultAsync() ?? new RPE();
            });

            outputPlayers.Add(new GetRPEDayOutputPlayers(
                player.Id,
                player.Name,
                rpe
            ));
        });

        await Task.WhenAll(tasks);

        return new GetRPEDayOutput(outputPlayers, dateTarget);
    }
}
