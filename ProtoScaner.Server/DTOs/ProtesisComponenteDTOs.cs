namespace ProtoScaner.Server.DTOs
{
    public class ProtesisComponenteDTO
    {
        public int ProtesisId { get; set; }
        public int ComponentID { get; set; }  // Aquí se asegura el nombre `ComponentID`
        public int? Cantidad { get; set; }
    }
}
