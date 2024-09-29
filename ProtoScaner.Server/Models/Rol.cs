using System.ComponentModel.DataAnnotations;

namespace ProtoScaner.Server.Models
{
    public class Rol
    {
        public int Id { get; set; }
        [MaxLength(50)]
        public string? Name { get; set; }
        [MaxLength]
        public string? Description { get; set; }

    }
}
