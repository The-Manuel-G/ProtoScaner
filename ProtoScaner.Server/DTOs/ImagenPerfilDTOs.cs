namespace ProtoScaner.Server.DTOs
{
    public class ImagenPerfilDTO
    {
        public int IdImagen { get; set; }
        public int? IdUsuario { get; set; }
        public byte[]? Imagen { get; set; }
        public string? Descripcion { get; set; }
    }
}
