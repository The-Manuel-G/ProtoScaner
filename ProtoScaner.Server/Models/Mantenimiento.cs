using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Mantenimiento
{
    public int IdMantenimiento { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdProtesis { get; set; }

    public DateOnly? FechaMantenimiento { get; set; }

    public byte[]? ImagenFallo1 { get; set; }

    public byte[]? ImagenFallo2 { get; set; }

    public int? IdSocket { get; set; }

    public int? NumSocketsFabricados { get; set; }

    public int? NuevasMedidas { get; set; }

    public int? IdComponentes { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual Protesi? IdProtesisNavigation { get; set; }

    public virtual SocketPaciente? IdSocketNavigation { get; set; }

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<MantenimientoDetalle> MantenimientoDetalles { get; set; } = new List<MantenimientoDetalle>();
}
