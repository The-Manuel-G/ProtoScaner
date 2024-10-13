using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Insidencia
{
    public int IdInsidencias { get; set; }

    public int? IdEntregas { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdProtesis { get; set; }

    public int? IdUsuario { get; set; }

    public string? Componentes { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? Descripcion { get; set; }

    public virtual Entrega? IdEntregasNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }

    public virtual Protesi? IdProtesisNavigation { get; set; }

    public virtual Mantenimiento? IdUsuarioNavigation { get; set; }
}
