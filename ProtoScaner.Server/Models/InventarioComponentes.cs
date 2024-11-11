using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProtoScaner.Server.Models;

public class InventarioComponentes
{
    [Key]
    public int InventarioID { get; set; }
    public int ComponentID { get; set; }
    public int StockActual { get; set; } = 0;
    public int PuntoReorden { get; set; } = 5;

    // Relación con Componente
    public virtual Componente Componente { get; set; } = null!;
}


