using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace ProtoScaner.Server.Models
{
    public class Comentario
    {
        [Key]
        public int IdComentario { get; set; }

        [Required]
        public int IdUsuario { get; set; }

        public int? IdPaciente { get; set; }
        public int? IdTomaMedida { get; set; }
        public int? IdPruebaSocket { get; set; }
        public int? IdMantenimiento { get; set; }
        public int? IdProtesis { get; set; }

        [Required]
        public string ComentarioTexto { get; set; }

        public DateTime FechaComentario { get; set; } = DateTime.Now;

        // Propiedades de navegación
        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }

        [ForeignKey("IdPaciente")]
        public virtual Paciente Paciente { get; set; }

        [ForeignKey("IdTomaMedida")]
        public virtual TomaMedidasEscaneo TomaMedida { get; set; }

        [ForeignKey("IdPruebaSocket")]
        public virtual PruebaSocket PruebaSocket { get; set; }

        [ForeignKey("IdMantenimiento")]
        public virtual Mantenimiento Mantenimiento { get; set; }

        [ForeignKey("IdProtesis")]
        public virtual Protesi Protesis { get; set; }
    }

}
