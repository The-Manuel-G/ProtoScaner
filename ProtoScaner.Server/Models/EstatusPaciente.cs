using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class EstatusPaciente
{
    public int IdEstatusPaciente { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
