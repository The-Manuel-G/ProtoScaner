using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TiposEstadoCitum
{
    public int IdEstado { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    public virtual ICollection<HistorialCita> HistorialCitaIdEstadoAnteriorNavigations { get; set; } = new List<HistorialCita>();

    public virtual ICollection<HistorialCita> HistorialCitaIdEstadoNuevoNavigations { get; set; } = new List<HistorialCita>();
}
