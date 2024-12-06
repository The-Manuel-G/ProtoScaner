using System.ComponentModel;

namespace ProtoScaner.Server.DTOs
{
    public class MovimientoInventarioDto
    {
        public int MovimientoID { get; set; }
        public int ComponentID { get; set; }
        public DateTime FechaMovimiento { get; set; }
        public string TipoMovimiento { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }

        // Información adicional opcional
        public ComponenteDTO Componente { get; set; }
    }

}
