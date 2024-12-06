using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class HistorialEstatusProtesi
{
    public int IdHistorialProtesis { get; set; }

    public int IdProtesis { get; set; }

    public int? IdEstatusAnterior { get; set; }

    public int IdEstatusNuevo { get; set; }

    public DateTime FechaCambio { get; set; }

    public int IdUsuario { get; set; }

    public string? Comentario { get; set; }

    public virtual EstatusProtesi? IdEstatusAnteriorNavigation { get; set; }

    public virtual EstatusProtesi IdEstatusNuevoNavigation { get; set; } = null!;

    public virtual Protesi IdProtesisNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
