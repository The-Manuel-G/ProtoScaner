namespace ProtoScaner.Server.DTOs
{
    public class UpdateProtesisDto
    {
        public int IdProtesis { get; set; }
        public int? IdPaciente { get; set; }
        public int? LinerTipo { get; set; }
        public int? LinerTamano { get; set; }
        public string? Protesista { get; set; }
        public string FechaEntrega { get; set; }
        public string? Material { get; set; }
        // Otras propiedades necesarias
    }
}
