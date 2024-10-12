using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class HistorialPacienteIngreso
{
    public int IdHistorial { get; set; }

    public int? IdPaciente { get; set; }

    public int? TipoAmputacion { get; set; }

    public int? LadoAmputacion { get; set; }

    public DateOnly? FechaAmputacion { get; set; }

    public int? Causa { get; set; }

    public bool? Terapia { get; set; }

    public string? TiempoTerapia { get; set; }

    public int? IdMedida { get; set; }

    public string? Comentario { get; set; }

    public virtual CausaAmputacion? CausaNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual LadoAmputacion? LadoAmputacionNavigation { get; set; }

    public virtual TipoAmputacion? TipoAmputacionNavigation { get; set; }
}
