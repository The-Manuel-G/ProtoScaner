using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class CausaAmputacion
{
    public int IdCausa { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; } = new List<HistorialPacienteIngreso>();
}
