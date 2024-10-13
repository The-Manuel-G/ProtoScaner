using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class MantenimientoComponente
{
    public int ProtesisId { get; set; }

    public int ComponentId { get; set; }

    public int? Cantidad { get; set; }

    public int? MantenimientoId { get; set; }

    public int? IdPaciente { get; set; }

    public bool? Insidencia { get; set; }

    public int? Medidas { get; set; }

    public virtual Componente Component { get; set; } = null!;

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual Mantenimiento? Mantenimiento { get; set; }

    public virtual TomaMedidasEscaneo? MedidasNavigation { get; set; }

    public virtual Protesi Protesis { get; set; } = null!;
}
