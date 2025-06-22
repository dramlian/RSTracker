using Azure.Storage.Blobs;
using System.Text;
using RSTracker.Abstractions;
namespace RSTracker.Services;

/* TODO: Each player will have a unique container and that
container will have a unique blob for each day.*/
public class BlobLogger : IBlobLogger
{
    private readonly BlobContainerClient _containerClient;

    public BlobLogger(IConfiguration configuration)
    {
        var blobServiceConnection = Environment.GetEnvironmentVariable("BLOB_SERVICE_CLIENT");
        var blobContainerName = Environment.GetEnvironmentVariable("BLOB_CONTAINER_NAME");

        var blobServiceClient = new BlobServiceClient(blobServiceConnection);
        _containerClient = blobServiceClient.GetBlobContainerClient(blobContainerName);
        _containerClient.CreateIfNotExists();
    }

    public async Task LogAsync(string message)
    {
        string logFileName = $"log-{DateTime.UtcNow:yyyy-MM-dd}.txt";
        BlobClient blobClient = _containerClient.GetBlobClient(logFileName);

        string timeStampedMessage = $"[{DateTime.UtcNow}] {message}{Environment.NewLine}";
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes(timeStampedMessage));

        string existing = "";
        if (await blobClient.ExistsAsync())
        {
            var existingContent = await blobClient.DownloadContentAsync();
            existing = existingContent.Value.Content.ToString();
        }

        string combined = existing + timeStampedMessage;
        var combinedStream = new MemoryStream(Encoding.UTF8.GetBytes(combined));
        await blobClient.UploadAsync(combinedStream, overwrite: true);
    }
}
