using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProtoScaner.Server.Migrations.ProtoScanner3D
{
    /// <inheritdoc />
    public partial class UpdateProtesisCedula : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Causa_Amputacion",
                columns: table => new
                {
                    Id_causa = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    descripcion = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Causa_Am__110B92100C49024C", x => x.Id_causa);
                });

            migrationBuilder.CreateTable(
                name: "Componente_Tipos",
                columns: table => new
                {
                    ComponentTipoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoNombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Componen__70E6A0E0719BEA11", x => x.ComponentTipoID);
                });

            migrationBuilder.CreateTable(
                name: "Estatus_paciente",
                columns: table => new
                {
                    Id_Estatus_paciente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Estatus___2683C758AFE3CB75", x => x.Id_Estatus_paciente);
                });

            migrationBuilder.CreateTable(
                name: "Estatus_protesis",
                columns: table => new
                {
                    Id_Estatus_protesis = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Estatus___34BA47CC095E88D0", x => x.Id_Estatus_protesis);
                });

            migrationBuilder.CreateTable(
                name: "Genero",
                columns: table => new
                {
                    Id_Genero = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Genero = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Genero__E76DD66E2303B4F7", x => x.Id_Genero);
                });

            migrationBuilder.CreateTable(
                name: "Lado_Amputacion",
                columns: table => new
                {
                    Id_lado = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lado_amputacion = table.Column<string>(type: "varchar(12)", unicode: false, maxLength: 12, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Lado_Amp__0C78995056763AFE", x => x.Id_lado);
                });

            migrationBuilder.CreateTable(
                name: "Liner",
                columns: table => new
                {
                    Id_Liner = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipo_liner = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    talla = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Liner__F8F1538DC57D3C43", x => x.Id_Liner);
                });

            migrationBuilder.CreateTable(
                name: "Provincia",
                columns: table => new
                {
                    Id_Provincia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre_Provincia = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Provinci__1B62027383B2EB62", x => x.Id_Provincia);
                });

            migrationBuilder.CreateTable(
                name: "Rol",
                columns: table => new
                {
                    id_rol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_rol = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    descripcion = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Rol__6ABCB5E0F9009A3B", x => x.id_rol);
                });

            migrationBuilder.CreateTable(
                name: "Tallas",
                columns: table => new
                {
                    Id_Talla = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TallaNombre = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Tallas__A135FE6EDC15A448", x => x.Id_Talla);
                });

            migrationBuilder.CreateTable(
                name: "Tipo_Amputacion",
                columns: table => new
                {
                    Id_amputacion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipo_amputacion = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Tipo_Amp__1A5D1A33D43D0397", x => x.Id_amputacion);
                });

            migrationBuilder.CreateTable(
                name: "Tipo_Liner",
                columns: table => new
                {
                    Id_TipoLiner = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoNombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Tipo_Lin__EAA776676FEE0F1A", x => x.Id_TipoLiner);
                });

            migrationBuilder.CreateTable(
                name: "Componentes",
                columns: table => new
                {
                    ComponentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ComponentTipoID = table.Column<int>(type: "int", nullable: true),
                    codigo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Componen__D79CF02E628E1ABC", x => x.ComponentID);
                    table.ForeignKey(
                        name: "FK__Component__Compo__628FA481",
                        column: x => x.ComponentTipoID,
                        principalTable: "Componente_Tipos",
                        principalColumn: "ComponentTipoID");
                });

            migrationBuilder.CreateTable(
                name: "Paciente",
                columns: table => new
                {
                    Id_paciente = table.Column<int>(type: "int", nullable: false),
                    nombre_completo = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    cedula = table.Column<string>(type: "varchar(11)", unicode: false, maxLength: 11, nullable: true),
                    Genero = table.Column<int>(type: "int", nullable: true),
                    fecha_nacimiento = table.Column<DateOnly>(type: "date", nullable: true),
                    direccion = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    telefono = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    telefono_celular = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    Id_Provincia = table.Column<int>(type: "int", nullable: true),
                    sector = table.Column<string>(type: "varchar(1)", unicode: false, maxLength: 1, nullable: true),
                    Insidencia = table.Column<bool>(type: "bit", nullable: true),
                    Id_Estatus_paciente = table.Column<int>(type: "int", nullable: true),
                    Id_Estatus_protesis = table.Column<int>(type: "int", nullable: true),
                    Comentario = table.Column<string>(type: "text", nullable: true),
                    foto_paciente = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Paciente__3874F59A74D68654", x => x.Id_paciente);
                    table.ForeignKey(
                        name: "FK__Paciente__Genero__534D60F1",
                        column: x => x.Genero,
                        principalTable: "Genero",
                        principalColumn: "Id_Genero");
                    table.ForeignKey(
                        name: "FK__Paciente__Id_Est__5165187F",
                        column: x => x.Id_Estatus_protesis,
                        principalTable: "Estatus_protesis",
                        principalColumn: "Id_Estatus_protesis");
                    table.ForeignKey(
                        name: "FK__Paciente__Id_Est__52593CB8",
                        column: x => x.Id_Estatus_paciente,
                        principalTable: "Estatus_paciente",
                        principalColumn: "Id_Estatus_paciente");
                    table.ForeignKey(
                        name: "FK__Paciente__Id_Pro__5070F446",
                        column: x => x.Id_Provincia,
                        principalTable: "Provincia",
                        principalColumn: "Id_Provincia");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    id_usuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_usuario = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    password_hash = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    id_rol = table.Column<int>(type: "int", nullable: true),
                    fecha_creacion = table.Column<DateOnly>(type: "date", nullable: true),
                    activo = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuario__4E3E04AD5B8FAE9D", x => x.id_usuario);
                    table.ForeignKey(
                        name: "FK__Usuario__id_rol__3C69FB99",
                        column: x => x.id_rol,
                        principalTable: "Rol",
                        principalColumn: "id_rol",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Liner_Transfemoral",
                columns: table => new
                {
                    Id_Liner = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoLinerID = table.Column<int>(type: "int", nullable: true),
                    TallaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Liner_Tr__F8F1538D7096A1C3", x => x.Id_Liner);
                    table.ForeignKey(
                        name: "FK__Liner_Tra__Talla__6EF57B66",
                        column: x => x.TallaID,
                        principalTable: "Tallas",
                        principalColumn: "Id_Talla");
                });

            migrationBuilder.CreateTable(
                name: "Liner_Transtibial",
                columns: table => new
                {
                    Id_Liner = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipoLinerID = table.Column<int>(type: "int", nullable: true),
                    TallaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Liner_Tr__F8F1538D73C0A2B8", x => x.Id_Liner);
                    table.ForeignKey(
                        name: "FK__Liner_Tra__Talla__6C190EBB",
                        column: x => x.TallaID,
                        principalTable: "Tallas",
                        principalColumn: "Id_Talla");
                    table.ForeignKey(
                        name: "FK__Liner_Tra__TipoL__6B24EA82",
                        column: x => x.TipoLinerID,
                        principalTable: "Tipo_Liner",
                        principalColumn: "Id_TipoLiner");
                });

            migrationBuilder.CreateTable(
                name: "Historial_Paciente_Ingreso",
                columns: table => new
                {
                    Id_historial = table.Column<int>(type: "int", nullable: false),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    tipo_amputacion = table.Column<int>(type: "int", nullable: true),
                    lado_amputacion = table.Column<int>(type: "int", nullable: true),
                    fecha_amputacion = table.Column<DateOnly>(type: "date", nullable: true),
                    Causa = table.Column<int>(type: "int", nullable: true),
                    Terapia = table.Column<bool>(type: "bit", nullable: true),
                    Tiempo_terapia = table.Column<string>(type: "varchar(60)", unicode: false, maxLength: 60, nullable: true),
                    Id_Medida = table.Column<int>(type: "int", nullable: true),
                    Comentario = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Historia__EA5F513B2EE7129D", x => x.Id_historial);
                    table.ForeignKey(
                        name: "FK__Historial__Causa__5AEE82B9",
                        column: x => x.Causa,
                        principalTable: "Causa_Amputacion",
                        principalColumn: "Id_causa");
                    table.ForeignKey(
                        name: "FK__Historial__Id_pa__5812160E",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Historial__lado___59FA5E80",
                        column: x => x.lado_amputacion,
                        principalTable: "Lado_Amputacion",
                        principalColumn: "Id_lado");
                    table.ForeignKey(
                        name: "FK__Historial__tipo___59063A47",
                        column: x => x.tipo_amputacion,
                        principalTable: "Tipo_Amputacion",
                        principalColumn: "Id_amputacion");
                });

            migrationBuilder.CreateTable(
                name: "Protesis",
                columns: table => new
                {
                    id_protesis = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo_paciente = table.Column<int>(type: "int", nullable: false),
                    liner_tipo = table.Column<int>(type: "int", nullable: true),
                    liner_tamano = table.Column<int>(type: "int", nullable: true),
                    protesista = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    fecha_entrega = table.Column<DateOnly>(type: "date", nullable: true),
                    material = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Protesis__D4FF3CA8D2BC6127", x => x.id_protesis);
                    table.ForeignKey(
                        name: "FK__Protesis__codigo__18EBB532",
                        column: x => x.codigo_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Protesis__liner___19DFD96B",
                        column: x => x.liner_tipo,
                        principalTable: "Tipo_Liner",
                        principalColumn: "Id_TipoLiner");
                    table.ForeignKey(
                        name: "FK__Protesis__liner___1AD3FDA4",
                        column: x => x.liner_tamano,
                        principalTable: "Tallas",
                        principalColumn: "Id_Talla");
                });

            migrationBuilder.CreateTable(
                name: "Socket_Paciente",
                columns: table => new
                {
                    Id_socket = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    descripcion = table.Column<string>(type: "text", nullable: true),
                    fecha_creacion = table.Column<DateOnly>(type: "date", nullable: true, defaultValueSql: "(getdate())"),
                    tamaño = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Socket_P__14CC4DA6A1BCEB76", x => x.Id_socket);
                    table.ForeignKey(
                        name: "FK__Socket_Pa__Id_pa__03F0984C",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Toma_medidas_escaneo",
                columns: table => new
                {
                    id_escaneo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    Id_amputacion = table.Column<int>(type: "int", nullable: true),
                    Id_Liner = table.Column<int>(type: "int", nullable: true),
                    fecha_escaneo = table.Column<DateOnly>(type: "date", nullable: true),
                    fotos_munon = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    comentario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Resultado_scaneo = table.Column<string>(type: "text", nullable: true),
                    resultadoDoc = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Toma_med__83D46B0D3B64D724", x => x.id_escaneo);
                    table.ForeignKey(
                        name: "FK__Toma_medi__Id_Li__73BA3083",
                        column: x => x.Id_Liner,
                        principalTable: "Liner",
                        principalColumn: "Id_Liner");
                    table.ForeignKey(
                        name: "FK__Toma_medi__Id_am__72C60C4A",
                        column: x => x.Id_amputacion,
                        principalTable: "Tipo_Amputacion",
                        principalColumn: "Id_amputacion");
                    table.ForeignKey(
                        name: "FK__Toma_medi__Id_pa__71D1E811",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                });

            migrationBuilder.CreateTable(
                name: "Historial_Cambios",
                columns: table => new
                {
                    id_historial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_usuario = table.Column<int>(type: "int", nullable: true),
                    tabla_modificada = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    id_registro_modificado = table.Column<int>(type: "int", nullable: true),
                    operacion = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    valor_anterior = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    valor_nuevo = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true),
                    fecha_midificacion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Historia__76E6C502907F7B3B", x => x.id_historial);
                    table.ForeignKey(
                        name: "FK__Historial__id_us__4222D4EF",
                        column: x => x.id_usuario,
                        principalTable: "Usuario",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Historial_Login",
                columns: table => new
                {
                    id_historial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_usuario = table.Column<int>(type: "int", nullable: true),
                    fecha_login = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false),
                    direccion = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: true),
                    dispositivo = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    exito = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Historia__76E6C50220F920E5", x => x.id_historial);
                    table.ForeignKey(
                        name: "FK__Historial__id_us__3F466844",
                        column: x => x.id_usuario,
                        principalTable: "Usuario",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Imagen_Perfil",
                columns: table => new
                {
                    id_imagen = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_usuario = table.Column<int>(type: "int", nullable: true),
                    imagen = table.Column<byte[]>(type: "varbinary(1)", maxLength: 1, nullable: true),
                    descripcion = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Imagen_P__27CC2689856A21A1", x => x.id_imagen);
                    table.ForeignKey(
                        name: "FK__Imagen_Pe__Id_us__5DCAEF64",
                        column: x => x.Id_usuario,
                        principalTable: "Usuario",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Protesis_Componentes",
                columns: table => new
                {
                    ProtesisID = table.Column<int>(type: "int", nullable: false),
                    ComponentID = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Protesis__87BBF254B0581971", x => new { x.ProtesisID, x.ComponentID });
                    table.ForeignKey(
                        name: "FK__Protesis___Compo__1EA48E88",
                        column: x => x.ComponentID,
                        principalTable: "Componentes",
                        principalColumn: "ComponentID");
                    table.ForeignKey(
                        name: "FK__Protesis___Prote__1DB06A4F",
                        column: x => x.ProtesisID,
                        principalTable: "Protesis",
                        principalColumn: "id_protesis");
                });

            migrationBuilder.CreateTable(
                name: "Mantenimiento",
                columns: table => new
                {
                    id_mantenimiento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    Id_protesis = table.Column<int>(type: "int", nullable: true),
                    fecha_mantenimiento = table.Column<DateOnly>(type: "date", nullable: true),
                    imagen_fallo1 = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    imagen_fallo2 = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Id_socket = table.Column<int>(type: "int", nullable: true),
                    num_sockets_fabricados = table.Column<int>(type: "int", nullable: true),
                    nuevas_medidas = table.Column<int>(type: "int", nullable: true),
                    id_componentes = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Mantenim__707E5D16342052AD", x => x.id_mantenimiento);
                    table.ForeignKey(
                        name: "FK__Mantenimi__Id_pr__22751F6C",
                        column: x => x.Id_protesis,
                        principalTable: "Protesis",
                        principalColumn: "id_protesis");
                    table.ForeignKey(
                        name: "FK__Mantenimi__Id_so__236943A5",
                        column: x => x.Id_socket,
                        principalTable: "Socket_Paciente",
                        principalColumn: "Id_socket",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Mantenimi__id_co__2180FB33",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                });

            migrationBuilder.CreateTable(
                name: "Prueba_Socket",
                columns: table => new
                {
                    id_prueba = table.Column<int>(type: "int", nullable: false),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    modificacion_general = table.Column<string>(type: "text", nullable: true),
                    quien_la_hizo = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    fecha_prueba = table.Column<DateOnly>(type: "date", nullable: true),
                    practica_marcha = table.Column<bool>(type: "bit", nullable: true),
                    fecha_mantenimiento_post_entrega = table.Column<DateOnly>(type: "date", nullable: true),
                    socket_fallo = table.Column<bool>(type: "bit", nullable: true),
                    fecha_fallo = table.Column<DateOnly>(type: "date", nullable: true),
                    material_relleno_usado = table.Column<string>(type: "text", nullable: true),
                    Id_Componente = table.Column<int>(type: "int", nullable: true),
                    Id_Usuario = table.Column<int>(type: "int", nullable: true),
                    Id_socket = table.Column<int>(type: "int", nullable: true),
                    practica_recibida = table.Column<bool>(type: "bit", nullable: true),
                    duracion_terapia = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    fecha_practica = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Prueba_S__328A45731C2FD3F5", x => x.id_prueba);
                    table.ForeignKey(
                        name: "FK__Prueba_So__Id_Co__07C12930",
                        column: x => x.Id_Componente,
                        principalTable: "Componentes",
                        principalColumn: "ComponentID");
                    table.ForeignKey(
                        name: "FK__Prueba_So__Id_Us__08B54D69",
                        column: x => x.Id_Usuario,
                        principalTable: "Usuario",
                        principalColumn: "id_usuario");
                    table.ForeignKey(
                        name: "FK__Prueba_So__Id_pa__06CD04F7",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Prueba_So__Id_so__09A971A2",
                        column: x => x.Id_socket,
                        principalTable: "Socket_Paciente",
                        principalColumn: "Id_socket");
                });

            migrationBuilder.CreateTable(
                name: "Reportes",
                columns: table => new
                {
                    id_reporte = table.Column<int>(type: "int", nullable: false),
                    codigo_paciente = table.Column<int>(type: "int", nullable: true),
                    num_sockets_fabricados = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Reportes__87E4F5CB49E6CF98", x => x.id_reporte);
                    table.ForeignKey(
                        name: "FK__Reportes__codigo__395884C4",
                        column: x => x.codigo_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Reportes__num_so__3A4CA8FD",
                        column: x => x.num_sockets_fabricados,
                        principalTable: "Socket_Paciente",
                        principalColumn: "Id_socket");
                });

            migrationBuilder.CreateTable(
                name: "Medida_Transfemoral",
                columns: table => new
                {
                    Id_medida_T = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_escaneo = table.Column<int>(type: "int", nullable: true),
                    id_valor = table.Column<int>(type: "int", nullable: true),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    foto_munon = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    fecha_escaneo = table.Column<DateOnly>(type: "date", nullable: true),
                    disenador_socket = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    longitud_pie = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    altura_talon = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Medida1 = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    Medida2 = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    id_Liner = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Medida_T__14B4624D5B52A53D", x => x.Id_medida_T);
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_es__7C4F7684",
                        column: x => x.Id_escaneo,
                        principalTable: "Toma_medidas_escaneo",
                        principalColumn: "id_escaneo");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_pa__7D439ABD",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__id_Li__7B5B524B",
                        column: x => x.id_Liner,
                        principalTable: "Liner_Transfemoral",
                        principalColumn: "Id_Liner");
                });

            migrationBuilder.CreateTable(
                name: "Medida_Transtibial",
                columns: table => new
                {
                    id_medida = table.Column<int>(type: "int", nullable: false),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    Id_escaneo = table.Column<int>(type: "int", nullable: true),
                    fecha_escaneo = table.Column<DateOnly>(type: "date", nullable: true),
                    protesista = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Id_Liner = table.Column<int>(type: "int", nullable: true),
                    Insidencia = table.Column<bool>(type: "bit", nullable: true),
                    longitud_total_munon = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_3cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_6cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_9cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_12cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_15cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_21cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_24cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_27cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_30cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_sobre_rodilla = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ap_tension = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_supracondilar = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_tendon = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    notas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    longitud_osea = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    longitud_pies = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    altura_tacon = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Medida_T__E038E090D5A27E17", x => x.id_medida);
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_Li__76969D2E",
                        column: x => x.Id_Liner,
                        principalTable: "Liner_Transtibial",
                        principalColumn: "Id_Liner");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_es__778AC167",
                        column: x => x.Id_escaneo,
                        principalTable: "Toma_medidas_escaneo",
                        principalColumn: "id_escaneo");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_pa__787EE5A0",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                });

            migrationBuilder.CreateTable(
                name: "Mantenimiento_Componentes",
                columns: table => new
                {
                    ProtesisID = table.Column<int>(type: "int", nullable: false),
                    ComponentID = table.Column<int>(type: "int", nullable: false),
                    Cantidad = table.Column<int>(type: "int", nullable: true),
                    MantenimientoID = table.Column<int>(type: "int", nullable: true),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    Insidencia = table.Column<bool>(type: "bit", nullable: true),
                    Medidas = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Mantenim__87BBF2544405C768", x => new { x.ProtesisID, x.ComponentID });
                    table.ForeignKey(
                        name: "FK__Mantenimi__Compo__2739D489",
                        column: x => x.ComponentID,
                        principalTable: "Componentes",
                        principalColumn: "ComponentID");
                    table.ForeignKey(
                        name: "FK__Mantenimi__Id_pa__29221CFB",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Mantenimi__Mante__282DF8C2",
                        column: x => x.MantenimientoID,
                        principalTable: "Mantenimiento",
                        principalColumn: "id_mantenimiento");
                    table.ForeignKey(
                        name: "FK__Mantenimi__Medid__2A164134",
                        column: x => x.Medidas,
                        principalTable: "Toma_medidas_escaneo",
                        principalColumn: "id_escaneo");
                    table.ForeignKey(
                        name: "FK__Mantenimi__Prote__2645B050",
                        column: x => x.ProtesisID,
                        principalTable: "Protesis",
                        principalColumn: "id_protesis");
                });

            migrationBuilder.CreateTable(
                name: "Entregas",
                columns: table => new
                {
                    Id_Entregas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Paciente = table.Column<int>(type: "int", nullable: true),
                    Id_Protesis = table.Column<int>(type: "int", nullable: true),
                    Id_Usuario = table.Column<int>(type: "int", nullable: true),
                    Reduccion = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    general_Modificacion = table.Column<string>(type: "text", nullable: true),
                    Otros = table.Column<string>(type: "text", nullable: true),
                    Id_prueba_Socket = table.Column<int>(type: "int", nullable: true),
                    Insidencia = table.Column<bool>(type: "bit", nullable: true),
                    material_relleno = table.Column<string>(type: "text", nullable: true),
                    fecha_Entrega = table.Column<DateOnly>(type: "date", nullable: true),
                    practica_Marcha = table.Column<DateOnly>(type: "date", nullable: true),
                    Mantenimiento_post_entrega = table.Column<DateOnly>(type: "date", nullable: true),
                    Id_mantenimiento = table.Column<int>(type: "int", nullable: true),
                    Firma_descargo_componente_lista = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Entregas__39E3689C5F42B7C3", x => x.Id_Entregas);
                    table.ForeignKey(
                        name: "FK__Entregas__Id_Pac__2CF2ADDF",
                        column: x => x.Id_Paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Entregas__Id_Pro__2DE6D218",
                        column: x => x.Id_Protesis,
                        principalTable: "Protesis",
                        principalColumn: "id_protesis");
                    table.ForeignKey(
                        name: "FK__Entregas__Id_Usu__2EDAF651",
                        column: x => x.Id_Usuario,
                        principalTable: "Usuario",
                        principalColumn: "id_usuario");
                    table.ForeignKey(
                        name: "FK__Entregas__Id_man__2FCF1A8A",
                        column: x => x.Id_mantenimiento,
                        principalTable: "Mantenimiento",
                        principalColumn: "id_mantenimiento");
                    table.ForeignKey(
                        name: "FK__Entregas__Id_pru__30C33EC3",
                        column: x => x.Id_prueba_Socket,
                        principalTable: "Prueba_Socket",
                        principalColumn: "id_prueba");
                });

            migrationBuilder.CreateTable(
                name: "Medida_Transfemoral_Prueba",
                columns: table => new
                {
                    Id_medida = table.Column<int>(type: "int", nullable: false),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    Id_prueba = table.Column<int>(type: "int", nullable: true),
                    id_valor = table.Column<int>(type: "int", nullable: true),
                    foto_munon = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    fecha_escaneo = table.Column<DateOnly>(type: "date", nullable: true),
                    disenador_socket = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    longitud_pie = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    altura_talon = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Medida1 = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    Medida2 = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: true),
                    id_Liner = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Medida_T__88604D55F90C484C", x => x.Id_medida);
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_pa__114A936A",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__Id_pr__1332DBDC",
                        column: x => x.Id_prueba,
                        principalTable: "Prueba_Socket",
                        principalColumn: "id_prueba");
                    table.ForeignKey(
                        name: "FK__Medida_Tr__id_Li__123EB7A3",
                        column: x => x.id_Liner,
                        principalTable: "Liner_Transfemoral",
                        principalColumn: "Id_Liner");
                });

            migrationBuilder.CreateTable(
                name: "Transtibial_Prueba",
                columns: table => new
                {
                    id_escaneo = table.Column<int>(type: "int", nullable: false),
                    Id_paciente = table.Column<int>(type: "int", nullable: true),
                    fecha_escaneo = table.Column<DateOnly>(type: "date", nullable: true),
                    protesista = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Id_Liner = table.Column<int>(type: "int", nullable: true),
                    Id_prueba = table.Column<int>(type: "int", nullable: true),
                    longitud_total_munon = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_3cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_6cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_9cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_12cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_15cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_21cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_24cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_27cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    circunferencia_30cm = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_sobre_rodilla = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ap_tension = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_supracondilar = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    ml_tendon = table.Column<decimal>(type: "decimal(5,2)", nullable: true),
                    notas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    longitud_osea = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    longitud_pies = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    altura_tacon = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Transtib__83D46B0D6A357B8B", x => x.id_escaneo);
                    table.ForeignKey(
                        name: "FK__Transtibi__Id_Li__0D7A0286",
                        column: x => x.Id_Liner,
                        principalTable: "Liner_Transtibial",
                        principalColumn: "Id_Liner");
                    table.ForeignKey(
                        name: "FK__Transtibi__Id_pa__0C85DE4D",
                        column: x => x.Id_paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Transtibi__Id_pr__0E6E26BF",
                        column: x => x.Id_prueba,
                        principalTable: "Prueba_Socket",
                        principalColumn: "id_prueba");
                });

            migrationBuilder.CreateTable(
                name: "MedidasCircunferencia",
                columns: table => new
                {
                    id_medida = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_valor = table.Column<int>(type: "int", nullable: true),
                    numero_circunferencia = table.Column<int>(type: "int", nullable: true),
                    valor_mm = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MedidasC__E038E09014E772D5", x => x.id_medida);
                    table.ForeignKey(
                        name: "FK__MedidasCi__id_va__00200768",
                        column: x => x.id_valor,
                        principalTable: "Medida_Transfemoral",
                        principalColumn: "Id_medida_T");
                });

            migrationBuilder.CreateTable(
                name: "Insidencias",
                columns: table => new
                {
                    Id_Insidencias = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Entregas = table.Column<int>(type: "int", nullable: true),
                    Id_Paciente = table.Column<int>(type: "int", nullable: true),
                    Id_Protesis = table.Column<int>(type: "int", nullable: true),
                    Id_Usuario = table.Column<int>(type: "int", nullable: true),
                    Componentes = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Fecha = table.Column<DateOnly>(type: "date", nullable: true),
                    descripcion = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Insidenc__FEC33014BD1CD794", x => x.Id_Insidencias);
                    table.ForeignKey(
                        name: "FK__Insidenci__Id_En__339FAB6E",
                        column: x => x.Id_Entregas,
                        principalTable: "Entregas",
                        principalColumn: "Id_Entregas");
                    table.ForeignKey(
                        name: "FK__Insidenci__Id_Pa__3493CFA7",
                        column: x => x.Id_Paciente,
                        principalTable: "Paciente",
                        principalColumn: "Id_paciente");
                    table.ForeignKey(
                        name: "FK__Insidenci__Id_Pr__3587F3E0",
                        column: x => x.Id_Protesis,
                        principalTable: "Protesis",
                        principalColumn: "id_protesis");
                    table.ForeignKey(
                        name: "FK__Insidenci__Id_Us__367C1819",
                        column: x => x.Id_Usuario,
                        principalTable: "Mantenimiento",
                        principalColumn: "id_mantenimiento");
                });

            migrationBuilder.CreateTable(
                name: "MedidasCircunferencia_Prueba",
                columns: table => new
                {
                    id_medida = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_valor = table.Column<int>(type: "int", nullable: true),
                    numero_circunferencia = table.Column<int>(type: "int", nullable: true),
                    valor_mm = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MedidasC__E038E090F59CA66E", x => x.id_medida);
                    table.ForeignKey(
                        name: "FK__MedidasCi__id_va__160F4887",
                        column: x => x.id_valor,
                        principalTable: "Medida_Transfemoral_Prueba",
                        principalColumn: "Id_medida");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Componentes_ComponentTipoID",
                table: "Componentes",
                column: "ComponentTipoID");

            migrationBuilder.CreateIndex(
                name: "IX_Entregas_Id_mantenimiento",
                table: "Entregas",
                column: "Id_mantenimiento");

            migrationBuilder.CreateIndex(
                name: "IX_Entregas_Id_Paciente",
                table: "Entregas",
                column: "Id_Paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Entregas_Id_Protesis",
                table: "Entregas",
                column: "Id_Protesis");

            migrationBuilder.CreateIndex(
                name: "IX_Entregas_Id_prueba_Socket",
                table: "Entregas",
                column: "Id_prueba_Socket");

            migrationBuilder.CreateIndex(
                name: "IX_Entregas_Id_Usuario",
                table: "Entregas",
                column: "Id_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Cambios_id_usuario",
                table: "Historial_Cambios",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Login_id_usuario",
                table: "Historial_Login",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Paciente_Ingreso_Causa",
                table: "Historial_Paciente_Ingreso",
                column: "Causa");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Paciente_Ingreso_Id_paciente",
                table: "Historial_Paciente_Ingreso",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Paciente_Ingreso_lado_amputacion",
                table: "Historial_Paciente_Ingreso",
                column: "lado_amputacion");

            migrationBuilder.CreateIndex(
                name: "IX_Historial_Paciente_Ingreso_tipo_amputacion",
                table: "Historial_Paciente_Ingreso",
                column: "tipo_amputacion");

            migrationBuilder.CreateIndex(
                name: "IX_Imagen_Perfil_Id_usuario",
                table: "Imagen_Perfil",
                column: "Id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Insidencias_Id_Entregas",
                table: "Insidencias",
                column: "Id_Entregas");

            migrationBuilder.CreateIndex(
                name: "IX_Insidencias_Id_Paciente",
                table: "Insidencias",
                column: "Id_Paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Insidencias_Id_Protesis",
                table: "Insidencias",
                column: "Id_Protesis");

            migrationBuilder.CreateIndex(
                name: "IX_Insidencias_Id_Usuario",
                table: "Insidencias",
                column: "Id_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Liner_Transfemoral_TallaID",
                table: "Liner_Transfemoral",
                column: "TallaID");

            migrationBuilder.CreateIndex(
                name: "IX_Liner_Transtibial_TallaID",
                table: "Liner_Transtibial",
                column: "TallaID");

            migrationBuilder.CreateIndex(
                name: "IX_Liner_Transtibial_TipoLinerID",
                table: "Liner_Transtibial",
                column: "TipoLinerID");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Id_paciente",
                table: "Mantenimiento",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Id_protesis",
                table: "Mantenimiento",
                column: "Id_protesis");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Id_socket",
                table: "Mantenimiento",
                column: "Id_socket");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Componentes_ComponentID",
                table: "Mantenimiento_Componentes",
                column: "ComponentID");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Componentes_Id_paciente",
                table: "Mantenimiento_Componentes",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Componentes_MantenimientoID",
                table: "Mantenimiento_Componentes",
                column: "MantenimientoID");

            migrationBuilder.CreateIndex(
                name: "IX_Mantenimiento_Componentes_Medidas",
                table: "Mantenimiento_Componentes",
                column: "Medidas");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_Id_escaneo",
                table: "Medida_Transfemoral",
                column: "Id_escaneo");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_id_Liner",
                table: "Medida_Transfemoral",
                column: "id_Liner");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_Id_paciente",
                table: "Medida_Transfemoral",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_Prueba_id_Liner",
                table: "Medida_Transfemoral_Prueba",
                column: "id_Liner");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_Prueba_Id_paciente",
                table: "Medida_Transfemoral_Prueba",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transfemoral_Prueba_Id_prueba",
                table: "Medida_Transfemoral_Prueba",
                column: "Id_prueba");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transtibial_Id_escaneo",
                table: "Medida_Transtibial",
                column: "Id_escaneo");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transtibial_Id_Liner",
                table: "Medida_Transtibial",
                column: "Id_Liner");

            migrationBuilder.CreateIndex(
                name: "IX_Medida_Transtibial_Id_paciente",
                table: "Medida_Transtibial",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_MedidasCircunferencia_id_valor",
                table: "MedidasCircunferencia",
                column: "id_valor");

            migrationBuilder.CreateIndex(
                name: "IX_MedidasCircunferencia_Prueba_id_valor",
                table: "MedidasCircunferencia_Prueba",
                column: "id_valor");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_Genero",
                table: "Paciente",
                column: "Genero");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_Id_Estatus_paciente",
                table: "Paciente",
                column: "Id_Estatus_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_Id_Estatus_protesis",
                table: "Paciente",
                column: "Id_Estatus_protesis");

            migrationBuilder.CreateIndex(
                name: "IX_Paciente_Id_Provincia",
                table: "Paciente",
                column: "Id_Provincia");

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_codigo_paciente",
                table: "Protesis",
                column: "codigo_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_liner_tamano",
                table: "Protesis",
                column: "liner_tamano");

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_liner_tipo",
                table: "Protesis",
                column: "liner_tipo");

            migrationBuilder.CreateIndex(
                name: "IX_Protesis_Componentes_ComponentID",
                table: "Protesis_Componentes",
                column: "ComponentID");

            migrationBuilder.CreateIndex(
                name: "IX_Prueba_Socket_Id_Componente",
                table: "Prueba_Socket",
                column: "Id_Componente");

            migrationBuilder.CreateIndex(
                name: "IX_Prueba_Socket_Id_paciente",
                table: "Prueba_Socket",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Prueba_Socket_Id_socket",
                table: "Prueba_Socket",
                column: "Id_socket");

            migrationBuilder.CreateIndex(
                name: "IX_Prueba_Socket_Id_Usuario",
                table: "Prueba_Socket",
                column: "Id_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_codigo_paciente",
                table: "Reportes",
                column: "codigo_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_num_sockets_fabricados",
                table: "Reportes",
                column: "num_sockets_fabricados");

            migrationBuilder.CreateIndex(
                name: "UQ__Rol__673CB43570AC484A",
                table: "Rol",
                column: "nombre_rol",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Socket_Paciente_Id_paciente",
                table: "Socket_Paciente",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Toma_medidas_escaneo_Id_amputacion",
                table: "Toma_medidas_escaneo",
                column: "Id_amputacion");

            migrationBuilder.CreateIndex(
                name: "IX_Toma_medidas_escaneo_Id_Liner",
                table: "Toma_medidas_escaneo",
                column: "Id_Liner");

            migrationBuilder.CreateIndex(
                name: "IX_Toma_medidas_escaneo_Id_paciente",
                table: "Toma_medidas_escaneo",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Transtibial_Prueba_Id_Liner",
                table: "Transtibial_Prueba",
                column: "Id_Liner");

            migrationBuilder.CreateIndex(
                name: "IX_Transtibial_Prueba_Id_paciente",
                table: "Transtibial_Prueba",
                column: "Id_paciente");

            migrationBuilder.CreateIndex(
                name: "IX_Transtibial_Prueba_Id_prueba",
                table: "Transtibial_Prueba",
                column: "Id_prueba");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_id_rol",
                table: "Usuario",
                column: "id_rol");

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__AB6E6164B7C17AB9",
                table: "Usuario",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Usuario__D4D22D743A7B762B",
                table: "Usuario",
                column: "nombre_usuario",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Historial_Cambios");

            migrationBuilder.DropTable(
                name: "Historial_Login");

            migrationBuilder.DropTable(
                name: "Historial_Paciente_Ingreso");

            migrationBuilder.DropTable(
                name: "Imagen_Perfil");

            migrationBuilder.DropTable(
                name: "Insidencias");

            migrationBuilder.DropTable(
                name: "Mantenimiento_Componentes");

            migrationBuilder.DropTable(
                name: "Medida_Transtibial");

            migrationBuilder.DropTable(
                name: "MedidasCircunferencia");

            migrationBuilder.DropTable(
                name: "MedidasCircunferencia_Prueba");

            migrationBuilder.DropTable(
                name: "Protesis_Componentes");

            migrationBuilder.DropTable(
                name: "Reportes");

            migrationBuilder.DropTable(
                name: "Transtibial_Prueba");

            migrationBuilder.DropTable(
                name: "Causa_Amputacion");

            migrationBuilder.DropTable(
                name: "Lado_Amputacion");

            migrationBuilder.DropTable(
                name: "Entregas");

            migrationBuilder.DropTable(
                name: "Medida_Transfemoral");

            migrationBuilder.DropTable(
                name: "Medida_Transfemoral_Prueba");

            migrationBuilder.DropTable(
                name: "Liner_Transtibial");

            migrationBuilder.DropTable(
                name: "Mantenimiento");

            migrationBuilder.DropTable(
                name: "Toma_medidas_escaneo");

            migrationBuilder.DropTable(
                name: "Prueba_Socket");

            migrationBuilder.DropTable(
                name: "Liner_Transfemoral");

            migrationBuilder.DropTable(
                name: "Protesis");

            migrationBuilder.DropTable(
                name: "Liner");

            migrationBuilder.DropTable(
                name: "Tipo_Amputacion");

            migrationBuilder.DropTable(
                name: "Componentes");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Socket_Paciente");

            migrationBuilder.DropTable(
                name: "Tipo_Liner");

            migrationBuilder.DropTable(
                name: "Tallas");

            migrationBuilder.DropTable(
                name: "Componente_Tipos");

            migrationBuilder.DropTable(
                name: "Rol");

            migrationBuilder.DropTable(
                name: "Paciente");

            migrationBuilder.DropTable(
                name: "Genero");

            migrationBuilder.DropTable(
                name: "Estatus_protesis");

            migrationBuilder.DropTable(
                name: "Estatus_paciente");

            migrationBuilder.DropTable(
                name: "Provincia");
        }
    }

}
