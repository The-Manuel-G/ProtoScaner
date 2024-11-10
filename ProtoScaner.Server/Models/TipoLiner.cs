using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TipoLiner
{
    public int IdTipoLiner { get; set; }

    public string TipoNombre { get; set; } = null!;

    public virtual ICollection<LinerTransfemoral> LinerTransfemorals { get; set; } = new List<LinerTransfemoral>();

    public virtual ICollection<LinerTranstibial> LinerTranstibials { get; set; } = new List<LinerTranstibial>();

    public virtual ICollection<Protesi> Protesis { get; set; } = new List<Protesi>();
}
