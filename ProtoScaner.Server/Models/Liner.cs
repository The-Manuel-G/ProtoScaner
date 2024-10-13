using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Liner
{
    public int IdLiner { get; set; }

    public string? TipoLiner { get; set; }

    public string? Talla { get; set; }

    public virtual ICollection<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; } = new List<TomaMedidasEscaneo>();
}
