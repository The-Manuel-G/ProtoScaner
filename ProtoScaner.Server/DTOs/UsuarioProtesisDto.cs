namespace ProtoScaner.Server.DTOs
{


  
        public class UsuarioProtesisDto
        {
            public int IdUsuario { get; set; }
            public int IdProtesis { get; set; }

            // Información adicional opcional
            public UsuarioDTO Usuario { get; set; }
            public ProtesiDto Protesis { get; set; }
        }
    }
