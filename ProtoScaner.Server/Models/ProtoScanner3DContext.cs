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

    public virtual DbSet<Cita> Citas { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Componente> Componentes { get; set; }

    public virtual DbSet<ComponenteTipo> ComponenteTipos { get; set; }

    public virtual DbSet<Entrega> Entregas { get; set; }

    public virtual DbSet<EstatusPaciente> EstatusPacientes { get; set; }

    public virtual DbSet<EstatusProtesi> EstatusProteses { get; set; }

    public virtual DbSet<Genero> Generos { get; set; }

    public virtual DbSet<HistorialCambio> HistorialCambios { get; set; }

    public virtual DbSet<HistorialCita> HistorialCitas { get; set; }

    public virtual DbSet<HistorialEstatusPaciente> HistorialEstatusPacientes { get; set; }

    public virtual DbSet<HistorialEstatusProtesi> HistorialEstatusProteses { get; set; }

    public virtual DbSet<HistorialLogin> HistorialLogins { get; set; }

    public virtual DbSet<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; }

    public virtual DbSet<ImagenPerfil> ImagenPerfils { get; set; }

    public virtual DbSet<Insidencia> Insidencias { get; set; }

    public virtual DbSet<InventarioComponente> InventarioComponentes { get; set; }

    public virtual DbSet<LadoAmputacion> LadoAmputacions { get; set; }

    public virtual DbSet<Liner> Liners { get; set; }

    public virtual DbSet<Mantenimiento> Mantenimientos { get; set; }

    public virtual DbSet<MantenimientoComponente> MantenimientoComponentes { get; set; }

    public virtual DbSet<MantenimientoDetalle> MantenimientoDetalles { get; set; }

    public virtual DbSet<MedidaTransfemoral> MedidaTransfemorals { get; set; }

    public virtual DbSet<MedidaTransfemoralPrueba> MedidaTransfemoralPruebas { get; set; }

    public virtual DbSet<MedidaTranstibial> MedidaTranstibials { get; set; }

    public virtual DbSet<MedidasCircunferenciaPrueba> MedidasCircunferenciaPruebas { get; set; }

    public virtual DbSet<MedidasCircunferencium> MedidasCircunferencia { get; set; }

    public virtual DbSet<MovimientosInventario> MovimientosInventarios { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<PacienteDescartado> PacienteDescartados { get; set; }

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

    public virtual DbSet<TiposEstadoCitum> TiposEstadoCita { get; set; }

    public virtual DbSet<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; }

    public virtual DbSet<TranstibialPrueba> TranstibialPruebas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CausaAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdCausa).HasName("PK__Causa_Am__110B9210ADC956C4");

            entity.ToTable("Causa_Amputacion");

            entity.Property(e => e.IdCausa).HasColumnName("Id_causa");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<Cita>(entity =>
        {
            entity.HasKey(e => e.IdCita).HasName("PK__Citas__A95AFC07AF24C0D2");

            entity.HasIndex(e => e.Fecha, "IX_Citas_Fecha");

            entity.HasIndex(e => e.IdEstado, "IX_Citas_Id_Estado");

            entity.HasIndex(e => e.IdPaciente, "IX_Citas_Id_Paciente");

            entity.Property(e => e.IdCita).HasColumnName("Id_Cita");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IdEstado)
                .HasDefaultValue(1)
                .HasColumnName("Id_Estado");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_Paciente");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.IdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Citas__Id_Estado__6BE40491");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Citas__Id_Pacien__6AEFE058");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => e.IdComentario).HasName("PK__Comentar__1BA6C6F4721D28BA");

            entity.Property(e => e.IdComentario).HasColumnName("id_comentario");
            entity.Property(e => e.Comentario1).HasColumnName("comentario");
            entity.Property(e => e.FechaComentario)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_comentario");
            entity.Property(e => e.IdMantenimiento).HasColumnName("Id_mantenimiento");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdProtesis).HasColumnName("Id_protesis");
            entity.Property(e => e.IdPruebaSocket).HasColumnName("Id_prueba_socket");
            entity.Property(e => e.IdTomaMedida).HasColumnName("Id_toma_medida");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_usuario");

            entity.HasOne(d => d.IdMantenimientoNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdMantenimiento)
                .HasConstraintName("FK__Comentari__Id_ma__4E53A1AA");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Comentari__Id_pa__4B7734FF");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Comentari__Id_pr__4F47C5E3");

            entity.HasOne(d => d.IdPruebaSocketNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdPruebaSocket)
                .HasConstraintName("FK__Comentari__Id_pr__4D5F7D71");

            entity.HasOne(d => d.IdTomaMedidaNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdTomaMedida)
                .HasConstraintName("FK__Comentari__Id_to__4C6B5938");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comentari__Id_us__4A8310C6");
        });

        modelBuilder.Entity<Componente>(entity =>
        {
            entity.HasKey(e => e.ComponentId).HasName("PK__Componen__D79CF02EF01988BE");

            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");
            entity.Property(e => e.Codigo)
                .HasMaxLength(50)
                .HasColumnName("codigo");
            entity.Property(e => e.ComponentTipoId).HasColumnName("ComponentTipoID");
            entity.Property(e => e.Description).HasMaxLength(255);

            entity.HasOne(d => d.ComponentTipo).WithMany(p => p.Componentes)
                .HasForeignKey(d => d.ComponentTipoId)
                .HasConstraintName("FK__Component__Compo__76969D2E");
        });

        modelBuilder.Entity<ComponenteTipo>(entity =>
        {
            entity.HasKey(e => e.ComponentTipoId).HasName("PK__Componen__70E6A0E028BBFF9B");

            entity.ToTable("Componente_Tipos");

            entity.Property(e => e.ComponentTipoId).HasColumnName("ComponentTipoID");
            entity.Property(e => e.TipoNombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Entrega>(entity =>
        {
            entity.HasKey(e => e.IdEntregas).HasName("PK__Entregas__39E3689C096AF140");

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
                .HasConstraintName("FK__Entregas__Id_man__3C34F16F");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Entregas__Id_Pac__395884C4");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Entregas__Id_Pro__3A4CA8FD");

            entity.HasOne(d => d.IdPruebaSocketNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdPruebaSocket)
                .HasConstraintName("FK__Entregas__Id_pru__3D2915A8");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Entregas)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Entregas__Id_Usu__3B40CD36");
        });

        modelBuilder.Entity<EstatusPaciente>(entity =>
        {
            entity.HasKey(e => e.IdEstatusPaciente).HasName("PK__Estatus___2683C758F4346614");

            entity.ToTable("Estatus_paciente");

            entity.HasIndex(e => e.Descripcion, "IX_Estatus_paciente_Descripcion");

            entity.Property(e => e.IdEstatusPaciente).HasColumnName("Id_Estatus_paciente");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EstatusProtesi>(entity =>
        {
            entity.HasKey(e => e.IdEstatusProtesis).HasName("PK__Estatus___34BA47CCE4555D85");

            entity.ToTable("Estatus_protesis");

            entity.HasIndex(e => e.Descripcion, "IX_Estatus_protesis_Descripcion");

            entity.Property(e => e.IdEstatusProtesis).HasColumnName("Id_Estatus_protesis");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.IdGenero).HasName("PK__Genero__E76DD66EBA258066");

            entity.ToTable("Genero");

            entity.Property(e => e.IdGenero).HasColumnName("Id_Genero");
            entity.Property(e => e.Genero1)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Genero");
        });

        modelBuilder.Entity<HistorialCambio>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__76E6C502722E3C0C");

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

        modelBuilder.Entity<HistorialCita>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__AAE1E4925D6704F4");

            entity.ToTable("Historial_Citas");

            entity.HasIndex(e => e.FechaCambio, "IX_Historial_Citas_FechaCambio");

            entity.HasIndex(e => e.IdCita, "IX_Historial_Citas_Id_Cita");

            entity.HasIndex(e => e.IdEstadoAnterior, "IX_Historial_Citas_Id_EstadoAnterior");

            entity.HasIndex(e => e.IdEstadoNuevo, "IX_Historial_Citas_Id_EstadoNuevo");

            entity.HasIndex(e => e.IdUsuario, "IX_Historial_Citas_Id_Usuario");

            entity.Property(e => e.IdHistorial).HasColumnName("Id_Historial");
            entity.Property(e => e.ComentarioAnterior).HasColumnType("text");
            entity.Property(e => e.ComentarioNuevo).HasColumnType("text");
            entity.Property(e => e.FechaCambio)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IdCita).HasColumnName("Id_Cita");
            entity.Property(e => e.IdEstadoAnterior).HasColumnName("Id_EstadoAnterior");
            entity.Property(e => e.IdEstadoNuevo).HasColumnName("Id_EstadoNuevo");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

            entity.HasOne(d => d.IdCitaNavigation).WithMany(p => p.HistorialCita)
                .HasForeignKey(d => d.IdCita)
                .HasConstraintName("FK__Historial__Id_Ci__6FB49575");

            entity.HasOne(d => d.IdEstadoAnteriorNavigation).WithMany(p => p.HistorialCitaIdEstadoAnteriorNavigations)
                .HasForeignKey(d => d.IdEstadoAnterior)
                .HasConstraintName("FK__Historial__Id_Es__719CDDE7");

            entity.HasOne(d => d.IdEstadoNuevoNavigation).WithMany(p => p.HistorialCitaIdEstadoNuevoNavigations)
                .HasForeignKey(d => d.IdEstadoNuevo)
                .HasConstraintName("FK__Historial__Id_Es__72910220");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialCita)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Historial__Id_Us__70A8B9AE");
        });

        modelBuilder.Entity<HistorialEstatusPaciente>(entity =>
        {
            entity.HasKey(e => e.IdHistorialPaciente).HasName("PK__Historia__E7E77E16595FE179");

            entity.ToTable("Historial_Estatus_Paciente");

            entity.HasIndex(e => e.FechaCambio, "IX_Historial_Estatus_Paciente_Fecha_Cambio");

            entity.HasIndex(e => e.IdEstatusAnterior, "IX_Historial_Estatus_Paciente_Id_Estatus_Anterior");

            entity.HasIndex(e => e.IdEstatusNuevo, "IX_Historial_Estatus_Paciente_Id_Estatus_Nuevo");

            entity.HasIndex(e => e.IdPaciente, "IX_Historial_Estatus_Paciente_Id_Paciente");

            entity.Property(e => e.IdHistorialPaciente).HasColumnName("Id_Historial_Paciente");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.FechaCambio)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Cambio");
            entity.Property(e => e.IdEstatusAnterior).HasColumnName("Id_Estatus_Anterior");
            entity.Property(e => e.IdEstatusNuevo).HasColumnName("Id_Estatus_Nuevo");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_Paciente");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

            entity.HasOne(d => d.IdEstatusAnteriorNavigation).WithMany(p => p.HistorialEstatusPacienteIdEstatusAnteriorNavigations)
                .HasForeignKey(d => d.IdEstatusAnterior)
                .HasConstraintName("FK__Historial__Id_Es__7755B73D");

            entity.HasOne(d => d.IdEstatusNuevoNavigation).WithMany(p => p.HistorialEstatusPacienteIdEstatusNuevoNavigations)
                .HasForeignKey(d => d.IdEstatusNuevo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Id_Es__7849DB76");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.HistorialEstatusPacientes)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Historial__Id_Pa__76619304");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialEstatusPacientes)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Historial__Id_Us__793DFFAF");
        });

        modelBuilder.Entity<HistorialEstatusProtesi>(entity =>
        {
            entity.HasKey(e => e.IdHistorialProtesis).HasName("PK__Historia__BF746B8611964740");

            entity.ToTable("Historial_Estatus_Protesis");

            entity.HasIndex(e => e.FechaCambio, "IX_Historial_Estatus_Protesis_Fecha_Cambio");

            entity.HasIndex(e => e.IdEstatusAnterior, "IX_Historial_Estatus_Protesis_Id_Estatus_Anterior");

            entity.HasIndex(e => e.IdEstatusNuevo, "IX_Historial_Estatus_Protesis_Id_Estatus_Nuevo");

            entity.HasIndex(e => e.IdProtesis, "IX_Historial_Estatus_Protesis_Id_Protesis");

            entity.Property(e => e.IdHistorialProtesis).HasColumnName("Id_Historial_Protesis");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.FechaCambio)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Cambio");
            entity.Property(e => e.IdEstatusAnterior).HasColumnName("Id_Estatus_Anterior");
            entity.Property(e => e.IdEstatusNuevo).HasColumnName("Id_Estatus_Nuevo");
            entity.Property(e => e.IdProtesis).HasColumnName("Id_Protesis");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

            entity.HasOne(d => d.IdEstatusAnteriorNavigation).WithMany(p => p.HistorialEstatusProtesiIdEstatusAnteriorNavigations)
                .HasForeignKey(d => d.IdEstatusAnterior)
                .HasConstraintName("FK__Historial__Id_Es__7E02B4CC");

            entity.HasOne(d => d.IdEstatusNuevoNavigation).WithMany(p => p.HistorialEstatusProtesiIdEstatusNuevoNavigations)
                .HasForeignKey(d => d.IdEstatusNuevo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__Id_Es__7EF6D905");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.HistorialEstatusProtesis)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Historial__Id_Pr__7D0E9093");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialEstatusProtesis)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Historial__Id_Us__7FEAFD3E");
        });

        modelBuilder.Entity<HistorialLogin>(entity =>
        {
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__76E6C50278D749E0");

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
            entity.HasKey(e => e.IdHistorial).HasName("PK__Historia__EA5F513BA3D44728");

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
                .HasConstraintName("FK__Historial__Causa__6EF57B66");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Historial__Id_pa__6C190EBB");

            entity.HasOne(d => d.LadoAmputacionNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.LadoAmputacion)
                .HasConstraintName("FK__Historial__lado___6E01572D");

            entity.HasOne(d => d.TipoAmputacionNavigation).WithMany(p => p.HistorialPacienteIngresos)
                .HasForeignKey(d => d.TipoAmputacion)
                .HasConstraintName("FK__Historial__tipo___6D0D32F4");
        });

        modelBuilder.Entity<ImagenPerfil>(entity =>
        {
            entity.HasKey(e => e.IdImagen).HasName("PK__Imagen_P__27CC2689E3ECA3C2");

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
                .HasConstraintName("FK__Imagen_Pe__Id_us__71D1E811");
        });

        modelBuilder.Entity<Insidencia>(entity =>
        {
            entity.HasKey(e => e.IdInsidencias).HasName("PK__Insidenc__FEC33014C0DC88EE");

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
                .HasConstraintName("FK__Insidenci__Id_En__40058253");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.InsidenciaNavigation)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Insidenci__Id_Pa__40F9A68C");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Insidencia)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Insidenci__Id_Pr__41EDCAC5");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Insidencia)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Insidenci__Id_Us__42E1EEFE");
        });

        modelBuilder.Entity<InventarioComponente>(entity =>
        {
            entity.HasKey(e => e.InventarioId).HasName("PK__Inventar__FB8A24B713A5DCCF");

            entity.ToTable("Inventario_Componentes");

            entity.HasIndex(e => e.ComponentId, "UQ__Inventar__D79CF02F0B576C53").IsUnique();

            entity.Property(e => e.InventarioId).HasColumnName("InventarioID");
            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");
            entity.Property(e => e.PuntoReorden).HasDefaultValue(5);

            entity.HasOne(d => d.Component).WithOne(p => p.InventarioComponente)
                .HasForeignKey<InventarioComponente>(d => d.ComponentId)
                .HasConstraintName("FK__Inventari__Compo__5D95E53A");
        });

        modelBuilder.Entity<LadoAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdLado).HasName("PK__Lado_Amp__0C789950EECACC1C");

            entity.ToTable("Lado_Amputacion");

            entity.Property(e => e.IdLado).HasColumnName("Id_lado");
            entity.Property(e => e.LadoAmputacion1)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("lado_amputacion");
        });

        modelBuilder.Entity<Liner>(entity =>
        {
            entity.HasKey(e => e.IdLiner).HasName("PK__Liner__F8F1538DCCD2737E");

            entity.ToTable("Liner");

            entity.Property(e => e.IdLiner).HasColumnName("Id_Liner");
            entity.Property(e => e.PacienteId).HasColumnName("PacienteID");
            entity.Property(e => e.TallaId).HasColumnName("TallaID");
            entity.Property(e => e.TipoLinerId).HasColumnName("TipoLinerID");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Liners)
                .HasForeignKey(d => d.PacienteId)
                .HasConstraintName("FK_Liner_Pacientes");

            entity.HasOne(d => d.Talla).WithMany(p => p.Liners)
                .HasForeignKey(d => d.TallaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Liner__TallaID__7F2BE32F");

            entity.HasOne(d => d.TipoLiner).WithMany(p => p.Liners)
                .HasForeignKey(d => d.TipoLinerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Liner__TipoLiner__7E37BEF6");
        });

        modelBuilder.Entity<Mantenimiento>(entity =>
        {
            entity.HasKey(e => e.IdMantenimiento).HasName("PK__Mantenim__707E5D16F77C9CD0");

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
                .HasConstraintName("FK__Mantenimi__Id_pa__2DE6D218");

            entity.HasOne(d => d.IdProtesisNavigation).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.IdProtesis)
                .HasConstraintName("FK__Mantenimi__Id_pr__2EDAF651");

            entity.HasOne(d => d.IdSocketNavigation).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.IdSocket)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Mantenimi__Id_so__2FCF1A8A");
        });

        modelBuilder.Entity<MantenimientoComponente>(entity =>
        {
            entity.HasKey(e => new { e.ProtesisId, e.ComponentId }).HasName("PK__Mantenim__87BBF2547D25F5B3");

            entity.ToTable("Mantenimiento_Componentes");

            entity.Property(e => e.ProtesisId).HasColumnName("ProtesisID");
            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.MantenimientoId).HasColumnName("MantenimientoID");

            entity.HasOne(d => d.Component).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.ComponentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mantenimi__Compo__339FAB6E");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Mantenimi__Id_pa__3587F3E0");

            entity.HasOne(d => d.Mantenimiento).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.MantenimientoId)
                .HasConstraintName("FK__Mantenimi__Mante__3493CFA7");

            entity.HasOne(d => d.MedidasNavigation).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.Medidas)
                .HasConstraintName("FK__Mantenimi__Medid__367C1819");

            entity.HasOne(d => d.Protesis).WithMany(p => p.MantenimientoComponentes)
                .HasForeignKey(d => d.ProtesisId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mantenimi__Prote__32AB8735");
        });

        modelBuilder.Entity<MantenimientoDetalle>(entity =>
        {
            entity.HasKey(e => e.IdDetalleMantenimiento).HasName("PK__Mantenim__B8F26F75F432C6F1");

            entity.ToTable("MantenimientoDetalle");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.IdMantenimientoNavigation).WithMany(p => p.MantenimientoDetalles)
                .HasForeignKey(d => d.IdMantenimiento)
                .HasConstraintName("FK__Mantenimi__IdMan__0B5CAFEA");
        });

        modelBuilder.Entity<MedidaTransfemoral>(entity =>
        {
            entity.HasKey(e => e.IdMedidaT).HasName("PK__Medida_T__14B4624D9CFD29B4");

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
                .HasConstraintName("FK__Medida_Tr__Id_es__0A9D95DB");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTransfemorals)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__0B91BA14");
        });

        modelBuilder.Entity<MedidaTransfemoralPrueba>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__Medida_T__88604D5516BA3A3A");

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

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTransfemoralPruebas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__1EA48E88");

            entity.HasOne(d => d.IdPruebaNavigation).WithMany(p => p.MedidaTransfemoralPruebas)
                .HasForeignKey(d => d.IdPrueba)
                .HasConstraintName("FK__Medida_Tr__Id_pr__1F98B2C1");
        });

        modelBuilder.Entity<MedidaTranstibial>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__Medida_T__E038E0900D329157");

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
                .HasConstraintName("FK__Medida_Tr__Id_es__07C12930");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.MedidaTranstibials)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Medida_Tr__Id_pa__06CD04F7");
        });

        modelBuilder.Entity<MedidasCircunferenciaPrueba>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__MedidasC__E038E09068359EF4");

            entity.ToTable("MedidasCircunferencia_Prueba");

            entity.Property(e => e.IdMedida).HasColumnName("id_medida");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.NumeroCircunferencia).HasColumnName("numero_circunferencia");
            entity.Property(e => e.ValorMmConPresion)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mmConPresion");
            entity.Property(e => e.ValorMmSinPresion)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mmSinPresion");

            entity.HasOne(d => d.IdValorNavigation).WithMany(p => p.MedidasCircunferenciaPruebas)
                .HasForeignKey(d => d.IdValor)
                .HasConstraintName("FK__MedidasCi__id_va__22751F6C");
        });

        modelBuilder.Entity<MedidasCircunferencium>(entity =>
        {
            entity.HasKey(e => e.IdMedida).HasName("PK__MedidasC__E038E0902CD434CF");

            entity.Property(e => e.IdMedida).HasColumnName("id_medida");
            entity.Property(e => e.IdValor).HasColumnName("id_valor");
            entity.Property(e => e.NumeroCircunferencia).HasColumnName("numero_circunferencia");
            entity.Property(e => e.ValorMmConPresion)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mmConPresion");
            entity.Property(e => e.ValorMmSinPresion)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor_mmSinPresion");

            entity.HasOne(d => d.IdValorNavigation).WithMany(p => p.MedidasCircunferencia)
                .HasForeignKey(d => d.IdValor)
                .HasConstraintName("FK__MedidasCi__id_va__0E6E26BF");
        });

        modelBuilder.Entity<MovimientosInventario>(entity =>
        {
            entity.HasKey(e => e.MovimientoID).HasName("PK__Movimien__BF923FCCCB054BA7");

            entity.ToTable("Movimientos_Inventario");

            entity.Property(e => e.MovimientoID).HasColumnName("MovimientoID");
            entity.Property(e => e.ComponentID).HasColumnName("ComponentID");
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.FechaMovimiento)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TipoMovimiento)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.Component).WithMany(p => p.MovimientosInventarios)
                .HasForeignKey(d => d.ComponentID)
                .HasConstraintName("FK__Movimient__Compo__540C7B00");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.IdPaciente).HasName("PK__Paciente__3874F59AD79AD1D8");

            entity.ToTable("Paciente");

            entity.HasIndex(e => e.CodigoPaciente, "UQ__Paciente__0B487D006CEA0F3E").IsUnique();

            entity.HasIndex(e => e.Cedula, "UQ__Paciente__415B7BE51325C64D").IsUnique();

            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.Cedula)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.CodigoPaciente)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("codigo_Paciente");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.FechaIngreso)
                .HasDefaultValueSql("(CONVERT([date],getdate()))")
                .HasColumnName("fecha_ingreso");
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
                .HasConstraintName("FK__Paciente__Genero__6477ECF3");

            entity.HasOne(d => d.IdEstatusPacienteNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdEstatusPaciente)
                .HasConstraintName("FK__Paciente__Id_Est__66603565");

            entity.HasOne(d => d.IdEstatusProtesisNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdEstatusProtesis)
                .HasConstraintName("FK__Paciente__Id_Est__6754599E");

            entity.HasOne(d => d.IdProvinciaNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdProvincia)
                .HasConstraintName("FK__Paciente__Id_Pro__656C112C");
        });

        modelBuilder.Entity<PacienteDescartado>(entity =>
        {
            entity.HasKey(e => e.IdDescartado).HasName("PK__Paciente__1216CA855F437818");

            entity.ToTable("Paciente_Descartado");

            entity.Property(e => e.IdDescartado).HasColumnName("Id_Descartado");
            entity.Property(e => e.Comentario).HasColumnType("text");
            entity.Property(e => e.FechaDescartado)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Descartado");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdUsuario).HasColumnName("Id_usuario");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.PacienteDescartados)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Paciente___Id_pa__625A9A57");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.PacienteDescartados)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Paciente___Id_us__634EBE90");
        });

        modelBuilder.Entity<Protesi>(entity =>
        {
            entity.HasKey(e => e.IdProtesis).HasName("PK__Protesis__D4FF3CA8BCCAE077");

            entity.ToTable("Protesis");

            entity.Property(e => e.IdProtesis).HasColumnName("id_protesis");
            entity.Property(e => e.FechaEntrega).HasColumnName("fecha_entrega");
            entity.Property(e => e.IdPaciente).HasColumnName("Id_paciente");
            entity.Property(e => e.IdSocket).HasColumnName("Id_socket");
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

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Protesis__Id_pac__282DF8C2");

            entity.HasOne(d => d.IdSocketNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.IdSocket)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Protesis_Socket");

            entity.HasOne(d => d.LinerTamanoNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.LinerTamano)
                .HasConstraintName("FK__Protesis__liner___2A164134");

            entity.HasOne(d => d.LinerTipoNavigation).WithMany(p => p.Protesis)
                .HasForeignKey(d => d.LinerTipo)
                .HasConstraintName("FK__Protesis__liner___29221CFB");
        });
        modelBuilder.Entity<ProtesisComponente>(entity =>
        {
            entity.HasKey(e => new { e.ProtesisId, e.ComponentId }).HasName("PK__Protesis__87BBF25452410CA1");

            entity.ToTable("Protesis_Componentes");

            entity.Property(e => e.ProtesisId).HasColumnName("ProtesisID");
            entity.Property(e => e.ComponentId).HasColumnName("ComponentID");

            entity.HasOne(d => d.Component).WithMany(p => p.ProtesisComponentes)
                .HasForeignKey(d => d.ComponentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Protesis___Compo__2B0A656D");

            entity.HasOne(d => d.Protesis).WithMany(p => p.ProtesisComponentes)
                .HasForeignKey(d => d.ProtesisId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Protesis___Prote__2A164134");
        });

        modelBuilder.Entity<Provincium>(entity =>
        {
            entity.HasKey(e => e.IdProvincia).HasName("PK__Provinci__1B6202737F8DAD77");

            entity.Property(e => e.IdProvincia).HasColumnName("Id_Provincia");
            entity.Property(e => e.NombreProvincia)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("Nombre_Provincia");
        });

        modelBuilder.Entity<PruebaSocket>(entity =>
        {
            entity.HasKey(e => e.IdPrueba).HasName("PK__Prueba_S__328A45731517CB36");

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
                .HasConstraintName("FK__Prueba_So__Id_Co__160F4887");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Prueba_So__Id_pa__151B244E");

            entity.HasOne(d => d.IdSocketNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdSocket)
                .HasConstraintName("FK__Prueba_So__Id_so__17F790F9");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.PruebaSockets)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Prueba_So__Id_Us__17036CC0");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.IdReporte).HasName("PK__Reportes__87E4F5CB0D859D43");

            entity.Property(e => e.IdReporte).HasColumnName("id_reporte");
            entity.Property(e => e.CodigoPaciente).HasColumnName("codigo_paciente");
            entity.Property(e => e.NumSocketsFabricados).HasColumnName("num_sockets_fabricados");

            entity.HasOne(d => d.CodigoPacienteNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.CodigoPaciente)
                .HasConstraintName("FK__Reportes__codigo__45BE5BA9");

            entity.HasOne(d => d.NumSocketsFabricadosNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.NumSocketsFabricados)
                .HasConstraintName("FK__Reportes__num_so__46B27FE2");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__6ABCB5E0CA5B7A51");

            entity.ToTable("Rol");

            entity.HasIndex(e => e.NombreRol, "UQ__Rol__673CB4355ED349EB").IsUnique();

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
            entity.HasKey(e => e.IdSocket).HasName("PK__Socket_P__14CC4DA60CCF9055");

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
                .HasConstraintName("FK__Socket_Pa__Id_pa__123EB7A3");
        });

        modelBuilder.Entity<Talla>(entity =>
        {
            entity.HasKey(e => e.IdTalla).HasName("PK__Tallas__A135FE6E1808BAF4");

            entity.Property(e => e.IdTalla).HasColumnName("Id_Talla");
            entity.Property(e => e.PacienteId).HasColumnName("PacienteID");
            entity.Property(e => e.TallaNombre).HasMaxLength(30);
            entity.Property(e => e.TipoAmputacionId).HasColumnName("TipoAmputacionID");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Tallas)
                .HasForeignKey(d => d.PacienteId)
                .HasConstraintName("FK_Tallas_Pacientes");

            entity.HasOne(d => d.TipoAmputacion).WithMany(p => p.Tallas)
                .HasForeignKey(d => d.TipoAmputacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Tallas__TipoAmpu__7B5B524B");
        });

        modelBuilder.Entity<TipoAmputacion>(entity =>
        {
            entity.HasKey(e => e.IdAmputacion).HasName("PK__Tipo_Amp__1A5D1A335B09AC14");

            entity.ToTable("Tipo_Amputacion");

            entity.Property(e => e.IdAmputacion).HasColumnName("Id_amputacion");
            entity.Property(e => e.TipoAmputacion1)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("tipo_amputacion");
        });

        modelBuilder.Entity<TipoLiner>(entity =>
        {
            entity.HasKey(e => e.IdTipoLiner).HasName("PK__Tipo_Lin__EAA77667E49ADB12");

            entity.ToTable("Tipo_Liner");

            entity.Property(e => e.IdTipoLiner).HasColumnName("Id_TipoLiner");
            entity.Property(e => e.TipoNombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TiposEstadoCitum>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PK__Tipos_Es__AB2EB6F853572666");

            entity.ToTable("Tipos_Estado_Cita");

            entity.HasIndex(e => e.Descripcion, "UQ__Tipos_Es__92C53B6C62CA143B").IsUnique();

            entity.Property(e => e.IdEstado).HasColumnName("Id_Estado");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TomaMedidasEscaneo>(entity =>
        {
            entity.HasKey(e => e.IdEscaneo).HasName("PK__Toma_med__83D46B0D3B11753C");

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
                .HasConstraintName("FK__Toma_medi__Id_am__02FC7413");

            entity.HasOne(d => d.IdLinerNavigation).WithMany(p => p.TomaMedidasEscaneos)
                .HasForeignKey(d => d.IdLiner)
                .HasConstraintName("FK__Toma_medi__Id_Li__03F0984C");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.TomaMedidasEscaneos)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Toma_medi__Id_pa__02084FDA");
        });

        modelBuilder.Entity<TranstibialPrueba>(entity =>
        {
            entity.HasKey(e => e.IdEscaneo).HasName("PK__Transtib__83D46B0DFD906387");

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

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.TranstibialPruebas)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__Transtibi__Id_pa__1AD3FDA4");

            entity.HasOne(d => d.IdPruebaNavigation).WithMany(p => p.TranstibialPruebas)
                .HasForeignKey(d => d.IdPrueba)
                .HasConstraintName("FK__Transtibi__Id_pr__1BC821DD");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__4E3E04AD7C785C66");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.Email, "UQ__Usuario__AB6E6164E899D1AE").IsUnique();

            entity.HasIndex(e => e.NombreUsuario, "UQ__Usuario__D4D22D7420F990FF").IsUnique();

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

            entity.HasMany(d => d.IdProteses).WithMany(p => p.IdUsuarios)
                .UsingEntity<Dictionary<string, object>>(
                    "UsuarioProtesi",
                    r => r.HasOne<Protesi>().WithMany()
                        .HasForeignKey("IdProtesis")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Usuario_P__IdPro__57DD0BE4"),
                    l => l.HasOne<Usuario>().WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Usuario_P__IdUsu__56E8E7AB"),
                    j =>
                    {
                        j.HasKey("IdUsuario", "IdProtesis").HasName("PK__Usuario___40EB189F40F7F5E0");
                        j.ToTable("Usuario_Protesis");
                    });
        });

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
