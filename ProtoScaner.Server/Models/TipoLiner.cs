using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TipoLiner
{
    public int IdTipoLiner { get; set; }

    public string TipoNombre { get; set; } = null!;

    public virtual ICollection<Liner> Liners { get; set; } = new List<Liner>();

    public virtual ICollection<Protesi> Protesis { get; set; } = new List<Protesi>();
}
