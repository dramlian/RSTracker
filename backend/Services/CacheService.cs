using Microsoft.Extensions.Caching.Memory;
namespace RSTracker.Services;

public class CacheService
{
    private readonly IMemoryCache _cache;

    public CacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public async Task<T?> GetAsync<T>(string key, Func<Task<T>> getDataFunc, TimeSpan? absoluteExpiration = null)
    {
        return await _cache.GetOrCreateAsync(key, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = absoluteExpiration ?? TimeSpan.FromMinutes(10);
            return await getDataFunc();
        });
    }

    public void Set<T>(string key, T data, TimeSpan? absoluteExpiration = null)
    {
        _cache.Set(key, data, absoluteExpiration ?? TimeSpan.FromMinutes(10));
    }
}

