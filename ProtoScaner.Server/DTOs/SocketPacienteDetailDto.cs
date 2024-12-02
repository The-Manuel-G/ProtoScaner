using System;

namespace ProtoScaner.Server.DTOs
{
    public class SocketPacienteDetailDto
    {
        public int IdSocket { get; set; }
        public string NombrePaciente { get; set; }
        public string CodigoPaciente { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Tamaño { get; set; }
       
    }
}
