using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class HistorialLogin
{
    public int IdHistorial { get; set; }

    public int? IdUsuario { get; set; }

    public byte[] FechaLogin { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? Dispositivo { get; set; }

    public bool? Exito { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
