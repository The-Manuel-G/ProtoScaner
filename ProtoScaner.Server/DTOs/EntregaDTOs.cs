namespace ProtoScaner.Server.DTOs
{
    public class EntregaDTO
    {
        public int IdEntregas { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdProtesis { get; set; }
        public int? IdUsuario { get; set; }
        public decimal? Reduccion { get; set; }
        public string? GeneralModificacion { get; set; }
        public string? Otros { get; set; }
        public int? IdPruebaSocket { get; set; }
        public bool? Insidencia { get; set; }
        public string? MaterialRelleno { get; set; }
        public DateOnly? FechaEntrega { get; set; }
        public DateOnly? PracticaMarcha { get; set; }
        public DateOnly? MantenimientoPostEntrega { get; set; }
        public int? IdMantenimiento { get; set; }
        public bool? FirmaDescargoComponenteLista { get; set; }
    }
}
