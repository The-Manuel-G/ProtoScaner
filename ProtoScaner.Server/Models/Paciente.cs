using System;
using System.Collections.Generic;

namespace ProtoScaner.Server.Models;

public partial class Paciente
{
    public int IdPaciente { get; set; }

    public string? NombreCompleto { get; set; }

    public string? Cedula { get; set; }

    public int? Genero { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    public string? Direccion { get; set; }

    public string? Telefono { get; set; }

    public string? TelefonoCelular { get; set; }

    public int? IdProvincia { get; set; }

    public string? Sector { get; set; }

    public bool? Insidencia { get; set; }

    public int? IdEstatusPaciente { get; set; }

    public int? IdEstatusProtesis { get; set; }

    public string? Comentario { get; set; }

    public byte[]? FotoPaciente { get; set; }

    public virtual ICollection<Entrega> Entregas { get; set; } = new List<Entrega>();

    public virtual Genero? GeneroNavigation { get; set; }

    public virtual ICollection<HistorialPacienteIngreso> HistorialPacienteIngresos { get; set; } = new List<HistorialPacienteIngreso>();

    public virtual EstatusPaciente? IdEstatusPacienteNavigation { get; set; }

    public virtual EstatusProtesi? IdEstatusProtesisNavigation { get; set; }

    public virtual Provincium? IdProvinciaNavigation { get; set; }

    public virtual ICollection<Insidencia> InsidenciaNavigation { get; set; } = new List<Insidencia>();

    public virtual ICollection<MantenimientoComponente> MantenimientoComponentes { get; set; } = new List<MantenimientoComponente>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<MedidaTransfemoralPrueba> MedidaTransfemoralPruebas { get; set; } = new List<MedidaTransfemoralPrueba>();

    public virtual ICollection<MedidaTransfemoral> MedidaTransfemorals { get; set; } = new List<MedidaTransfemoral>();

    public virtual ICollection<MedidaTranstibial> MedidaTranstibials { get; set; } = new List<MedidaTranstibial>();

    public virtual ICollection<Protesi> Protesis { get; set; } = new List<Protesi>();

    public virtual ICollection<PruebaSocket> PruebaSockets { get; set; } = new List<PruebaSocket>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();

    public virtual ICollection<SocketPaciente> SocketPacientes { get; set; } = new List<SocketPaciente>();

    public virtual ICollection<TomaMedidasEscaneo> TomaMedidasEscaneos { get; set; } = new List<TomaMedidasEscaneo>();

    public virtual ICollection<TranstibialPrueba> TranstibialPruebas { get; set; } = new List<TranstibialPrueba>();
}
