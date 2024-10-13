namespace ProtoScaner.Server.DTOs
{
    public class InsidenciaDTO
    {
        public int IdInsidencias { get; set; }
        public int? IdEntregas { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdProtesis { get; set; }
        public int? IdUsuario { get; set; }
        public string? Componentes { get; set; }
        public DateOnly? Fecha { get; set; }
        public string? Descripcion { get; set; }
    }
}
