using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;
public partial class MedidaTransfemoral
{
    public int IdMedidaT { get; set; }

    public int? IdEscaneo { get; set; }

    public int? IdValor { get; set; }

    public int? IdPaciente { get; set; }

    public byte[]? FotoMunon { get; set; }

    public DateOnly? FechaEscaneo { get; set; }

    public string? DisenadorSocket { get; set; }

    public string? LongitudPie { get; set; }

    public string? AlturaTalon { get; set; }

    public string? Medida1 { get; set; }

    public string? Medida2 { get; set; }

    public int? IdLiner { get; set; }

    public virtual TomaMedidasEscaneo? IdEscaneoNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual ICollection<MedidasCircunferencium> MedidasCircunferencia { get; set; } = new List<MedidasCircunferencium>();
}
