using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ProtoScaner.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Nombre { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string? PasswordHash { get; set; }

        public int? IdRol { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public bool Activo { get; set; } = true;

    }
}
