namespace ProtoScaner.Server.Models
{
    public class MovimientosInventario
    {
        public int MovimientoID { get; set; }
        public int ComponentID { get; set; }
        public DateTime FechaMovimiento { get; set; }
        public string TipoMovimiento { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }
        public virtual Componente Component { get; set; }
    }
}