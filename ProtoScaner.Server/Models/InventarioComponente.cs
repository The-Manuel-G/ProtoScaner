using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class InventarioComponente
{
    public int InventarioId { get; set; }

    public int? ComponentId { get; set; }

    public int StockActual { get; set; }

    public int PuntoReorden { get; set; }

    public virtual Componente? Component { get; set; }
}
