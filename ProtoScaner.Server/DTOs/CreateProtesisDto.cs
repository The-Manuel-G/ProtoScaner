using System;

namespace ProtoScaner.Server.DTOs
{
    public class CreateProtesiDto
    {
        public int? IdPaciente { get; set; } // Puede ser null
        public int LinerTipo { get; set; }
        public int LinerTamano { get; set; }
        public string Protesista { get; set; }
        public string FechaEntrega { get; set; } // Formato "yyyy-MM-dd"
        public string Material { get; set; }
    }
}
