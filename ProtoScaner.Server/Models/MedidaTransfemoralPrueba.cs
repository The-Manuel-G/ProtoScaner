using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class MedidaTransfemoralPrueba
{
    public int IdMedida { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdPrueba { get; set; }

    public int? IdValor { get; set; }

    public byte[]? FotoMunon { get; set; }

    public DateOnly? FechaEscaneo { get; set; }

    public string? DisenadorSocket { get; set; }

    public string? LongitudPie { get; set; }

    public string? AlturaTalon { get; set; }

    public string? Medida1 { get; set; }

    public string? Medida2 { get; set; }

    public int? IdLiner { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual PruebaSocket? IdPruebaNavigation { get; set; }

    public virtual ICollection<MedidasCircunferenciaPrueba> MedidasCircunferenciaPruebas { get; set; } = new List<MedidasCircunferenciaPrueba>();
}
