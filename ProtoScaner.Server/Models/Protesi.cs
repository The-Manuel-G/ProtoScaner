using ProtoScaner.Server.Models;

public partial class Protesi
{
    public int IdProtesis { get; set; }

    public int? IdPaciente { get; set; }

    public int? LinerTipo { get; set; }

    public int? LinerTamano { get; set; }

    public string? Protesista { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public string? Material { get; set; }
    public int? IdSocket { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual ICollection<HistorialEstatusProtesi> HistorialEstatusProtesis { get; set; } = new List<HistorialEstatusProtesi>();

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual SocketPaciente? IdSocketNavigation { get; set; }

    public virtual ICollection<Insidencia> Insidencia { get; set; } = new List<Insidencia>();

    public virtual Talla? LinerTamanoNavigation { get; set; }

    public virtual TipoLiner? LinerTipoNavigation { get; set; }
   
    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<ProtesisComponente> ProtesisComponentes { get; set; } = new List<ProtesisComponente>();

    public virtual ICollection<Usuario> IdUsuarios { get; set; } = new List<Usuario>();
}
