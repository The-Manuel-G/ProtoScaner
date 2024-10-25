using ProtoScaner.Server.Models;

public partial class Protesi
{
    public int IdProtesis { get; set; }

    public string Cedula { get; set; } // Reemplaza 'CodigoPaciente' por 'Cedula'

    public int? LinerTipo { get; set; }

    public int? LinerTamano { get; set; }

    public string? Protesista { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public string? Material { get; set; }

    // Actualiza el nombre de la propiedad de navegación
    public virtual Paciente Paciente { get; set; }

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual ICollection<Insidencia> Insidencia { get; set; } = new List<Insidencia>();

    public virtual Talla? LinerTamanoNavigation { get; set; }

    public virtual TipoLiner? LinerTipoNavigation { get; set; }

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<ProtesisComponente> ProtesisComponentes { get; set; } = new List<ProtesisComponente>();
}
