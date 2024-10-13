namespace ProtoScaner.Server.DTOs
{
    public class EstatusPacienteDTO
    {
        public int IdEstatusPaciente { get; set; }
        public string? Descripcion { get; set; }
        // No incluimos la colección de Pacientes
    }
}
