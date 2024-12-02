namespace ProtoScaner.Server.DTOs
{
    public class UpdateProtesiDto
    {
        public int IdProtesis { get; set; }
        public int? CodigoPaciente { get; set; }
        public int? LinerTipo { get; set; }
        public int? LinerTamano { get; set; }
        public string? Protesista { get; set; }
        public DateOnly? FechaEntrega { get; set; }
        public string? Material { get; set; }
        // Otras propiedades necesarias
    }
}
