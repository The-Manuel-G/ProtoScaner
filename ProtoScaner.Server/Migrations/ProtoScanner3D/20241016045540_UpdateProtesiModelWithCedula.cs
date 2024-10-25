using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProtoScaner.Server.Migrations.ProtoScanner3D
{
    /// <inheritdoc />
    public partial class UpdateProtesiModelWithCedula : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Protesis__codigo__18EBB532",
                table: "Protesis");

            migrationBuilder.DropIndex(
                name: "IX_Protesis_codigo_paciente",
                table: "Protesis");

            migrationBuilder.DropColumn(
                name: "codigo_paciente",
                table: "Protesis");

            migrationBuilder.AddColumn<string>(
                name: "cedula",
                table: "Protesis",
                type: "varchar(11)",
                unicode: false,
                maxLength: 11,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "cedula",
                table: "Paciente",
                type: "varchar(11)",
                unicode: false,
                maxLength: 11,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(11)",
                oldUnicode: false,
                oldMaxLength: 11,
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Paciente_cedula",
                table: "Paciente",
                column: "cedula");

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_cedula",
                table: "Protesis",
                column: "cedula");

            migrationBuilder.AddForeignKey(
                name: "FK_Protesis_Paciente_Cedula",
                table: "Protesis",
                column: "cedula",
                principalTable: "Paciente",
                principalColumn: "cedula");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Protesis_Paciente_Cedula",
                table: "Protesis");

            migrationBuilder.DropIndex(
                name: "IX_Protesis_cedula",
                table: "Protesis");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Paciente_cedula",
                table: "Paciente");

            migrationBuilder.DropColumn(
                name: "cedula",
                table: "Protesis");

            migrationBuilder.AddColumn<int>(
                name: "codigo_paciente",
                table: "Protesis",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "cedula",
                table: "Paciente",
                type: "varchar(11)",
                unicode: false,
                maxLength: 11,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(11)",
                oldUnicode: false,
                oldMaxLength: 11);

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_codigo_paciente",
                table: "Protesis",
                column: "codigo_paciente");

            migrationBuilder.AddForeignKey(
                name: "FK__Protesis__codigo__18EBB532",
                table: "Protesis",
                column: "codigo_paciente",
                principalTable: "Paciente",
                principalColumn: "Id_paciente");
        }
    }
}
