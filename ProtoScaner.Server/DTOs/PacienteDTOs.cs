using System;

namespace ProtoScaner.Server.DTOs
{
    public class PacienteDTO
    {
        public int IdPaciente { get; set; }
        public string? NombreCompleto { get; set; }
        public string? Cedula { get; set; }
        public int? Genero { get; set; }
        public string  FechaNacimiento { get; set; }  // Usamos DateOnly para manejar la fecha sin hora
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public string? TelefonoCelular { get; set; }
        public int? IdProvincia { get; set; }
        public string? Sector { get; set; }
        public bool? Insidencia { get; set; }
        public int? IdEstatusPaciente { get; set; }
        public int? IdEstatusProtesis { get; set; }
        public string? Comentario { get; set; }
        public string? FotoPaciente { get; set; }  // Imagen en formato Base64

        public List<HistorialPacienteIngresoDTO>? HistorialPacienteIngresos { get; set; }
    }
}
