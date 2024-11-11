using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProtesisController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public ProtesisController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/Protesis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProtesiDto>>> GetProtesis()
        {
            var protesis = await _context.Protesis
                .AsNoTracking()
                .Include(p => p.CodigoPacienteNavigation)
                    .ThenInclude(p => p.HistorialPacienteIngresos)
                .Select(p => new ProtesiDto
                {
                    IdProtesis = p.IdProtesis,
                    CodigoPaciente = p.CodigoPaciente,
                    LinerTipo = p.LinerTipo,
                    LinerTamano = p.LinerTamano,
                    Protesista = p.Protesista,
                    FechaEntrega = p.FechaEntrega,
                    Material = p.Material,
                    Paciente = p.CodigoPacienteNavigation == null ? null : new PacienteDTO
                    {
                        IdPaciente = p.CodigoPacienteNavigation.IdPaciente,
                        NombreCompleto = p.CodigoPacienteNavigation.NombreCompleto,
                        Cedula = p.CodigoPacienteNavigation.Cedula,
                        Genero = p.CodigoPacienteNavigation.Genero,
                        FechaNacimiento = p.CodigoPacienteNavigation.FechaNacimiento.ToString(),
                        Direccion = p.CodigoPacienteNavigation.Direccion,
                        Telefono = p.CodigoPacienteNavigation.Telefono,
                        TelefonoCelular = p.CodigoPacienteNavigation.TelefonoCelular,
                        IdProvincia = p.CodigoPacienteNavigation.IdProvincia,
                        Sector = p.CodigoPacienteNavigation.Sector,
                        Insidencia = p.CodigoPacienteNavigation.Insidencia,
                        IdEstatusPaciente = p.CodigoPacienteNavigation.IdEstatusPaciente,
                        IdEstatusProtesis = p.CodigoPacienteNavigation.IdEstatusProtesis,
                        Comentario = p.CodigoPacienteNavigation.Comentario,
                        HistorialPacienteIngresos = p.CodigoPacienteNavigation.HistorialPacienteIngresos
                            .Select(h => new HistorialPacienteIngresoDTO
                            {
                                IdHistorial = h.IdHistorial,
                                IdPaciente = h.IdPaciente,
                                TipoAmputacion = h.TipoAmputacion,
                                LadoAmputacion = h.LadoAmputacion,
                                FechaAmputacion = h.FechaAmputacion,
                                Causa = h.Causa,
                                Terapia = h.Terapia,
                                TiempoTerapia = h.TiempoTerapia,
                                IdMedida = h.IdMedida,
                                Comentario = h.Comentario
                            }).ToList()
                    }
                })
                .ToListAsync();

            return Ok(protesis);
        }

        // POST: api/Protesis/AsignarComponenteProtesis
        [HttpPost("AsignarComponenteProtesis")]
        public async Task<IActionResult> AsignarComponenteProtesis(int protesisId, int componentId, int cantidad)
        {
            var inventario = await _context.InventarioComponentes
                .Include(i => i.Componente)
                .FirstOrDefaultAsync(i => i.ComponentID == componentId);

            if (inventario == null || inventario.StockActual < cantidad)
                return BadRequest("Stock insuficiente para asignar a la prótesis.");

            var protesisComponente = new ProtesisComponente
            {
                ProtesisId = protesisId,
                ComponentId = componentId,
                Cantidad = cantidad
            };
            _context.ProtesisComponentes.Add(protesisComponente);

            inventario.StockActual -= cantidad;

            var movimiento = new MovimientoInventario
            {
                ComponentID = componentId,
                TipoMovimiento = "Salida",
                Cantidad = cantidad,
                Descripcion = $"Asignación a prótesis {protesisId}"
            };
            _context.MovimientosInventario.Add(movimiento);

            await _context.SaveChangesAsync();

            var componenteDTO = new ComponenteDTO
            {
                ComponentId = componentId,
                ComponentTipoId = inventario.Componente.ComponentTipoId,
                Codigo = inventario.Componente.Codigo,
                Description = inventario.Componente.Description
            };

            return Ok(new { mensaje = "Componente asignado a la prótesis y stock actualizado.", inventario, componenteDTO });
        }

        // POST: api/Protesis/AsignarMultiplesComponentesAProtesis
        [HttpPost("AsignarMultiplesComponentesAProtesis")]
        public async Task<IActionResult> AsignarMultiplesComponentesAProtesis(int protesisId, List<ProtesisComponenteDTO> componentes)
        {
            var errores = new List<string>();

            foreach (var componenteDto in componentes)
            {
                var inventario = await _context.InventarioComponentes
                    .Include(i => i.Componente)
                    .FirstOrDefaultAsync(i => i.ComponentID == componenteDto.ComponentID); // Usa ComponentID

                if (inventario == null)
                {
                    errores.Add($"Componente con ID {componenteDto.ComponentID} no encontrado en el inventario."); // Usa ComponentID
                    continue;
                }

                if (inventario.StockActual < (componenteDto.Cantidad ?? 0))
                {
                    errores.Add($"Stock insuficiente para el componente con ID {componenteDto.ComponentID}. Stock actual: {inventario.StockActual}, requerido: {componenteDto.Cantidad ?? 0}."); // Usa ComponentID
                }
            }

            if (errores.Any())
                return BadRequest(new { mensaje = "Errores en la asignación de componentes", errores });

            foreach (var componenteDto in componentes)
            {
                var protesisComponente = new ProtesisComponente
                {
                    ProtesisId = protesisId,
                    ComponentId = componenteDto.ComponentID,  // Usa ComponentID aquí
                    Cantidad = componenteDto.Cantidad ?? 0
                };
                _context.ProtesisComponentes.Add(protesisComponente);

                var inventario = await _context.InventarioComponentes.FirstOrDefaultAsync(i => i.ComponentID == componenteDto.ComponentID); // Usa ComponentID aquí también
                inventario.StockActual -= componenteDto.Cantidad ?? 0;

                var movimiento = new MovimientoInventario
                {
                    ComponentID = componenteDto.ComponentID,  // Usa ComponentID aquí también
                    TipoMovimiento = "Salida",
                    Cantidad = componenteDto.Cantidad ?? 0,
                    Descripcion = $"Asignación a prótesis {protesisId}"
                };
                _context.MovimientosInventario.Add(movimiento);
            }

            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Componentes asignados a la prótesis y stock actualizado." });
        }



    }
}
