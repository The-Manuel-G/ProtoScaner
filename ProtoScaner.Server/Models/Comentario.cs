using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Comentario
{
    public int IdComentario { get; set; }

    public int IdUsuario { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdTomaMedida { get; set; }

    public int? IdPruebaSocket { get; set; }

    public int? IdMantenimiento { get; set; }

    public int? IdProtesis { get; set; }

    public string Comentario1 { get; set; } = null!;

    public DateTime? FechaComentario { get; set; }

    public virtual Mantenimiento? IdMantenimientoNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual Protesi? IdProtesisNavigation { get; set; }

    public virtual PruebaSocket? IdPruebaSocketNavigation { get; set; }

    public virtual TomaMedidasEscaneo? IdTomaMedidaNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
