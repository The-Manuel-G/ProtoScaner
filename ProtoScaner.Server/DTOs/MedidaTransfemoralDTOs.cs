namespace ProtoScaner.Server.DTOs
{
    public class MedidaTransfemoralDTO
    {
        public int IdMedidaT { get; set; }
        public int? IdEscaneo { get; set; }
        public int? IdValor { get; set; }
        public int? IdPaciente { get; set; }
        public string? FotoMunon { get; set; }
        public DateTime FechaEscaneo { get; set; } // Se maneja como DateTime en el DTO
        public string? DisenadorSocket { get; set; }
        public decimal? LongitudPie { get; set; } // Cambiado a decimal
        public decimal? AlturaTalon { get; set; } // Cambiado a decimal
        public decimal? Medida1 { get; set; } // Cambiado a decimal
        public decimal? Medida2 { get; set; } // Cambiado a decimal
        public int? IdLiner { get; set; }

        public List<MedidasCircunferenciumDTO> Circunferencias { get; set; } = new();
    }
}
