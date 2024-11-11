namespace ProtoScaner.Server.Models
{
    public class UsuarioProtesis
    {
        public int IdUsuario { get; set; }
        public int IdProtesis { get; set; }

        // Propiedades de navegación
        public virtual Usuario Usuario { get; set; }
        public virtual Protesi Protesis { get; set; }
    }

}
