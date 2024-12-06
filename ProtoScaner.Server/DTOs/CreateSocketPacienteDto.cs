using System.ComponentModel.DataAnnotations;

namespace ProtoScaner.Server.DTOs
{
    public class CreateSocketPacienteDto
    {
        [Required]
        public int IdPaciente { get; set; }

        [Required]
        [MaxLength(255)]
        public string Descripcion { get; set; }

        [Required]
        [MaxLength(50)]
        public string Tamaño { get; set; }
    }
}
