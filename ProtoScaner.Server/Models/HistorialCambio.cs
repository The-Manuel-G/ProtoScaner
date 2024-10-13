using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class HistorialCambio
{
    public int IdHistorial { get; set; }

    public int? IdUsuario { get; set; }

    public string? TablaModificada { get; set; }

    public int? IdRegistroModificado { get; set; }

    public string? Operacion { get; set; }

    public string? ValorAnterior { get; set; }

    public string? ValorNuevo { get; set; }

    public byte[] FechaMidificacion { get; set; } = null!;

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
