using RSTracker.Helpers;
using RSTracker.Models;
using Newtonsoft.Json;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
public class RPEManager : PlayerHelper
{
    public RPEManager(PlayerDbContext context, BlobLogger blobLogger, CacheService cacheService)
        : base(context, blobLogger, cacheService)
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


}




