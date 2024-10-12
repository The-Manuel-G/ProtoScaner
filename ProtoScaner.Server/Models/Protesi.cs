using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Protesi
{
    public int IdProtesis { get; set; }

    public int CodigoPaciente { get; set; }

    public int? LinerTipo { get; set; }

    public int? LinerTamano { get; set; }

    public string? Protesista { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public string? Material { get; set; }

    public virtual Paciente CodigoPacienteNavigation { get; set; } = null!;

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual ICollection<Insidencia> Insidencia { get; set; } = new List<Insidencia>();

    public virtual Talla? LinerTamanoNavigation { get; set; }

    public virtual TipoLiner? LinerTipoNavigation { get; set; }

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<ProtesisComponente> ProtesisComponentes { get; set; } = new List<ProtesisComponente>();
}
