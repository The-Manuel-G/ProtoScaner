namespace ProtoScaner.Server.DTOs
{
    public class HistorialCambioDTO
    {
        public int IdHistorial { get; set; }
        public int? IdUsuario { get; set; }
        public string? TablaModificada { get; set; }
        public int? IdRegistroModificado { get; set; }
        public string? Operacion { get; set; }
        public string? ValorAnterior { get; set; }
        public string? ValorNuevo { get; set; }
        public byte[] FechaMidificacion { get; set; } = null!;
    }
}
