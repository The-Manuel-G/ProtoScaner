using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class SocketPaciente
{
    public int IdSocket { get; set; }

    public int? IdPaciente { get; set; }

    public string? Descripcion { get; set; }

    public DateOnly? FechaCreacion { get; set; }

    public string? Tamaño { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<PruebaSocket> PruebaSockets { get; set; } = new List<PruebaSocket>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
