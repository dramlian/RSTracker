using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Position = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    Height = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RPEs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IntervalInMinutes = table.Column<int>(type: "integer", nullable: false),
                    Rpevalue = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    TotalRpeValue = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RPEs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RPEs_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WelnessRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MuscleStatus = table.Column<int>(type: "integer", nullable: false),
                    RecoveryStatus = table.Column<int>(type: "integer", nullable: false),
                    StressStatus = table.Column<int>(type: "integer", nullable: false),
                    SleepStatus = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WelnessRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WelnessRecords_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RPEs_PlayerId",
                table: "RPEs",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_WelnessRecords_PlayerId",
                table: "WelnessRecords",
                column: "PlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RPEs");

            migrationBuilder.DropTable(
                name: "WelnessRecords");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
