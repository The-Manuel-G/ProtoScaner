namespace ProtoScaner.Server.DTOs
{
    public class EstatusProtesiDTO
    {
        public int IdEstatusProtesis { get; set; }
        public string? Descripcion { get; set; }
        // No incluimos la colección de Pacientes para mantener el DTO ligero
    }
}
