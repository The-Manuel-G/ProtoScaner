namespace ProtoScaner.Server.DTOs
{
    public class ProtesisComponenteDTO
    {
        public int ProtesisId { get; set; }
        public int? ComponentID { get; set; }  // Ahora es nullable
        public int? Cantidad { get; set; }    // Ahora es nullable
    }
}
