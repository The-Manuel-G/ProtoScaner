namespace ProtoScaner.Server.DTOs
{
    public class ComentarioDto
    {

        
            public int IdComentario { get; set; }
            public int IdUsuario { get; set; }
            public int? IdPaciente { get; set; }
            public int? IdTomaMedida { get; set; }
            public int? IdPruebaSocket { get; set; }
            public int? IdMantenimiento { get; set; }
            public int? IdProtesis { get; set; }
            public string ComentarioTexto { get; set; }
            public DateTime FechaComentario { get; set; }
        }
    
}
