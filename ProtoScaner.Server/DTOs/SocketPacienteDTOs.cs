namespace ProtoScaner.Server.DTOs
{
    public class SocketPacienteDTO
    {
        public int IdSocket { get; set; }
        public int? IdPaciente { get; set; }
        public string? Descripcion { get; set; }
        public DateOnly? FechaCreacion { get; set; }
        public string? Tamaño { get; set; }
    }
}
