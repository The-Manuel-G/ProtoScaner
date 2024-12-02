using System;

namespace ProtoScaner.Server.DTOs
{
    public class CreateProtesiDto
    {
        public int? CodigoPaciente { get; set; }
        public string? Protesista { get; set; }
        public DateOnly? FechaEntrega { get; set; }
        public string? Material { get; set; }
        public LinerCreateDto? Liner { get; set; } // Propiedad agregada
    }
}
