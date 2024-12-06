using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Cita
{
    public int IdCita { get; set; }

    public int IdPaciente { get; set; }

    public DateTime Fecha { get; set; }

    public int IdEstado { get; set; }

    public string? Comentario { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual ICollection<HistorialCita> HistorialCita { get; set; } = new List<HistorialCita>();

    public virtual TiposEstadoCitum IdEstadoNavigation { get; set; } = null!;

    public virtual Paciente IdPacienteNavigation { get; set; } = null!;
}
