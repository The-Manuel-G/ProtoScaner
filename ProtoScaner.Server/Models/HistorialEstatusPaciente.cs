using System;
using System.Collections.Generic;
namespace ProtoScaner.Server.Models;

public partial class HistorialEstatusPaciente
{
    public int IdHistorialPaciente { get; set; }

    public int IdPaciente { get; set; }

    public int? IdEstatusAnterior { get; set; }

    public int IdEstatusNuevo { get; set; }

    public DateTime FechaCambio { get; set; }

    public int IdUsuario { get; set; }

    public string? Comentario { get; set; }

    public virtual EstatusPaciente? IdEstatusAnteriorNavigation { get; set; }

    public virtual EstatusPaciente IdEstatusNuevoNavigation { get; set; } = null!;

    public virtual Paciente IdPacienteNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
