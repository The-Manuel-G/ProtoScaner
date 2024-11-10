namespace ProtoScaner.Server.DTOs
{
    public class UsuarioDTO
    {
        public int? IdUsuario { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!; // En el DTO para nuevas cuentas
        public int? IdRol { get; set; }
        public DateOnly? FechaCreacion { get; set; }
        public bool? Activo { get; set; }
        public ImagenPerfilDTO? ImagenPerfil { get; set; } // Relación con imagen de perfil
    }
}
