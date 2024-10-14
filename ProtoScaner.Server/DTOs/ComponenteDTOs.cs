namespace ProtoScaner.Server.DTOs
{
    public class ComponenteDTO
    {
        public int ComponentId { get; set; }
        public int? ComponentTipoId { get; set; }
        public string? Codigo { get; set; }
        public string Description { get; set; } = null!;
        // Evitamos incluir las colecciones para reducir el peso del DTO
    }
}
