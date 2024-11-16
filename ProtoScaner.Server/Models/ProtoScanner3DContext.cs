using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace ProtoScaner.Server.Models;

public partial class ProtoScanner3DContext : DbContext
{
    public ProtoScanner3DContext()
    {
    }

    public ProtoScanner3DContext(DbContextOptions<ProtoScanner3DContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CausaAmputacion> CausaAmputacions { get; set; }
    public virtual DbSet<Componente> Componentes { get; set; }
    public virtual DbSet<ComponenteTipo> ComponenteTipos { get; set; }
    public virtual DbSet<Entrega> Entregas { get; set; }
    public virtual DbSet<EstatusPaciente> EstatusPacientes { get; set; }
    public virtual DbSet<EstatusProtesi> EstatusProteses { get; set; }
    public virtual DbSet<Genero> Generos { get; set; }
    public virtual DbSet<HistorialCambio> HistorialCambios { get; set; }
    public virtual DbSet<HistorialLogin> HistorialLogins { get; set; }
    public virtual DbSet<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; }
    public virtual DbSet<MovimientoInventario> MovimientosInventario { get; set; }

    public virtual DbSet<ImagenPerfil> ImagenPerfils { get; set; }
    public virtual DbSet<Insidencia> Insidencias { get; set; }
    public virtual DbSet<LadoAmputacion> LadoAmputacions { get; set; }
    public virtual DbSet<Liner> Liners { get; set; }
    public virtual DbSet<LinerTransfemoral> LinerTransfemorals { get; set; }
    public virtual DbSet<LinerTranstibial> LinerTranstibials { get; set; }
    public virtual DbSet<Mantenimiento> Mantenimientos { get; set; }
    public virtual DbSet<MantenimientoComponente> MantenimientoComponentes { get; set; }
    public virtual DbSet<MedidaTransfemoral> MedidaTransfemorals { get; set; }
    public virtual DbSet<MedidaTransfemoralPrueba> MedidaTransfemoralPruebas { get; set; }
    public virtual DbSet<MedidaTranstibial> MedidaTranstibials { get; set; }
    public virtual DbSet<MedidasCircunferenciaPrueba> MedidasCircunferenciaPruebas { get; set; }
    public virtual DbSet<MedidasCircunferencium> MedidasCircunferencia { get; set; }
    public virtual DbSet<Paciente> Pacientes { get; set; }
    public virtual DbSet<Protesi> Protesis { get; set; }
    public virtual DbSet<ProtesisComponente> ProtesisComponentes { get; set; }
    public virtual DbSet<Provincium> Provincia { get; set; }
    public virtual DbSet<PruebaSocket> PruebaSockets { get; set; }
    public virtual DbSet<Reporte> Reportes { get; set; }
    public virtual DbSet<Rol> Rols { get; set; }
    public virtual DbSet<SocketPaciente> SocketPacientes { get; set; }
    public virtual DbSet<Talla> Tallas { get; set; }
    public virtual DbSet<TipoAmputacion> TipoAmputacions { get; set; }
    public virtual DbSet<TipoLiner> TipoLiners { get; set; }
    public virtual DbSet<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; }
    public virtual DbSet<TranstibialPrueba> TranstibialPruebas { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }
    public virtual DbSet<Comentario> Comentarios { get; set; }
  
    public virtual DbSet<UsuarioProtesis> UsuarioProtesis { get; set; }
    public virtual DbSet<InventarioComponentes> InventarioComponentes { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-TFNBFUK;Database=ProtoScanner3D;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


        modelBuilder.Entity<CausaAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdCausa).HasName("PK__Causa_Am__110B9210557D7AA8");

            entity.ToTable("Causa_Amputacion");

            entity.Property(e => e.IdCausa).HasColumnName("Id_causa");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<Componente>(entity =>
        {
            entity.HasKey(e => e.ComponentId).HasName("PK__Componen__D79CF02E9DE3978F");

            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");
            entity.Property(e => e.Codigo)
                .HasMaxLength(50)
                .HasColumnName("codigo");
            entity.Property(e => e.ComponentTipoId).HasColumnName("ComponentTipoID");
            entity.Property(e => e.Description).HasMaxLength(255);

            entity.HasOne(d => d.ComponentTipo).WithMany(p => p.Componentes)
                .HasForeignKey(d => d.ComponentTipoId)
                .HasConstraintName("FK__Component__Compo__75A278F5");
        });

        modelBuilder.Entity<ComponenteTipo>(entity =>
        {
            entity.HasKey(e => e.ComponentTipoId).HasName("PK__Componen__70E6A0E0C95F2917");

            entity.ToTable("Componente_Tipos");

            entity.Property(e => e.ComponentTipoId).HasColumnName("ComponentTipoID");
            entity.Property(e => e.TipoNombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Entrega>(entity =>
        {
            entity.HasKey(e => e.IdEntregas).HasName("PK__Entregas__39E3689C21CA3CF6");

            entity.Property(e => e.IdEntregas).HasColumnName("Id_Entregas");
            entity.Property(e => e.FechaEntrega).HasColumnName("fecha_Entrega");
            entity.Property(e => e.FirmaDescargoComponenteLista).HasColumnName("Firma_descargo_componente_lista");
            entity.Property(e => e.GeneralModificacion)
                .HasColumnType("text")
                .HasColumnName("general_Modificacion");
            entity.Property(e => e.IdMantenimiento).HasColumnName("Id_mantenimiento");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_Paciente");
            entity.Property(e => e.IdProtesis).HasColumnName("Id_Protesis");
            entity.Property(e => e.IdPruebaSocket).HasColumnName("Id_prueba_Socket");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(e => e.MantenimientoPostEntrega).HasColumnName("Mantenimiento_post_entrega");
            entity.Property(e => e.MaterialRelleno)
                .HasColumnType("text")
                .HasColumnName("material_relleno");
            entity.Property(e => e.Otros).HasColumnType("text");
            entity.Property(e => e.PracticaMarcha).HasColumnName("practica_Marcha");
            entity.Property(e => e.Reduccion).HasColumnType("decimal(5, 2)");

            entity.HasOne(d => d.IdMantenimientoNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdMantenimiento)
                .HasConstraintName("FK__Entregas__Id_man__43D61337");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Entregas__Id_Pac__40F9A68C");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Entregas__Id_Pro__41EDCAC5");

            entity.HasOne(d => d.IdPruebaSocketNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdPruebaSocket)
                .HasConstraintName("FK__Entregas__Id_pru__44CA3770");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Entregas__Id_Usu__42E1EEFE");
        });

        modelBuilder.Entity<EstatusPaciente>(entity =>
        {
            entity.HasKey(e => e.IdEstatusPaciente).HasName("PK__Estatus___2683C758D54CF032");

            entity.ToTable("Estatus_paciente");

            entity.Property(e => e.IdEstatusPaciente).HasColumnName("Id_Estatus_paciente");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EstatusProtesi>(entity =>
        {
            entity.HasKey(e => e.IdEstatusProtesis).HasName("PK__Estatus___34BA47CCAA05251F");

            entity.ToTable("Estatus_protesis");

            entity.Property(e => e.IdEstatusProtesis).HasColumnName("Id_Estatus_protesis");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.IdGenero).HasName("PK__Genero__E76DD66E96C6E696");

            entity.ToTable("Genero");

            entity.Property(e => e.IdGenero).HasColumnName("Id_Genero");
            entity.Property(e => e.Genero1)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Genero");
        });

        modelBuilder.Entity<HistorialCambio>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__76E6C502CD199D5F");

            entity.ToTable("Historial_Cambios");

            entity.Property(e => e.IdHistorial).HasColumnName("id_historial");
            entity.Property(e => e.FechaMidificacion)
                .IsRowVersion()
                .IsConcurrencyToken()
                .HasColumnName("fecha_midificacion");
            entity.Property(e => e.IdRegistroModificado).HasColumnName("id_registro_modificado");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Operacion)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("operacion");
            entity.Property(e => e.TablaModificada)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("tabla_modificada");
            entity.Property(e => e.ValorAnterior)
                .IsUnicode(false)
                .HasColumnName("valor_anterior");
            entity.Property(e => e.ValorNuevo)
                .IsUnicode(false)
                .HasColumnName("valor_nuevo");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialCambios)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Historial__id_us__5441852A");
        });

        modelBuilder.Entity<HistorialLogin>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__76E6C502C337E2E0");

            entity.ToTable("Historial_Login");

            entity.Property(e => e.IdHistorial).HasColumnName("id_historial");
            entity.Property(e => e.Direccion)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Dispositivo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("dispositivo");
            entity.Property(e => e.Exito).HasColumnName("exito");
            entity.Property(e => e.FechaLogin)
                .HasColumnType("datetime")
                .HasColumnName("fecha_login");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialLogins)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Historial__id_us__5165187F");
        });

        modelBuilder.Entity<HistorialPacienteIngreso>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__EA5F513BA8CB0B38");

            entity.ToTable("Historial_Paciente_Ingreso");

            entity.Property(e => e.IdHistorial).HasColumnName("Id_historial");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.FechaAmputacion).HasColumnName("fecha_amputacion");
            entity.Property(e => e.IdMedida).HasColumnName("Id_Medida");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.LadoAmputacion).HasColumnName("lado_amputacion");
            entity.Property(e => e.TiempoTerapia)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("Tiempo_terapia");
            entity.Property(e => e.TipoAmputacion).HasColumnName("tipo_amputacion");

            entity.HasOne(d => d.CausaNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.Causa)
                .HasConstraintName("FK__Historial__Causa__6E01572D");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Historial__Id_pa__6B24EA82");

            entity.HasOne(d => d.LadoAmputacionNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.LadoAmputacion)
                .HasConstraintName("FK__Historial__lado___6D0D32F4");

            entity.HasOne(d => d.TipoAmputacionNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.TipoAmputacion)
                .HasConstraintName("FK__Historial__tipo___6C190EBB");
        });

        modelBuilder.Entity<ImagenPerfil>(entity =>
        {
            entity.HasKey(e => e.IdImagen).HasName("PK__Imagen_P__27CC26899F7B5A40");

            entity.ToTable("Imagen_Perfil");

            entity.Property(e => e.IdImagen).HasColumnName("id_imagen");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_usuario");
            entity.Property(e => e.Imagen).HasColumnName("imagen");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.ImagenPerfils)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Imagen_Pe__Id_us__70DDC3D8");
        });

        modelBuilder.Entity<Insidencia>(entity =>
        {
            entity.HasKey(e => e.IdInsidencias).HasName("PK__Insidenc__FEC3301469A2940B");

            entity.Property(e => e.IdInsidencias).HasColumnName("Id_Insidencias");
            entity.Property(e => e.Componentes)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.IdEntregas).HasColumnName("Id_Entregas");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_Paciente");
            entity.Property(e => e.IdProtesis).HasColumnName("Id_Protesis");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

            entity.HasOne(d => d.IdEntregasNavigation).WithMany(p => p.InsidenciaNavigation)
                .HasForeignKey(d => d.IdEntregas)
                .HasConstraintName("FK__Insidenci__Id_En__47A6A41B");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.InsidenciaNavigation)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Insidenci__Id_Pa__489AC854");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Insidencia)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Insidenci__Id_Pr__498EEC8D");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Insidencia)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Insidenci__Id_Us__4A8310C6");
        });

        modelBuilder.Entity<LadoAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdLado).HasName("PK__Lado_Amp__0C789950118F7587");

            entity.ToTable("Lado_Amputacion");

            entity.Property(e => e.IdLado).HasColumnName("Id_lado");
            entity.Property(e => e.LadoAmputacion1)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("lado_amputacion");
        });

        modelBuilder.Entity<Liner>(entity =>
        {
            entity.HasKey(e => e.IdLiner).HasName("PK__Liner__F8F1538DA9F455E5");

            entity.ToTable("Liner");

            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.Talla)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("talla");
            entity.Property(e => e.TipoLiner)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo_liner");
        });

        modelBuilder.Entity<LinerTransfemoral>(entity =>
        {
            entity.HasKey(e => e.IdLiner).HasName("PK__Liner_Tr__F8F1538D04328236");

            entity.ToTable("Liner_Transfemoral");

            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.TallaId).HasColumnName("TallaID");
            entity.Property(e => e.TipoLinerId).HasColumnName("TipoLinerID");

            entity.HasOne(d => d.Talla).WithMany(p => p.LinerTransfemorals)
                .HasForeignKey(d => d.TallaId)
                .HasConstraintName("FK__Liner_Tra__Talla__02FC7413");

            entity.HasOne(d => d.TipoLiner).WithMany(p => p.LinerTransfemorals)
                .HasForeignKey(d => d.TipoLinerId)
                .HasConstraintName("FK__Liner_Tra__TipoL__02084FDA");
        });

        modelBuilder.Entity<LinerTranstibial>(entity =>
        {
            entity.HasKey(e => e.IdLiner).HasName("PK__Liner_Tr__F8F1538D88E3A7FA");

            entity.ToTable("Liner_Transtibial");

            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.TallaId).HasColumnName("TallaID");
            entity.Property(e => e.TipoLinerId).HasColumnName("TipoLinerID");

            entity.HasOne(d => d.Talla).WithMany(p => p.LinerTranstibials)
                .HasForeignKey(d => d.TallaId)
                .HasConstraintName("FK__Liner_Tra__Talla__7F2BE32F");

            entity.HasOne(d => d.TipoLiner).WithMany(p => p.LinerTranstibials)
                .HasForeignKey(d => d.TipoLinerId)
                .HasConstraintName("FK__Liner_Tra__TipoL__7E37BEF6");
        });

        modelBuilder.Entity<Mantenimiento>(entity =>
        {
            entity.HasKey(e => e.IdMantenimiento).HasName("PK__Mantenim__707E5D166DD0579E");

            entity.ToTable("Mantenimiento");

            entity.Property(e => e.IdMantenimiento).HasColumnName("id_mantenimiento");
            entity.Property(e => e.FechaMantenimiento).HasColumnName("fecha_mantenimiento");
            entity.Property(e => e.IdComponentes).HasColumnName("id_componentes");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdProtesis).HasColumnName("Id_protesis");
            entity.Property(e => e.IdSocket).HasColumnName("Id_socket");
            entity.Property(e => e.ImagenFallo1).HasColumnName("imagen_fallo1");
            entity.Property(e => e.ImagenFallo2).HasColumnName("imagen_fallo2");
            entity.Property(e => e.NuevasMedidas).HasColumnName("nuevas_medidas");
            entity.Property(e => e.NumSocketsFabricados).HasColumnName("num_sockets_fabricados");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Mantenimi__Id_pa__3587F3E0");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Mantenimi__Id_pr__367C1819");

            entity.HasOne(d => d.IdSocketNavigation).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.IdSocket)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Mantenimi__Id_so__37703C52");
        });

        modelBuilder.Entity<MantenimientoComponente>(entity =>
        {
            entity.HasKey(e => new { e.ProtesisId, e.ComponentId }).HasName("PK__Mantenim__87BBF25413B6D4D3");

            entity.ToTable("Mantenimiento_Componentes");

            entity.Property(e => e.ProtesisId).HasColumnName("ProtesisID");
            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.MantenimientoId).HasColumnName("MantenimientoID");

            entity.HasOne(d => d.Component).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.ComponentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mantenimi__Compo__3B40CD36");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Mantenimi__Id_pa__3D2915A8");

            entity.HasOne(d => d.Mantenimiento).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.MantenimientoId)
                .HasConstraintName("FK__Mantenimi__Mante__3C34F16F");

            entity.HasOne(d => d.MedidasNavigation).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.Medidas)
                .HasConstraintName("FK__Mantenimi__Medid__3E1D39E1");

            entity.HasOne(d => d.Protesis).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.ProtesisId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mantenimi__Prote__3A4CA8FD");
        });

        modelBuilder.Entity<MedidaTransfemoral>(entity =>
        {
            entity.HasKey(e => e.IdMedidaT).HasName("PK__Medida_T__14B4624DB1FE15D3");

            entity.ToTable("Medida_Transfemoral");

            entity.Property(e => e.IdMedidaT).HasColumnName("Id_medida_T");
            entity.Property(e => e.AlturaTalon)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("altura_talon");
            entity.Property(e => e.DisenadorSocket)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("disenador_socket");
            entity.Property(e => e.FechaEscaneo).HasColumnName("fecha_escaneo");
            entity.Property(e => e.FotoMunon).HasColumnName("foto_munon");
            entity.Property(e => e.IdEscaneo).HasColumnName("Id_escaneo");
            entity.Property(e => e.IdLiner).HasColumnName("id_Liner");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.LongitudPie)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_pie");
            entity.Property(e => e.Medida1)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Medida2)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.IdEscaneoNavigation).WithMany(p => p.MedidaTransfemorals)
                .HasForeignKey(d => d.IdEscaneo)
                .HasConstraintName("FK__Medida_Tr__Id_es__0F624AF8");

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.MedidaTransfemorals)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Medida_Tr__id_Li__10566F31");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTransfemorals)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__114A936A");
        });

        modelBuilder.Entity<MedidaTransfemoralPrueba>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__Medida_T__88604D55C94B680D");

            entity.ToTable("Medida_Transfemoral_Prueba");

            entity.Property(e => e.IdMedida).HasColumnName("Id_medida");
            entity.Property(e => e.AlturaTalon)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("altura_talon");
            entity.Property(e => e.DisenadorSocket)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("disenador_socket");
            entity.Property(e => e.FechaEscaneo).HasColumnName("fecha_escaneo");
            entity.Property(e => e.FotoMunon).HasColumnName("foto_munon");
            entity.Property(e => e.IdLiner).HasColumnName("id_Liner");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdPrueba).HasColumnName("Id_prueba");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.LongitudPie)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_pie");
            entity.Property(e => e.Medida1)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Medida2)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.MedidaTransfemoralPruebas)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Medida_Tr__id_Li__2645B050");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTransfemoralPruebas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__25518C17");

            entity.HasOne(d => d.IdPruebaNavigation).WithMany(p => p.MedidaTransfemoralPruebas)
                .HasForeignKey(d => d.IdPrueba)
                .HasConstraintName("FK__Medida_Tr__Id_pr__2739D489");
        });

        modelBuilder.Entity<MedidaTranstibial>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__Medida_T__E038E0903CD00E88");

            entity.ToTable("Medida_Transtibial");

            entity.Property(e => e.IdMedida).HasColumnName("id_medida");
            entity.Property(e => e.AlturaTacon)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("altura_tacon");
            entity.Property(e => e.ApTension)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ap_tension");
            entity.Property(e => e.Circunferencia12cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_12cm");
            entity.Property(e => e.Circunferencia15cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_15cm");
            entity.Property(e => e.Circunferencia21cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_21cm");
            entity.Property(e => e.Circunferencia24cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_24cm");
            entity.Property(e => e.Circunferencia27cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_27cm");
            entity.Property(e => e.Circunferencia30cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_30cm");
            entity.Property(e => e.Circunferencia3cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_3cm");
            entity.Property(e => e.Circunferencia6cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_6cm");
            entity.Property(e => e.Circunferencia9cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_9cm");
            entity.Property(e => e.FechaEscaneo).HasColumnName("fecha_escaneo");
            entity.Property(e => e.IdEscaneo).HasColumnName("Id_escaneo");
            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.LongitudOsea)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_osea");
            entity.Property(e => e.LongitudPies)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_pies");
            entity.Property(e => e.LongitudTotalMunon)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("longitud_total_munon");
            entity.Property(e => e.MlSobreRodilla)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_sobre_rodilla");
            entity.Property(e => e.MlSupracondilar)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_supracondilar");
            entity.Property(e => e.MlTendon)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_tendon");
            entity.Property(e => e.Notas).HasColumnName("notas");
            entity.Property(e => e.Protesista)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("protesista");

            entity.HasOne(d => d.IdEscaneoNavigation).WithMany(p => p.MedidaTranstibials)
                .HasForeignKey(d => d.IdEscaneo)
                .HasConstraintName("FK__Medida_Tr__Id_es__0B91BA14");

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.MedidaTranstibials)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Medida_Tr__Id_Li__0C85DE4D");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTranstibials)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__0A9D95DB");
        });

        modelBuilder.Entity<MedidasCircunferenciaPrueba>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__MedidasC__E038E090B054CC66");

            entity.ToTable("MedidasCircunferencia_Prueba");

            entity.Property(e => e.IdMedida).HasColumnName("id_medida");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.NumeroCircunferencia).HasColumnName("numero_circunferencia");
            entity.Property(e => e.ValorMm)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mm");

            entity.HasOne(d => d.IdValorNavigation).WithMany(p => p.MedidasCircunferenciaPruebas)
                .HasForeignKey(d => d.IdValor)
                .HasConstraintName("FK__MedidasCi__id_va__2A164134");
        });

        modelBuilder.Entity<MedidasCircunferencium>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__MedidasC__E038E0909C6A9A50");

            entity.Property(e => e.IdMedida).HasColumnName("id_medida");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.NumeroCircunferencia).HasColumnName("numero_circunferencia");
            entity.Property(e => e.ValorMm)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mm");

            entity.HasOne(d => d.IdValorNavigation).WithMany(p => p.MedidasCircunferencia)
                .HasForeignKey(d => d.IdValor)
                .HasConstraintName("FK__MedidasCi__id_va__14270015");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.IdPaciente).HasName("PK__Paciente__3874F59A800A147C");

            entity.ToTable("Paciente");

            entity.HasIndex(e => e.Cedula, "UQ__Paciente__415B7BE589E50B25").IsUnique();

            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.Cedula)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fecha_nacimiento");
            entity.Property(e => e.FotoPaciente).HasColumnName("foto_paciente");
            entity.Property(e => e.IdEstatusPaciente).HasColumnName("Id_Estatus_paciente");
            entity.Property(e => e.IdEstatusProtesis).HasColumnName("Id_Estatus_protesis");
            entity.Property(e => e.IdProvincia).HasColumnName("Id_Provincia");
            entity.Property(e => e.NombreCompleto)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre_completo");
            entity.Property(e => e.Sector)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("sector");
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("telefono");
            entity.Property(e => e.TelefonoCelular)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("telefono_celular");

            entity.HasOne(d => d.GeneroNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.Genero)
                .HasConstraintName("FK__Paciente__Genero__6383C8BA");

            entity.HasOne(d => d.IdEstatusPacienteNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdEstatusPaciente)
                .HasConstraintName("FK__Paciente__Id_Est__656C112C");

            entity.HasOne(d => d.IdEstatusProtesisNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdEstatusProtesis)
                .HasConstraintName("FK__Paciente__Id_Est__66603565");

            entity.HasOne(d => d.IdProvinciaNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdProvincia)
                .HasConstraintName("FK__Paciente__Id_Pro__6477ECF3");
        });

        modelBuilder.Entity<Protesi>(entity =>
        {
            entity.HasKey(e => e.IdProtesis).HasName("PK__Protesis__D4FF3CA8DDD286A7");

            entity.ToTable("Protesis");

            entity.Property(e => e.IdProtesis).HasColumnName("id_protesis");
            entity.Property(e => e.CodigoPaciente).HasColumnName("codigo_paciente");
            entity.Property(e => e.FechaEntrega).HasColumnName("fecha_entrega");
            entity.Property(e => e.LinerTamano).HasColumnName("liner_tamano");
            entity.Property(e => e.LinerTipo).HasColumnName("liner_tipo");
            entity.Property(e => e.Material)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("material");
            entity.Property(e => e.Protesista)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("protesista");

            entity.HasOne(d => d.CodigoPacienteNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.CodigoPaciente)
                .HasConstraintName("FK__Protesis__codigo__2CF2ADDF");

            entity.HasOne(d => d.LinerTamanoNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.LinerTamano)
                .HasConstraintName("FK__Protesis__liner___2EDAF651");

            entity.HasOne(d => d.LinerTipoNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.LinerTipo)
                .HasConstraintName("FK__Protesis__liner___2DE6D218");
        });

        modelBuilder.Entity<ProtesisComponente>(entity =>
        {
            entity.HasKey(e => new { e.ProtesisId, e.ComponentId }).HasName("PK__Protesis__87BBF2547182BF5A");

            entity.ToTable("Protesis_Componentes");

            entity.Property(e => e.ProtesisId).HasColumnName("ProtesisID");
            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");

            entity.HasOne(d => d.Component).WithMany(p => p.ProtesisComponentes)
                .HasForeignKey(d => d.ComponentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Protesis___Compo__32AB8735");

            entity.HasOne(d => d.Protesis).WithMany(p => p.ProtesisComponentes)
                .HasForeignKey(d => d.ProtesisId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Protesis___Prote__31B762FC");
        });

        modelBuilder.Entity<Provincium>(entity =>
        {
            entity.HasKey(e => e.IdProvincia).HasName("PK__Provinci__1B620273206CC6FB");

            entity.Property(e => e.IdProvincia).HasColumnName("Id_Provincia");
            entity.Property(e => e.NombreProvincia)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Nombre_Provincia");
        });

        modelBuilder.Entity<PruebaSocket>(entity =>
        {
            entity.HasKey(e => e.IdPrueba).HasName("PK__Prueba_S__328A45737C22E3B9");

            entity.ToTable("Prueba_Socket");

            entity.Property(e => e.IdPrueba).HasColumnName("id_prueba");
            entity.Property(e => e.DuracionTerapia)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("duracion_terapia");
            entity.Property(e => e.FechaFallo).HasColumnName("fecha_fallo");
            entity.Property(e => e.FechaMantenimientoPostEntrega).HasColumnName("fecha_mantenimiento_post_entrega");
            entity.Property(e => e.FechaPractica).HasColumnName("fecha_practica");
            entity.Property(e => e.FechaPrueba).HasColumnName("fecha_prueba");
            entity.Property(e => e.IdComponente).HasColumnName("Id_Componente");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdSocket).HasColumnName("Id_socket");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");
            entity.Property(e => e.MaterialRellenoUsado)
                .HasColumnType("text")
                .HasColumnName("material_relleno_usado");
            entity.Property(e => e.ModificacionGeneral)
                .HasColumnType("text")
                .HasColumnName("modificacion_general");
            entity.Property(e => e.PracticaMarcha).HasColumnName("practica_marcha");
            entity.Property(e => e.PracticaRecibida).HasColumnName("practica_recibida");
            entity.Property(e => e.QuienLaHizo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("quien_la_hizo");
            entity.Property(e => e.SocketFallo).HasColumnName("socket_fallo");

            entity.HasOne(d => d.IdComponenteNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdComponente)
                .HasConstraintName("FK__Prueba_So__Id_Co__1BC821DD");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Prueba_So__Id_pa__1AD3FDA4");

            entity.HasOne(d => d.IdSocketNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdSocket)
                .HasConstraintName("FK__Prueba_So__Id_so__1DB06A4F");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Prueba_So__Id_Us__1CBC4616");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.IdReporte).HasName("PK__Reportes__87E4F5CB15AC1038");

            entity.Property(e => e.IdReporte).HasColumnName("id_reporte");
            entity.Property(e => e.CodigoPaciente).HasColumnName("codigo_paciente");
            entity.Property(e => e.NumSocketsFabricados).HasColumnName("num_sockets_fabricados");

            entity.HasOne(d => d.CodigoPacienteNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.CodigoPaciente)
                .HasConstraintName("FK__Reportes__codigo__4D5F7D71");

            entity.HasOne(d => d.NumSocketsFabricadosNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.NumSocketsFabricados)
                .HasConstraintName("FK__Reportes__num_so__4E53A1AA");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__6ABCB5E02BCF416E");

            entity.ToTable("Rol");

            entity.HasIndex(e => e.NombreRol, "UQ__Rol__673CB435816DEBBB").IsUnique();

            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreRol)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre_rol");
        });

        modelBuilder.Entity<SocketPaciente>(entity =>
        {
            entity.HasKey(e => e.IdSocket).HasName("PK__Socket_P__14CC4DA62456D9F9");

            entity.ToTable("Socket_Paciente");

            entity.Property(e => e.IdSocket).HasColumnName("Id_socket");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.Tamaño)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tamaño");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.SocketPacientes)
                .HasForeignKey(d => d.IdPaciente)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Socket_Pa__Id_pa__17F790F9");
        });

        modelBuilder.Entity<Talla>(entity =>
        {
            entity.HasKey(e => e.IdTalla).HasName("PK__Tallas__A135FE6E637EC9A6");

            entity.Property(e => e.IdTalla).HasColumnName("Id_Talla");
            entity.Property(e => e.TallaNombre)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TipoAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdAmputacion).HasName("PK__Tipo_Amp__1A5D1A33897FDC1C");

            entity.ToTable("Tipo_Amputacion");

            entity.Property(e => e.IdAmputacion).HasColumnName("Id_amputacion");
            entity.Property(e => e.TipoAmputacion1)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("tipo_amputacion");
        });

        modelBuilder.Entity<TipoLiner>(entity =>
        {
            entity.HasKey(e => e.IdTipoLiner).HasName("PK__Tipo_Lin__EAA77667F87552F7");

            entity.ToTable("Tipo_Liner");

            entity.Property(e => e.IdTipoLiner).HasColumnName("Id_TipoLiner");
            entity.Property(e => e.TipoNombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TomaMedidasEscaneo>(entity =>
        {
            entity.HasKey(e => e.IdEscaneo).HasName("PK__Toma_med__83D46B0D4684ED4A");

            entity.ToTable("Toma_medidas_escaneo");

            entity.Property(e => e.IdEscaneo).HasColumnName("id_escaneo");
            entity.Property(e => e.Comentario).HasColumnName("comentario");
            entity.Property(e => e.FechaEscaneo).HasColumnName("fecha_escaneo");
            entity.Property(e => e.FotosMunon).HasColumnName("fotos_munon");
            entity.Property(e => e.IdAmputacion).HasColumnName("Id_amputacion");
            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.ResultadoDoc).HasColumnName("resultadoDoc");
            entity.Property(e => e.ResultadoScaneo)
                .HasColumnType("text")
                .HasColumnName("Resultado_scaneo");

            entity.HasOne(d => d.IdAmputacionNavigation).WithMany(p => p.TomaMedidasEscaneos)
                .HasForeignKey(d => d.IdAmputacion)
                .HasConstraintName("FK__Toma_medi__Id_am__06CD04F7");

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.TomaMedidasEscaneos)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Toma_medi__Id_Li__07C12930");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.TomaMedidasEscaneos)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Toma_medi__Id_pa__05D8E0BE");
        });

        modelBuilder.Entity<TranstibialPrueba>(entity =>
        {
            entity.HasKey(e => e.IdEscaneo).HasName("PK__Transtib__83D46B0D409C63E6");

            entity.ToTable("Transtibial_Prueba");

            entity.Property(e => e.IdEscaneo).HasColumnName("id_escaneo");
            entity.Property(e => e.AlturaTacon)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("altura_tacon");
            entity.Property(e => e.ApTension)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ap_tension");
            entity.Property(e => e.Circunferencia12cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_12cm");
            entity.Property(e => e.Circunferencia15cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_15cm");
            entity.Property(e => e.Circunferencia21cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_21cm");
            entity.Property(e => e.Circunferencia24cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_24cm");
            entity.Property(e => e.Circunferencia27cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_27cm");
            entity.Property(e => e.Circunferencia30cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_30cm");
            entity.Property(e => e.Circunferencia3cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_3cm");
            entity.Property(e => e.Circunferencia6cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_6cm");
            entity.Property(e => e.Circunferencia9cm)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("circunferencia_9cm");
            entity.Property(e => e.FechaEscaneo).HasColumnName("fecha_escaneo");
            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdPrueba).HasColumnName("Id_prueba");
            entity.Property(e => e.LongitudOsea)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_osea");
            entity.Property(e => e.LongitudPies)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("longitud_pies");
            entity.Property(e => e.LongitudTotalMunon)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("longitud_total_munon");
            entity.Property(e => e.MlSobreRodilla)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_sobre_rodilla");
            entity.Property(e => e.MlSupracondilar)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_supracondilar");
            entity.Property(e => e.MlTendon)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("ml_tendon");
            entity.Property(e => e.Notas).HasColumnName("notas");
            entity.Property(e => e.Protesista)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("protesista");

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.TranstibialPruebas)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Transtibi__Id_Li__2180FB33");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.TranstibialPruebas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Transtibi__Id_pa__208CD6FA");

            entity.HasOne(d => d.IdPruebaNavigation).WithMany(p => p.TranstibialPruebas)
                .HasForeignKey(d => d.IdPrueba)
                .HasConstraintName("FK__Transtibi__Id_pr__22751F6C");
        });


        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__4E3E04AD65D9EBEA");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.Email, "UQ__Usuario__AB6E6164D5DD97DE").IsUnique();

            entity.HasIndex(e => e.NombreUsuario, "UQ__Usuario__D4D22D7475FEE1D0").IsUnique();

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FechaCreacion).HasColumnName("fecha_creacion");
            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.Nombre)
                .HasMaxLength(220)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre_usuario");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password_hash");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Usuario__id_rol__4E88ABD4");
        });


        modelBuilder.Entity<MovimientoInventario>(entity =>
        {
            entity.HasKey(e => e.MovimientoID);  // Define la clave primaria

            entity.Property(e => e.MovimientoID).HasColumnName("MovimientoID");
            entity.Property(e => e.ComponentID).HasColumnName("ComponentID");
            entity.Property(e => e.FechaMovimiento).HasColumnName("FechaMovimiento");
            entity.Property(e => e.TipoMovimiento)
                  .HasMaxLength(10)
                  .HasColumnName("TipoMovimiento");
            entity.Property(e => e.Cantidad).HasColumnName("Cantidad");
            entity.Property(e => e.Descripcion)
                  .HasMaxLength(255)
                  .HasColumnName("Descripcion");

            // Configura la relación con la tabla Componentes
            entity.HasOne(e => e.Componente)
                .WithMany(c => c.MovimientosInventarios)
                .HasForeignKey(e => e.ComponentID)
                .OnDelete(DeleteBehavior.Cascade);
        });



        // Usuario_Protesis Entity Configuration
        modelBuilder.Entity<UsuarioProtesis>(entity =>
        {
            entity.HasKey(e => new { e.IdUsuario, e.IdProtesis });

            entity.Property(e => e.IdUsuario).HasColumnName("IdUsuario");
            entity.Property(e => e.IdProtesis).HasColumnName("IdProtesis");

            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.UsuarioProtesis)
                .HasForeignKey(e => e.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Protesis)
                .WithMany(p => p.UsuarioProtesis)
                .HasForeignKey(e => e.IdProtesis)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Inventario_Componentes Entity Configuration
        modelBuilder.Entity<InventarioComponentes>(entity =>
        {
            entity.HasKey(e => e.InventarioID);

            entity.Property(e => e.InventarioID).HasColumnName("InventarioID");
            entity.Property(e => e.ComponentID).HasColumnName("ComponentID");
            entity.Property(e => e.StockActual)
                .HasColumnName("StockActual")
                .HasDefaultValue(0);
            entity.Property(e => e.PuntoReorden)
                .HasColumnName("PuntoReorden")
                .HasDefaultValue(5);

            entity.HasOne(e => e.Componente)
                .WithOne(c => c.InventarioComponentes)
                .HasForeignKey<InventarioComponentes>(e => e.ComponentID)
                .OnDelete(DeleteBehavior.Cascade);
        });


        // Configuración de la tabla Comentarios
        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.Usuario)
            .WithMany()
            .HasForeignKey(c => c.IdUsuario)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.Paciente)
            .WithMany()
            .HasForeignKey(c => c.IdPaciente);

        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.TomaMedida)
            .WithMany()
            .HasForeignKey(c => c.IdTomaMedida);

        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.PruebaSocket)
            .WithMany()
            .HasForeignKey(c => c.IdPruebaSocket);

        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.Mantenimiento)
            .WithMany()
            .HasForeignKey(c => c.IdMantenimiento);

        modelBuilder.Entity<Comentario>()
            .HasOne(c => c.Protesis)
            .WithMany()
            .HasForeignKey(c => c.IdProtesis);

        OnModelCreatingPartial(modelBuilder);
    }



    public async Task EntradaInventarioAsync(int componentID, int cantidad, string descripcion)
    {
        await Database.ExecuteSqlRawAsync(
            "EXEC EntradaInventario @ComponentID = {0}, @Cantidad = {1}, @Descripcion = {2}",
            componentID, cantidad, descripcion);
    }

    public async Task SalidaInventarioAsync(int componentID, int cantidad, string descripcion)
    {
        await Database.ExecuteSqlRawAsync(
            "EXEC SalidaInventario @ComponentID = {0}, @Cantidad = {1}, @Descripcion = {2}",
            componentID, cantidad, descripcion);
    }

    public async Task AsignarUsuariosAProtesisAsync(int protesisID, string usuariosAsignados)
    {
        await Database.ExecuteSqlRawAsync(
            "EXEC AsignarUsuariosAProtesis @ProtesisID = {0}, @UsuariosAsignados = {1}",
            protesisID, usuariosAsignados);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
