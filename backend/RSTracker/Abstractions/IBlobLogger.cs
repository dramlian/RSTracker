namespace RSTracker.Abstractions;

public interface IBlobLogger
{
    Task LogAsync(string message);
}

