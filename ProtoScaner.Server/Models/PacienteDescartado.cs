using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class PacienteDescartado
{
    public int IdDescartado { get; set; }

    public int IdPaciente { get; set; }

    public bool Descartado { get; set; }

    public string? Comentario { get; set; }

    public DateTime? FechaDescartado { get; set; }

    public int IdUsuario { get; set; }

    public virtual Paciente IdPacienteNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
