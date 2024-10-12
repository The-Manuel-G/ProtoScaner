using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class TranstibialPrueba
{
    public int IdEscaneo { get; set; }

    public int? IdPaciente { get; set; }

    public DateOnly? FechaEscaneo { get; set; }

    public string? Protesista { get; set; }

    public int? IdLiner { get; set; }

    public int? IdPrueba { get; set; }

    public decimal? LongitudTotalMunon { get; set; }

    public decimal? Circunferencia3cm { get; set; }

    public decimal? Circunferencia6cm { get; set; }

    public decimal? Circunferencia9cm { get; set; }

    public decimal? Circunferencia12cm { get; set; }

    public decimal? Circunferencia15cm { get; set; }

    public decimal? Circunferencia21cm { get; set; }

    public decimal? Circunferencia24cm { get; set; }

    public decimal? Circunferencia27cm { get; set; }

    public decimal? Circunferencia30cm { get; set; }

    public decimal? MlSobreRodilla { get; set; }

    public decimal? ApTension { get; set; }

    public decimal? MlSupracondilar { get; set; }

    public decimal? MlTendon { get; set; }

    public string? Notas { get; set; }

    public string? LongitudOsea { get; set; }

    public string? LongitudPies { get; set; }

    public string? AlturaTacon { get; set; }

    public virtual LinerTranstibial? IdLinerNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual PruebaSocket? IdPruebaNavigation { get; set; }
}
