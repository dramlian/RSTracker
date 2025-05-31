using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class Cascadedelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RPEs_Players_PlayerId",
                table: "RPEs");

            migrationBuilder.DropForeignKey(
                name: "FK_WelnessRecords_Players_PlayerId",
                table: "WelnessRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_RPEs_Players_PlayerId",
                table: "RPEs",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WelnessRecords_Players_PlayerId",
                table: "WelnessRecords",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RPEs_Players_PlayerId",
                table: "RPEs");

            migrationBuilder.DropForeignKey(
                name: "FK_WelnessRecords_Players_PlayerId",
                table: "WelnessRecords");

            migrationBuilder.AddForeignKey(
                name: "FK_RPEs_Players_PlayerId",
                table: "RPEs",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WelnessRecords_Players_PlayerId",
                table: "WelnessRecords",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id");
        }
    }
}
