using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Provincium
{
    public int IdProvincia { get; set; }

    public string? NombreProvincia { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
