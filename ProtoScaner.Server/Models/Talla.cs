using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Talla

{
    public Talla()
    {
        Liners = new HashSet<Liner>();
    }
    public int IdTalla { get; set; }

    public string TallaNombre { get; set; } = null!;

    public int TipoAmputacionId { get; set; }
    public int? PacienteId { get; set; }

    public virtual ICollection<Liner> Liners { get; set; }

    public virtual ICollection<Protesi> Protesis { get; set; } = new List<Protesi>();

    public virtual Paciente? Paciente { get; set; }

    public virtual TipoAmputacion TipoAmputacion { get; set; } = null!;
}
