using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class LinerTransfemoral
{
    public int IdLiner { get; set; }

    public int? TipoLinerId { get; set; }

    public int? TallaId { get; set; }

    public virtual ICollection<MedidaTransfemoralPrueba> MedidaTransfemoralPruebas { get; set; } = new List<MedidaTransfemoralPrueba>();

    public virtual ICollection<MedidaTransfemoral> MedidaTransfemorals { get; set; } = new List<MedidaTransfemoral>();

    public virtual Talla? Talla { get; set; }
}
