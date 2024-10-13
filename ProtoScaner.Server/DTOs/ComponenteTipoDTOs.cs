namespace ProtoScaner.Server.DTOs
{
    public class ComponenteTipoDTO
    {
        public int ComponentTipoId { get; set; }
        public string TipoNombre { get; set; } = null!;
        // No incluimos la lista de Componentes
    }
}
