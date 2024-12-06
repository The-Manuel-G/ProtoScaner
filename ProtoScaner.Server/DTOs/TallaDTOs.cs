namespace ProtoScaner.Server.DTOs
{
    public class TallaDto
    {
        public int IdTalla { get; set; } // Identificador único de la talla
        public string TallaNombre { get; set; } = string.Empty; // Nombre de la talla, inicializado para evitar nulos
        public int TipoAmputacionId { get; set; } // Identificador del tipo de amputación asociado
        public int? PacienteId { get; set; } // Identificador opcional del paciente asociado
        public TipoAmputacionDTO TipoAmputacion { get; set; } = null!; // Relación con TipoAmputacion
    }
}
