using ProtoScaner.Server.DTOs;
using System;
using System.Collections.Generic;



namespace ProtoScaner.Server.DTOs
{
    public class ProtesiDto
    {
        public int IdProtesis { get; set; }
        public int? IdPaciente { get; set; } // Cambiado a IdPaciente
        public int? LinerTipo { get; set; }
        public int? LinerTamano { get; set; }
        public string? Protesista { get; set; }
        public string? FechaEntrega { get; set; } // Formato "yyyy-MM-dd"
        public string? Material { get; set; }
        public PacienteDTO? Paciente { get; set; }
        public LinerDTO? Liner { get; set; }
        public SocketPacienteDTO? SocketPaciente { get; set; } // Nuevo campo para crear el socket
    }
}
