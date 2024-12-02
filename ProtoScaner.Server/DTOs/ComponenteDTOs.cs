namespace ProtoScaner.Server.DTOs
{
    public class ComponenteDTO
    {
        public int ComponentId { get; set; }
        public int? ComponentTipoId { get; set; } // Ahora es nullable
        public string Codigo { get; set; }
        public string Description { get; set; }
    }
}
