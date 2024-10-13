using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Talla
{
    public int IdTalla { get; set; }

    public string TallaNombre { get; set; } = null!;

    public virtual ICollection<LinerTransfemoral> LinerTransfemorals { get; set; } = new List<LinerTransfemoral>();

    public virtual ICollection<LinerTranstibial> LinerTranstibials { get; set; } = new List<LinerTranstibial>();

    public virtual ICollection<Protesi> Protesis { get; set; } = new List<Protesi>();
}
