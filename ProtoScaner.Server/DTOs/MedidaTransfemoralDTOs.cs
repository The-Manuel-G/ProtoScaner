namespace ProtoScaner.Server.DTOs
{
    public class MedidaTransfemoralDTO
    {
        public int IdMedidaT { get; set; }
        public int IdEscaneo { get; set; }
        public int IdValor { get; set; }
        public int IdPaciente { get; set; }

        // Almacenamos la imagen en formato base64
        public string FotoMunon { get; set; }
        public DateTime FechaEscaneo { get; set; }
        public string DisenadorSocket { get; set; }
        public double LongitudPie { get; set; }
        public double AlturaTalon { get; set; }
        public double Medida1 { get; set; }
        public double Medida2 { get; set; }
        public int IdLiner { get; set; }

        public List<MedidasCircunferenciumDTO> Circunferencias { get; set; }
    }
}