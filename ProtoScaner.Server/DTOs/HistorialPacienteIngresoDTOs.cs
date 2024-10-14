namespace ProtoScaner.Server.DTOs
{
    public class HistorialPacienteIngresoDTO
    {
        public int IdHistorial { get; set; }
        public int? IdPaciente { get; set; }
        public int? TipoAmputacion { get; set; }
        public int? LadoAmputacion { get; set; }
        public DateOnly? FechaAmputacion { get; set; }
        public int? Causa { get; set; }
        public bool? Terapia { get; set; }
        public string? TiempoTerapia { get; set; }
        public int? IdMedida { get; set; }
        public string? Comentario { get; set; }
    }
}
