using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class RpeUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "RPEs",
                newName: "TotalRpeValue");

            migrationBuilder.AddColumn<int>(
                name: "Rpevalue",
                table: "RPEs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rpevalue",
                table: "RPEs");

            migrationBuilder.RenameColumn(
                name: "TotalRpeValue",
                table: "RPEs",
                newName: "Value");
        }
    }
}
