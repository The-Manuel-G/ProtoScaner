using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TomaMedidasEscaneo
{
    public int IdEscaneo { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdAmputacion { get; set; }

    public int? IdLiner { get; set; }

    public DateOnly? FechaEscaneo { get; set; }

    public byte[]? FotosMunon { get; set; }

    public string? Comentario { get; set; }

    public string? ResultadoScaneo { get; set; }

    public byte[]? ResultadoDoc { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual TipoAmputacion? IdAmputacionNavigation { get; set; }

    public virtual Liner? IdLinerNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<MedidaTransfemoral> MedidaTransfemorals { get; set; } = new List<MedidaTransfemoral>();

    public virtual ICollection<MedidaTranstibial> MedidaTranstibials { get; set; } = new List<MedidaTranstibial>();
}
