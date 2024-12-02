using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Componente
{
    public int ComponentId { get; set; }

    public int? ComponentTipoId { get; set; }

    public string? Codigo { get; set; }

    public string Description { get; set; } = null!;

    public virtual ComponenteTipo? ComponentTipo { get; set; }

    public virtual InventarioComponente? InventarioComponente { get; set; }

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<MovimientosInventario> MovimientosInventarios { get; set; } = new List<MovimientosInventario>();

    public virtual ICollection<ProtesisComponente> ProtesisComponentes { get; set; } = new List<ProtesisComponente>();

    public virtual ICollection<PruebaSocket> PruebaSockets { get; set; } = new List<PruebaSocket>();
}
