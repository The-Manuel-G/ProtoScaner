using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class ComponenteTipo
{
    public int ComponentTipoId { get; set; }

    public string TipoNombre { get; set; } = null!;

    public virtual ICollection<Componente> Componentes { get; set; } = new List<Componente>();
}
