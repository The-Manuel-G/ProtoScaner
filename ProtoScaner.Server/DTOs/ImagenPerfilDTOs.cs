namespace ProtoScaner.Server.DTOs
{
    public class ImagenPerfilDTO
    {
        public int? IdImagen { get; set; }
        public int? IdUsuario { get; set; }
        public string? Imagen { get; set; } // Base64 string
        public string? Descripcion { get; set; }
    }
}
