using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class LadoAmputacion
{
    public int IdLado { get; set; }

    public string? LadoAmputacion1 { get; set; }

    public virtual ICollection<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; } = new List<HistorialPacienteIngreso>();
}
