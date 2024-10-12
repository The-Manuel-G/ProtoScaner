using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Reporte
{
    public int IdReporte { get; set; }

    public int? CodigoPaciente { get; set; }

    public int? NumSocketsFabricados { get; set; }

    public virtual Paciente? CodigoPacienteNavigation { get; set; }

    public virtual SocketPaciente? NumSocketsFabricadosNavigation { get; set; }
}
