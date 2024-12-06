using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/reportes")]
    public class ReportesController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public ReportesController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        [HttpGet("estatus-pacientes")]
        public async Task<IActionResult> ObtenerEstatusPacientes()
        {
            var data = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.IdEstatusPacienteNavigation)
                .Include(p => p.PacienteDescartados)
                .Select(p => new
                {
                    Estatus = p.IdEstatusPacienteNavigation != null ? p.IdEstatusPacienteNavigation.Descripcion : "Sin Estatus",
                    EsDescartado = p.PacienteDescartados.Any(pd => pd.Descartado)
                })
                .ToListAsync();

            var estatusCounts = data
                .GroupBy(p => p.Estatus)
                .Select(g => new
                {
                    Estatus = g.Key,
                    Cantidad = g.Count()
                })
                .ToList();

            var descartadosCount = data.Count(p => p.EsDescartado);
            if (descartadosCount > 0)
            {
                estatusCounts.Add(new { Estatus = "Descartados", Cantidad = descartadosCount });
            }

            return Ok(estatusCounts);
        }

        [HttpGet("distribucion-genero")]
        public async Task<IActionResult> ObtenerDistribucionGenero()
        {
            var data = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.GeneroNavigation)
                .GroupBy(p => p.GeneroNavigation != null ? p.GeneroNavigation.Genero1 : "Desconocido")
                .Select(g => new
                {
                    Genero = g.Key,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpGet("pacientes-por-provincia")]
        public async Task<IActionResult> ObtenerPacientesPorProvincia()
        {
            var data = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.IdProvinciaNavigation)
                .GroupBy(p => p.IdProvinciaNavigation != null ? p.IdProvinciaNavigation.NombreProvincia : "Sin Provincia")
                .Select(g => new
                {
                    Provincia = g.Key,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpGet("generos-por-provincia")]
        public async Task<IActionResult> ObtenerGenerosPorProvincia()
        {
            var data = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.GeneroNavigation)
                .Include(p => p.IdProvinciaNavigation)
                .GroupBy(p => new { Provincia = p.IdProvinciaNavigation.NombreProvincia, Genero = p.GeneroNavigation.Genero1 })
                .Select(g => new
                {
                    Provincia = g.Key.Provincia ?? "Sin Provincia",
                    Genero = g.Key.Genero ?? "Sin Genero",
                    Cantidad = g.Count()
                })
                .ToListAsync();

            var groupedData = data
                .GroupBy(d => d.Provincia)
                .Select(g => new
                {
                    Provincia = g.Key,
                    Generos = g.ToDictionary(x => x.Genero, x => x.Cantidad)
                })
                .ToList();

            return Ok(groupedData);
        }



        // Acción para contar pacientes por IdEstatusProtesis
        [HttpGet("estatus-protesis-for-estatus")]
        public async Task<IActionResult> GetPacientesPorEstatusProtesis()
        {
            try
            {
                var resultado = await _context.Pacientes
                    .GroupBy(p => p.IdEstatusProtesis)
                    .Select(g => new
                    {
                        EstatusId = g.Key,
                        Cantidad = g.Count()
                    })
                    .ToListAsync();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



        [HttpGet("causas-filtradas")]
        public async Task<IActionResult> ObtenerCausasFiltradas(
            [FromQuery] int? generoId = null,
            [FromQuery] int? tipoAmputacionId = null,
            [FromQuery] int? ladoAmputacionId = null)
        {
            // Consulta base
            var query = _context.HistorialPacienteIngresos
                .AsNoTracking()
                .Include(h => h.CausaNavigation)
                .Include(h => h.TipoAmputacionNavigation)
                .Include(h => h.LadoAmputacionNavigation)
                .Include(h => h.IdPacienteNavigation.GeneroNavigation)
                .AsQueryable();

            // Aplicar filtros opcionales
            if (generoId.HasValue && generoId.Value > 0) // 0 o null significa "todos"
                query = query.Where(h => h.IdPacienteNavigation.Genero == generoId);

            if (tipoAmputacionId.HasValue && tipoAmputacionId.Value > 0)
                query = query.Where(h => h.TipoAmputacion == tipoAmputacionId);

            if (ladoAmputacionId.HasValue && ladoAmputacionId.Value > 0)
                query = query.Where(h => h.LadoAmputacion == ladoAmputacionId);

            // Agrupación y conteo
            var data = await query
                .GroupBy(h => new
                {
                    Causa = h.CausaNavigation != null ? h.CausaNavigation.Descripcion : "Sin Causa",
                    Genero = h.IdPacienteNavigation.GeneroNavigation != null ? h.IdPacienteNavigation.GeneroNavigation.Genero1 : "Sin Género",
                    TipoAmputacion = h.TipoAmputacionNavigation != null ? h.TipoAmputacionNavigation.TipoAmputacion1 : "Sin Tipo de Amputación",
                    LadoAmputacion = h.LadoAmputacionNavigation != null ? h.LadoAmputacionNavigation.LadoAmputacion1 : "Sin Lado de Amputación"
                })
                .Select(g => new
                {
                    g.Key.Causa,
                    g.Key.Genero,
                    g.Key.TipoAmputacion,
                    g.Key.LadoAmputacion,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }


        [HttpGet("tipos-amputacion")]
        public async Task<IActionResult> ObtenerTiposDeAmputacion(
    [FromQuery] int? generoId = null,
    [FromQuery] int? ladoAmputacionId = null)
        {
            // Construimos la consulta base con las relaciones necesarias
            var query = _context.HistorialPacienteIngresos
                .AsNoTracking()
                .Include(h => h.TipoAmputacionNavigation)
                .Include(h => h.LadoAmputacionNavigation)
                .Include(h => h.IdPacienteNavigation.GeneroNavigation)
                .AsQueryable();

            // Aplicamos los filtros opcionales
            if (generoId.HasValue)
            {
                query = query.Where(h => h.IdPacienteNavigation.Genero == generoId);
            }

            if (ladoAmputacionId.HasValue)
            {
                query = query.Where(h => h.LadoAmputacion == ladoAmputacionId);
            }

            // Agrupamos por tipo de amputación
            var data = await query
                .GroupBy(h => new
                {
                    TipoAmputacion = h.TipoAmputacionNavigation != null ? h.TipoAmputacionNavigation.TipoAmputacion1 : "Sin Tipo de Amputación",
                    LadoAmputacion = h.LadoAmputacionNavigation != null ? h.LadoAmputacionNavigation.LadoAmputacion1 : "Sin Lado de Amputación",
                    Genero = h.IdPacienteNavigation.GeneroNavigation != null ? h.IdPacienteNavigation.GeneroNavigation.Genero1 : "Sin Género"
                })
                .Select(g => new
                {
                    TipoAmputacion = g.Key.TipoAmputacion,
                    LadoAmputacion = g.Key.LadoAmputacion,
                    Genero = g.Key.Genero,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }


        [HttpGet("historial-ingresos")]
        public async Task<IActionResult> ObtenerHistorialIngresos([FromQuery] int? anio, [FromQuery] int? provincia)
        {
            var pacientes = _context.Pacientes.AsNoTracking();

            if (anio.HasValue)
                pacientes = pacientes.Where(p => p.FechaIngreso.Year == anio.Value);

            if (provincia.HasValue)
                pacientes = pacientes.Where(p => p.IdProvincia == provincia.Value);

            var data = await pacientes
                .GroupBy(p => new { Mes = p.FechaIngreso.Month, Anio = p.FechaIngreso.Year })
                .Select(g => new
                {
                    Fecha = new DateTime(g.Key.Anio, g.Key.Mes, 1),
                    Cantidad = g.Count()
                })
                .OrderBy(g => g.Fecha)
                .ToListAsync();

            return Ok(data);
        }

        [HttpGet("causas-amputacion")]
        public async Task<IActionResult> ObtenerDistribucionCausas([FromQuery] int? tipoAmputacion, [FromQuery] int? ladoAmputacion, [FromQuery] int? genero)
        {
            var historial = _context.HistorialPacienteIngresos.AsNoTracking();

            if (tipoAmputacion.HasValue)
                historial = historial.Where(h => h.TipoAmputacion == tipoAmputacion.Value);

            if (ladoAmputacion.HasValue)
                historial = historial.Where(h => h.LadoAmputacion == ladoAmputacion.Value);

            if (genero.HasValue)
                historial = historial.Where(h => h.IdPacienteNavigation.Genero == genero.Value);

            var data = await historial
                .Include(h => h.CausaNavigation)
                .GroupBy(h => h.CausaNavigation.Descripcion ?? "Sin Causa")
                .Select(g => new
                {
                    Causa = g.Key,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }


        [HttpGet("genero-tipo-protesis")]
        public async Task<IActionResult> ObtenerGeneroYTipoProtesis()
        {
            var data = await _context.Protesis
                .AsNoTracking()
                .Include(p => p.IdPacienteNavigation)
                .Include(p => p.LinerTipoNavigation)
                .GroupBy(p => new { Genero = p.IdPacienteNavigation.GeneroNavigation.Genero1 ?? "Desconocido", TipoProtesis = p.LinerTipoNavigation.TipoNombre ?? "Sin Tipo" })
                .Select(g => new
                {
                    Genero = g.Key.Genero,
                    TipoProtesis = g.Key.TipoProtesis,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            var groupedData = data
                .GroupBy(d => d.Genero)
                .Select(g => new
                {
                    Genero = g.Key,
                    TiposProtesis = g.ToDictionary(x => x.TipoProtesis, x => x.Cantidad)
                })
                .ToList();

            return Ok(groupedData);
        }

        [HttpGet("edad-pacientes")]
        public async Task<IActionResult> ObtenerDistribucionEdad([FromQuery] int? genero, [FromQuery] int? provincia, [FromQuery] int? estatusPaciente)
        {
            var ahora = DateTime.Now;

            var pacientes = _context.Pacientes.AsNoTracking();

            if (genero.HasValue)
                pacientes = pacientes.Where(p => p.Genero == genero.Value);

            if (provincia.HasValue)
                pacientes = pacientes.Where(p => p.IdProvincia == provincia.Value);

            if (estatusPaciente.HasValue)
                pacientes = pacientes.Where(p => p.IdEstatusPaciente == estatusPaciente.Value);

            var data = await pacientes
                .Where(p => p.FechaNacimiento.HasValue)
                .Select(p => new
                {
                    Edad = ahora.Year - p.FechaNacimiento.Value.ToDateTime(TimeOnly.MinValue).Year -
                           (ahora < p.FechaNacimiento.Value.ToDateTime(TimeOnly.MinValue).AddYears(ahora.Year - p.FechaNacimiento.Value.Year) ? 1 : 0)
                })
                .GroupBy(p => new
                {
                    Rango = p.Edad < 18 ? "Menores de 18" :
                            p.Edad <= 30 ? "18-30" :
                            p.Edad <= 45 ? "31-45" :
                            p.Edad <= 60 ? "46-60" : "Más de 60"
                })
                .Select(g => new
                {
                    RangoEdad = g.Key.Rango,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(data);
        }




        // 1. Contador de mantenimientos activos
        [HttpGet("mantenimientos-activos")]
        public async Task<IActionResult> ObtenerMantenimientosActivos()
        {
            var activosCount = await _context.MantenimientoDetalles
                .AsNoTracking()
                .CountAsync(m => m.Activo);

            return Ok(new { TotalMantenimientosActivos = activosCount });
        }

        // 2. Número total de pacientes
        [HttpGet("total-pacientes")]
        public async Task<IActionResult> ObtenerTotalPacientes()
        {
            var totalPacientes = await _context.Pacientes
                .AsNoTracking()
                .CountAsync();

            return Ok(new { TotalPacientes = totalPacientes });
        }

        // 3. Número de pacientes en cada estatus
        [HttpGet("estatus-paciente-contador")]
        public async Task<IActionResult> ObtenerPacientesPorEstatus()
        {
            var estatusCounts = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.IdEstatusPacienteNavigation)
                .GroupBy(p => p.IdEstatusPacienteNavigation != null ? p.IdEstatusPacienteNavigation.Descripcion : "Sin Estatus")
                .Select(g => new
                {
                    Estatus = g.Key,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(estatusCounts);
        }

        // 4. Número de pacientes por estatus de prótesis
        [HttpGet("estatus-protesis-por-pacientes")]
        public async Task<IActionResult> ObtenerPacientesPorEstatusProtesis()
        {
            var protesisCounts = await _context.Pacientes
                .AsNoTracking()
                .Include(p => p.IdEstatusProtesisNavigation)
                .GroupBy(p => p.IdEstatusProtesisNavigation != null ? p.IdEstatusProtesisNavigation.Descripcion : "Sin Estatus")
                .Select(g => new
                {
                    Estatus = g.Key,
                    Cantidad = g.Count()
                })
                .ToListAsync();

            return Ok(protesisCounts);
        }


    }
}