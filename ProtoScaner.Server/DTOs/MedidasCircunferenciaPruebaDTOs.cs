namespace ProtoScaner.Server.DTOs
{
    public class MedidasCircunferenciaPruebaDTO
    {
        public int IdMedida { get; set; }
        public int? IdValor { get; set; }
        public int? NumeroCircunferencia { get; set; }
        public decimal? ValorMmSinPresion { get; set; }
        public decimal? ValorMmConPresion { get; set; }
    }
}
