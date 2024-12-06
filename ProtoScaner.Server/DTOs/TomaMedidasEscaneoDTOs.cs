namespace ProtoScaner.Server.DTOs
{
    public class TomaMedidasEscaneoDTO
    {
        public int IdEscaneo { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdAmputacion { get; set; }
        public int? IdLiner { get; set; }
        public DateOnly? FechaEscaneo { get; set; }
        public string? FotosMunon { get; set; }
        public string? Comentario { get; set; }
        public string? ResultadoScaneo { get; set; }
        public byte[]? ResultadoDoc { get; set; }
    }
}