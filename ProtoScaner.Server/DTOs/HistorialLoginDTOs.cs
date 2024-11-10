namespace ProtoScaner.Server.DTOs
{
    public class HistorialLoginDTO
    {
        public int IdHistorial { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime? FechaLogin { get; set; }  // Updated to DateTime?
        public string? Direccion { get; set; }
        public string? Dispositivo { get; set; }
        public bool? Exito { get; set; }
    }
}
