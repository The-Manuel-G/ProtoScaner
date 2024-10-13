namespace ProtoScaner.Server.DTOs
{
    public class MedidaTransfemoralPruebaDTO
    {
        public int IdMedida { get; set; }
        public int? IdPaciente { get; set; }
        public int? IdPrueba { get; set; }
        public int? IdValor { get; set; }
        public byte[]? FotoMunon { get; set; }
        public DateOnly? FechaEscaneo { get; set; }
        public string? DisenadorSocket { get; set; }
        public string? LongitudPie { get; set; }
        public string? AlturaTalon { get; set; }
        public string? Medida1 { get; set; }
        public string? Medida2 { get; set; }
        public int? IdLiner { get; set; }
    }
}
