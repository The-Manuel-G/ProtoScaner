using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Genero
{
    public int IdGenero { get; set; }

    public string? Genero1 { get; set; }

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
