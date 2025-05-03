using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RSTracker.Migrations
{
    /// <inheritdoc />
    public partial class Cascadedelete3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RPEs_Players_Id",
                table: "RPEs");

            migrationBuilder.DropForeignKey(
                name: "FK_WelnessRecords_Players_Id",
                table: "WelnessRecords");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "WelnessRecords",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "PlayerIdFK",
                table: "WelnessRecords",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "RPEs",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "PlayerIdFK",
                table: "RPEs",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WelnessRecords_PlayerIdFK",
                table: "WelnessRecords",
                column: "PlayerIdFK");

            migrationBuilder.CreateIndex(
                name: "IX_RPEs_PlayerIdFK",
                table: "RPEs",
                column: "PlayerIdFK");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RPEs_Players_PlayerIdFK",
                table: "RPEs");

            migrationBuilder.DropForeignKey(
                name: "FK_WelnessRecords_Players_PlayerIdFK",
                table: "WelnessRecords");

            migrationBuilder.DropIndex(
                name: "IX_WelnessRecords_PlayerIdFK",
                table: "WelnessRecords");

            migrationBuilder.DropIndex(
                name: "IX_RPEs_PlayerIdFK",
                table: "RPEs");

            migrationBuilder.DropColumn(
                name: "PlayerIdFK",
                table: "WelnessRecords");

            migrationBuilder.DropColumn(
                name: "PlayerIdFK",
                table: "RPEs");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "WelnessRecords",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "RPEs",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_RPEs_Players_Id",
                table: "RPEs",
                column: "Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WelnessRecords_Players_Id",
                table: "WelnessRecords",
                column: "Id",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
