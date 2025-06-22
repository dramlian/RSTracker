using Microsoft.EntityFrameworkCore;
using RSTracker.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RSTracker.Abstractions;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    DotNetEnv.Env.Load();
}

var defaultConnection = Environment.GetEnvironmentVariable("default-connection");


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "https://rstracker-fe.kindcoast-63f12bd5.polandcentral.azurecontainerapps.io"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();

    });
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter());
});


builder.Services.AddDbContextFactory<PlayerDbContext>(options =>
    options.UseNpgsql(defaultConnection));

builder.Services.AddMemoryCache();
builder.Services.AddScoped<IBlobLogger, BlobLogger>();
builder.Services.AddScoped<ICacheService, CacheService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = "https://login.microsoftonline.com/2acd7b2a-a28e-4096-9198-b9cc4120d797/v2.0";
    options.Audience = "api://8d32374c-18a3-4253-aed6-9f42d981a68c";
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = "https://sts.windows.net/2acd7b2a-a28e-4096-9198-b9cc4120d797/",
        ValidAudience = "api://8d32374c-18a3-4253-aed6-9f42d981a68c"
    };
});

// Swagger with JWT Bearer support
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "RSTracker API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "RSTracker API V1");
    });
}

app.UseCors("AllowLocalhost");

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
