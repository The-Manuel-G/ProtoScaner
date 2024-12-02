using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class MantenimientoDetalle
{
    public int IdDetalleMantenimiento { get; set; }

    public int IdMantenimiento { get; set; }

    public bool Activo { get; set; }

    public string? Comentario { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual Mantenimiento IdMantenimientoNavigation { get; set; } = null!;
}
