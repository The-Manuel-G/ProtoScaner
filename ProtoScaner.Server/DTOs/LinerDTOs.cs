namespace ProtoScaner.Server.DTOs
{
    public class LinerDTO
    {
        public int IdLiner { get; set; }
        public int TipoLinerId { get; set; }
        public int TallaId { get; set; }
        public int? PacienteId { get; set; }

        // Propiedades de navegación
        public TipoLinerDTO TipoLiner { get; set; }
        public TallaDto Talla { get; set; }
        public PacienteDTO Paciente { get; set; }

        // Opcional: Si deseas incluir detalles de TomaMedidasEscaneo
        // public ICollection<TomaMedidasEscaneoDTO> TomaMedidasEscaneos { get; set; }
    }
}
