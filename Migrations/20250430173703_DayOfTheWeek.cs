using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class DayOfTheWeek : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "WelnessRecords");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "RPEs");
        }
    }
}
