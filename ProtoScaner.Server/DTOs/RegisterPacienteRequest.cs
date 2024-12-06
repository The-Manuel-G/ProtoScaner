namespace ProtoScaner.Server.DTOs
{
    public class RegisterPacienteRequest
    {
        public PacienteDTO Paciente { get; set; }
        public HistorialPacienteIngresoDTO? Historial { get; set; }
    }
}
