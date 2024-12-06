using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int? IdRol { get; set; }

    public DateOnly? FechaCreacion { get; set; }

    public bool? Activo { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual ICollection<HistorialCambio> HistorialCambios { get; set; } = new List<HistorialCambio>();

    public virtual ICollection<HistorialCita> HistorialCita { get; set; } = new List<HistorialCita>();

    public virtual ICollection<HistorialEstatusPaciente> HistorialEstatusPacientes { get; set; } = new List<HistorialEstatusPaciente>();

    public virtual ICollection<HistorialEstatusProtesi> HistorialEstatusProtesis { get; set; } = new List<HistorialEstatusProtesi>();

    public virtual ICollection<HistorialLogin> HistorialLogins { get; set; } = new List<HistorialLogin>();

    public virtual Rol? IdRolNavigation { get; set; }

    public virtual ICollection<ImagenPerfil> ImagenPerfils { get; set; } = new List<ImagenPerfil>();

    public virtual ICollection<Insidencia> Insidencia { get; set; } = new List<Insidencia>();

    public virtual ICollection<PacienteDescartado> PacienteDescartados { get; set; } = new List<PacienteDescartado>();

    public virtual ICollection<PruebaSocket> PruebaSockets { get; set; } = new List<PruebaSocket>();

    public virtual ICollection<Protesi> IdProteses { get; set; } = new List<Protesi>();
}
