using RSTracker.Helpers;
using RSTracker.Models;
using Newtonsoft.Json;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;

public class WelnessManager : PlayerHelper
{
    public WelnessManager(IDbContextFactory<PlayerDbContext> contextFactory, BlobLogger blobLogger, CacheService cacheService)
        : base(contextFactory, blobLogger, cacheService)
    {
    }

    private string GetCacheKey(int playerId, DateOnly date) =>
        $"welness_{playerId}_{date:yyyyMMdd}";

    public async Task AddWelnessToDb(int playerId, WelnessInput input)
    {
        await _blobLogger.LogAsync($"Adding wellness data for player {playerId} {JsonConvert.SerializeObject(input)}");

        var player = _context.Players
            .Where(x => x.Id.Equals(playerId))
            .Include(p => p.WelnessRecords)
            .FirstOrDefault();

        if (player == null)
            throw new KeyNotFoundException("Player not found.");

        var existingRecord = player.WelnessRecords
            .FirstOrDefault(x => x.Date.Equals(input.Date));

        if (existingRecord != null)
        {
            _context.WelnessRecords.Remove(existingRecord);
            await _context.SaveChangesAsync();
        }

        Welness newWelness = new Welness(
            input.MuscleStatus, input.RecoveryStatus,
            input.StressStatus, input.SleepStatus,
            input.Date);

        player.AddWelnessRecord(newWelness);
        await _context.SaveChangesAsync();

        _cacheService.Remove(GetCacheKey(playerId, input.Date));
    }

    public async Task<GetWelnessWeekOutput> GetWelnessOfLeagueWeek(DateOnly startDate)
    {
        var dates = Enumerable.Range(0, 7)
            .Select(i => startDate.AddDays(i))
            .ToList();

        await _blobLogger.LogAsync($"Getting wellness data for league week starting with {startDate}");

        var tasks = dates.Select(date => GetWelness(date));
        var results = await Task.WhenAll(tasks);

        return new GetWelnessWeekOutput(results.OrderBy(x => x.Date));
    }

    public async Task<GetWelnessDayOutput> GetWelness(DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Getting wellness data for league day {dateTarget}");

        using var context = _contextFactory.CreateDbContext();
        var players = await context.Players.ToListAsync();

        var outputPlayers = new ConcurrentBag<GetWelnessDayOutputPlayers>();

        var tasks = players.Select(async player =>
        {
            var wellness = await _cacheService.GetAsync(GetCacheKey(player.Id, dateTarget), async () =>
            {
                using var innerContext = _contextFactory.CreateDbContext();
                return await innerContext.WelnessRecords
                    .Where(w => EF.Property<int>(w, "PlayerId") == player.Id && w.Date == dateTarget)
                    .FirstOrDefaultAsync() ?? new Welness();
            });

            outputPlayers.Add(new GetWelnessDayOutputPlayers(
                player.Id,
                player.Name,
                wellness
            ));
        });

        await Task.WhenAll(tasks);

        return new GetWelnessDayOutput(outputPlayers, dateTarget);
    }

    public async Task DeleteWelness(int playerId, DateOnly dateTarget)
    {
        await _blobLogger.LogAsync($"Deleting wellness data for player {playerId} on {dateTarget}");

        var player = _context.Players
            .Include(p => p.WelnessRecords)
            .FirstOrDefault(p => p.Id == playerId);

        if (player == null)
            throw new KeyNotFoundException("Player not found.");

        var welnessRecord = player.WelnessRecords?
            .FirstOrDefault(x => x.Date.Equals(dateTarget));

        if (welnessRecord == null)
            throw new KeyNotFoundException("Wellness record not found.");

        _context.WelnessRecords.Remove(welnessRecord);
        await _context.SaveChangesAsync();

        _cacheService.Remove(GetCacheKey(playerId, dateTarget));
    }
}
