using System;

namespace ProtoScaner.Server.DTOs
{
    public class ProtesisDetailDto
    {
        public int IdProtesis { get; set; }
        public string NombrePaciente { get; set; }
        public string CodigoPaciente { get; set; }
        public string LinerTipo { get; set; }
        public string LinerTamano { get; set; }
        public string Protesista { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string Material { get; set; }
        public string CedulaPaciente { get; set; }
        public string LadoAmputacion { get; set; }
        // Agrega otros campos relevantes según tus necesidades
    }
}
