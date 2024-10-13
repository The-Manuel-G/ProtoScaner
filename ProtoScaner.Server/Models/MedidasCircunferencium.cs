using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class MedidasCircunferencium
{
    public int IdMedida { get; set; }

    public int? IdValor { get; set; }

    public int? NumeroCircunferencia { get; set; }

    public decimal? ValorMm { get; set; }

    public virtual MedidaTransfemoral? IdValorNavigation { get; set; }
}
