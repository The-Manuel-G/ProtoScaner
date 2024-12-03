
    namespace ProtoScaner.Server.DTOs
    {
        public class LinerDTO
        {
            public int IdLiner { get; set; }
            public int TipoLinerId { get; set; }
            public int TallaId { get; set; }
            public int? PacienteId { get; set; }

          
            public TipoLinerDTO TipoLiner { get; set; } = null!;
            public TallaDto Talla { get; set; } = null!;
            public PacienteDTO Paciente { get; set; } = null!;
        }
    }


