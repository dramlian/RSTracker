using RSTracker.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RSTracker.Services;

namespace RSTracker.Helpers;

public class PlayerHelper
{
    protected readonly IDbContextFactory<PlayerDbContext> _contextFactory;
    protected readonly PlayerDbContext _context;
    protected readonly BlobLogger _blobLogger;
    protected readonly CacheService _cacheService;
    public PlayerHelper(IDbContextFactory<PlayerDbContext> contextFactory, BlobLogger blobLogger, CacheService cacheService)
    {
        _contextFactory = contextFactory;
        _context = contextFactory.CreateDbContext();
        _blobLogger = blobLogger;
        _cacheService = cacheService;
    }

    protected string GetCacheKey(int playerId, DateOnly date, string type)
    {
        return $"{type}_{playerId}_{date:yyyyMMdd}";
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

    public async Task<IEnumerable<Player>> GetAllPlayers()
    {
        await _blobLogger.LogAsync($"Getting all players");
        var players = await FetchAllPlayersFromDb();
        return players ?? Enumerable.Empty<Player>().ToList();
    }

    public async Task<IEnumerable<Player>?> FetchAllPlayersFromDb()
    {
        await _blobLogger.LogAsync($"Fetching all players from DB");
        return await _context.Players.ToListAsync();
    }

}