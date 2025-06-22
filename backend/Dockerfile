# Use .NET 9 SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy only the .csproj first to cache dependencies
COPY RSTracker/*.csproj ./RSTracker/
RUN dotnet restore ./RSTracker/RSTracker.csproj

# Copy the rest of the source code
COPY RSTracker/. ./RSTracker/
WORKDIR /src/RSTracker

# Build and publish
RUN dotnet publish -c Release -o /app/publish

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "RSTracker.dll"]
