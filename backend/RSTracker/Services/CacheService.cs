using Microsoft.Extensions.Caching.Memory;
using RSTracker.Abstractions;

namespace RSTracker.Services;

public class CacheService : ICacheService
{
    private readonly IMemoryCache _cache;

    public CacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public async Task<T> GetAsync<T>(string key, Func<Task<T>> getDataFunc, TimeSpan? absoluteExpiration = null)
    {
        if (_cache.TryGetValue(key, out T? cached) && cached != null)
            return cached;

        var data = await getDataFunc();
        _cache.Set(key, data, absoluteExpiration ?? TimeSpan.FromMinutes(10));
        return data;
    }


    public void Set<T>(string key, T data, TimeSpan? absoluteExpiration = null)
    {
        _cache.Set(key, data, absoluteExpiration ?? TimeSpan.FromMinutes(10));
    }

    public void Remove(string key)
    {
        _cache.Remove(key);
    }
}
