using System.ComponentModel;

namespace ProtoScaner.Server.DTOs
{
    public class InventarioComponentesDto
    {
        public int InventarioID { get; set; }
        public int ComponentID { get; set; }
        public int StockActual { get; set; }
        public int PuntoReorden { get; set; }

        // Información adicional opcional
        public ComponenteDTO Componente { get; set; }

    }
}
