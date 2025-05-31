using RSTracker.Abstractions;

class BlobLoggerMocked : IBlobLogger
{
    public Task LogAsync(string message)
    {
        return Task.CompletedTask;
    }

}