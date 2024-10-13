using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TipoAmputacion
{
    public int IdAmputacion { get; set; }

    public string? TipoAmputacion1 { get; set; }

    public virtual ICollection<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; } = new List<HistorialPacienteIngreso>();

    public virtual ICollection<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; } = new List<TomaMedidasEscaneo>();
}
