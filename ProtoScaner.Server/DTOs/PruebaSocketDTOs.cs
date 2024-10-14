namespace ProtoScaner.Server.DTOs
{
    public class PruebaSocketDTO
    {
        public int IdPrueba { get; set; }
        public int? IdPaciente { get; set; }
        public string? ModificacionGeneral { get; set; }
        public string? QuienLaHizo { get; set; }
        public DateOnly? FechaPrueba { get; set; }
        public bool? PracticaMarcha { get; set; }
        public DateOnly? FechaMantenimientoPostEntrega { get; set; }
        public bool? SocketFallo { get; set; }
        public DateOnly? FechaFallo { get; set; }
        public string? MaterialRellenoUsado { get; set; }
        public int? IdComponente { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdSocket { get; set; }
        public bool? PracticaRecibida { get; set; }
        public string? DuracionTerapia { get; set; }
        public DateOnly? FechaPractica { get; set; }
    }
}
