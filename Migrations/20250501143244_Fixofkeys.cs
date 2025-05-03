using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class Fixofkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RPEs_Players_PlayerIdFK",
                table: "RPEs");

            migrationBuilder.DropForeignKey(
                name: "FK_WelnessRecords_Players_PlayerIdFK",
                table: "WelnessRecords");

            migrationBuilder.RenameColumn(
                name: "PlayerIdFK",
                table: "WelnessRecords",
                newName: "PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_WelnessRecords_PlayerIdFK",
                table: "WelnessRecords",
                newName: "IX_WelnessRecords_PlayerId");

            migrationBuilder.RenameColumn(
                name: "PlayerIdFK",
                table: "RPEs",
                newName: "PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_RPEs_PlayerIdFK",
                table: "RPEs",
                newName: "IX_RPEs_PlayerId");

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

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "WelnessRecords",
                newName: "PlayerIdFK");

            migrationBuilder.RenameIndex(
                name: "IX_WelnessRecords_PlayerId",
                table: "WelnessRecords",
                newName: "IX_WelnessRecords_PlayerIdFK");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "RPEs",
                newName: "PlayerIdFK");

            migrationBuilder.RenameIndex(
                name: "IX_RPEs_PlayerId",
                table: "RPEs",
                newName: "IX_RPEs_PlayerIdFK");

            migrationBuilder.AddForeignKey(
                name: "FK_RPEs_Players_PlayerIdFK",
                table: "RPEs",
                column: "PlayerIdFK",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WelnessRecords_Players_PlayerIdFK",
                table: "WelnessRecords",
                column: "PlayerIdFK",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
