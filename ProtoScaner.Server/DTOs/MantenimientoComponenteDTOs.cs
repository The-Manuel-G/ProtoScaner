namespace ProtoScaner.Server.DTOs
{
    public class MantenimientoComponenteDTO
    {
        public int ProtesisId { get; set; }
        public int ComponentId { get; set; }
        public int? Cantidad { get; set; }
        public int? MantenimientoId { get; set; }
        public int? IdPaciente { get; set; }
        public bool? Insidencia { get; set; }
        public int? Medidas { get; set; }
    }
}
