using System;
using System.Collections.Generic;
namespace ProtoScaner.Server.Models;




public partial class Liner
{
    public int IdLiner { get; set; }

    public int TipoLinerId { get; set; }

    public int TallaId { get; set; }

    public int? PacienteId { get; set; }

     public virtual TipoLiner TipoLiner { get; set; }
    public virtual Talla Talla { get; set; }
    public virtual Paciente Paciente { get; set; }



    public virtual ICollection<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; } = new List<TomaMedidasEscaneo>();
}
