using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class EstatusProtesi
{
    public int IdEstatusProtesis { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<HistorialEstatusProtesi> HistorialEstatusProtesiIdEstatusAnteriorNavigations { get; set; } = new List<HistorialEstatusProtesi>();

    public virtual ICollection<HistorialEstatusProtesi> HistorialEstatusProtesiIdEstatusNuevoNavigations { get; set; } = new List<HistorialEstatusProtesi>();

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
