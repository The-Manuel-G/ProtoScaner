using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class LinerTranstibial
{
    public int IdLiner { get; set; }

    public int? TipoLinerId { get; set; }

    public int? TallaId { get; set; }

    public virtual ICollection<MedidaTranstibial> MedidaTranstibials { get; set; } = new List<MedidaTranstibial>();

    public virtual Talla? Talla { get; set; }

    public virtual TipoLiner? TipoLiner { get; set; }

    public virtual ICollection<TranstibialPrueba> TranstibialPruebas { get; set; } = new List<TranstibialPrueba>();
}
