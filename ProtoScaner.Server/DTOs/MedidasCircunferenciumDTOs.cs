namespace ProtoScaner.Server.DTOs
{

    public class MedidasCircunferenciumDTO
    {
        public int IdMedida { get; set; }
        public int IdValor { get; set; } // Cambiar a int si el modelo espera int
        public int NumeroCircunferencia { get; set; }
        public decimal? ValorMmSinPresion { get; set; }
        public decimal? ValorMmConPresion { get; set; }
    }

}

