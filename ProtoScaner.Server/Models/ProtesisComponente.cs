using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class ProtesisComponente
{
    public int ProtesisId { get; set; }

    public int ComponentId { get; set; }

    public int? Cantidad { get; set; }

    public virtual Componente Component { get; set; } = null!;

    public virtual Protesi Protesis { get; set; } = null!;
}
