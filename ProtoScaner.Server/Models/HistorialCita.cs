using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class HistorialCita
{
    public int IdHistorial { get; set; }

    public int IdCita { get; set; }

    public int IdUsuario { get; set; }

    public int? IdEstadoAnterior { get; set; }

    public int? IdEstadoNuevo { get; set; }

    public string? ComentarioAnterior { get; set; }

    public string? ComentarioNuevo { get; set; }

    public DateTime FechaCambio { get; set; }

    public virtual Cita IdCitaNavigation { get; set; } = null!;

    public virtual TiposEstadoCitum? IdEstadoAnteriorNavigation { get; set; }

    public virtual TiposEstadoCitum? IdEstadoNuevoNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
