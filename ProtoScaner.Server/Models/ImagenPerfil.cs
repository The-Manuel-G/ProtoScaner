using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class ImagenPerfil
{
    public int IdImagen { get; set; }

    public int? IdUsuario { get; set; }

    public byte[]? Imagen { get; set; }

    public string? Descripcion { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
