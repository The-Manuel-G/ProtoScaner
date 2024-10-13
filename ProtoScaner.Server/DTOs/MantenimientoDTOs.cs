namespace ProtoScaner.Server.DTOs
{
    public class MantenimientoDTO
    {
        public int IdMantenimiento { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdProtesis { get; set; }
        public DateOnly? FechaMantenimiento { get; set; }
        public byte[]? ImagenFallo1 { get; set; }
        public byte[]? ImagenFallo2 { get; set; }
        public int? IdSocket { get; set; }
        public int? NumSocketsFabricados { get; set; }
        public int? NuevasMedidas { get; set; }
        public int? IdComponentes { get; set; }
    }
}
