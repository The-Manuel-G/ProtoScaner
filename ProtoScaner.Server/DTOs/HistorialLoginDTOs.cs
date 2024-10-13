namespace ProtoScaner.Server.DTOs
{
    public class HistorialLoginDTO
    {
        public int IdHistorial { get; set; }
        public int? IdUsuario { get; set; }
        public byte[] FechaLogin { get; set; } = null!;
        public string? Direccion { get; set; }
        public string? Dispositivo { get; set; }
        public bool? Exito { get; set; }
    }

}
