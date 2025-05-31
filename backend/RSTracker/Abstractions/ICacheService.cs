namespace RSTracker.Abstractions;

public interface ICacheService
{
    Task<T> GetAsync<T>(string key, Func<Task<T>> getDataFunc, TimeSpan? absoluteExpiration = null);
    void Set<T>(string key, T data, TimeSpan? absoluteExpiration = null);
    void Remove(string key);
}
