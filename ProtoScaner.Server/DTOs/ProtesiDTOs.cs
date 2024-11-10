namespace ProtoScaner.Server.DTOs
{
        public class ProtesiDto
        {
            public int IdProtesis { get; set; }
            public int? CodigoPaciente { get; set; }  // Add this line for CodigoPaciente
    
            public int? LinerTipo { get; set; }
            public int? LinerTamano { get; set; }
            public string? Protesista { get; set; }
            public DateOnly? FechaEntrega { get; set; }
            public string? Material { get; set; }
            public PacienteDTO? Paciente { get; set; } // Include this if Paciente details are needed in DTO
        }
    

}
