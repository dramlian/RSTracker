using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class DateOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "WelnessRecords");

            migrationBuilder.DropColumn(
                name: "LeagueWeek",
                table: "WelnessRecords");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "RPEs");

            migrationBuilder.DropColumn(
                name: "LeagueWeek",
                table: "RPEs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "WelnessRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LeagueWeek",
                table: "WelnessRecords",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "RPEs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LeagueWeek",
                table: "RPEs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
