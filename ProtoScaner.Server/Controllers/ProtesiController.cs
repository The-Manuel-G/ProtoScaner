using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System;
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
            var protesisList = await _context.Protesis
                .Include(p => p.IdPacienteNavigation)
                    .ThenInclude(pa => pa.HistorialPacienteIngresos)
                .Include(p => p.LinerTipoNavigation)
                .Include(p => p.LinerTamanoNavigation)
                .ToListAsync();

            var protesisDTO = protesisList.Select(p => MapToProtesiDto(p)).ToList();

            return Ok(protesisDTO);
        }

        // GET: api/Protesis/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProtesiDto>> GetProtesis(int id)
        {
            var protesis = await _context.Protesis
                .Include(p => p.IdPacienteNavigation)
                    .ThenInclude(pa => pa.HistorialPacienteIngresos)
                .Include(p => p.LinerTipoNavigation)
                .Include(p => p.LinerTamanoNavigation)
                .FirstOrDefaultAsync(p => p.IdProtesis == id);

            if (protesis == null)
            {
                return NotFound();
            }

            var protesisDTO = MapToProtesiDto(protesis);
            return Ok(protesisDTO);
        }

        // POST: api/Protesis
        [HttpPost]
        public async Task<ActionResult<ProtesiDto>> CreateProtesis(ProtesiDto protesisDTO)
        {
            if (protesisDTO.IdPaciente == null)
            {
                return BadRequest("El IdPaciente es requerido.");
            }

            var paciente = await _context.Pacientes.FindAsync(protesisDTO.IdPaciente);
            if (paciente == null)
            {
                return NotFound($"Paciente con Id {protesisDTO.IdPaciente} no encontrado.");
            }

            var protesis = new Protesi
            {
                IdPaciente = protesisDTO.IdPaciente,
                LinerTipo = protesisDTO.LinerTipo,
                LinerTamano = protesisDTO.LinerTamano,
                Protesista = protesisDTO.Protesista,
                Material = protesisDTO.Material,
                FechaEntrega = !string.IsNullOrEmpty(protesisDTO.FechaEntrega)
                    ? DateOnly.Parse(protesisDTO.FechaEntrega)
                    : (DateOnly?)null
            };

            _context.Protesis.Add(protesis);
            await _context.SaveChangesAsync();

            if (protesisDTO.SocketPaciente != null)
            {
                if (protesisDTO.SocketPaciente.IdPaciente != protesisDTO.IdPaciente)
                {
                    return BadRequest("El IdPaciente en SocketPaciente debe coincidir con el IdPaciente de la prótesis.");
                }

                var socketPaciente = new SocketPaciente
                {
                    IdPaciente = protesisDTO.SocketPaciente.IdPaciente,
                    Descripcion = protesisDTO.SocketPaciente.Descripcion,
                    Tamaño = protesisDTO.SocketPaciente.Tamaño,
                    FechaCreacion = protesisDTO.SocketPaciente.FechaCreacion
                };

                _context.SocketPacientes.Add(socketPaciente);
                await _context.SaveChangesAsync();
            }

            var createdProtesisDTO = await GetProtesis(protesis.IdProtesis);

            return CreatedAtAction(nameof(GetProtesis), new { id = protesis.IdProtesis }, createdProtesisDTO.Value);
        }

        // PUT: api/Protesis/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProtesis(int id, ProtesiDto protesisDTO)
        {
            if (id != protesisDTO.IdProtesis)
            {
                return BadRequest("El ID en la URL no coincide con el ID en el cuerpo de la solicitud.");
            }

            var protesis = await _context.Protesis.FindAsync(id);
            if (protesis == null)
            {
                return NotFound($"Prótesis con ID {id} no encontrada.");
            }

            protesis.IdPaciente = protesisDTO.IdPaciente;
            protesis.LinerTipo = protesisDTO.LinerTipo;
            protesis.LinerTamano = protesisDTO.LinerTamano;
            protesis.Protesista = protesisDTO.Protesista;
            protesis.Material = protesisDTO.Material;
            protesis.FechaEntrega = !string.IsNullOrEmpty(protesisDTO.FechaEntrega)
                ? DateOnly.Parse(protesisDTO.FechaEntrega)
                : (DateOnly?)null;

            _context.Entry(protesis).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProtesisExists(id))
                {
                    return NotFound($"Prótesis con ID {id} ya no existe.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Protesis/AsignarComponenteProtesis
        [HttpPost("AsignarComponenteProtesis")]
        public async Task<IActionResult> AsignarComponenteProtesis([FromBody] ProtesisComponenteDTO dto)
        {
            // Validar que ComponentID y Cantidad no sean null
            if (!dto.ComponentID.HasValue)
            {
                return BadRequest("El ComponentID es requerido.");
            }

            if (!dto.Cantidad.HasValue)
            {
                return BadRequest("La Cantidad es requerida.");
            }

            if (dto.Cantidad.Value <= 0)
            {
                return BadRequest("La cantidad debe ser un número positivo.");
            }

            // Validar que la prótesis exista
            var protesis = await _context.Protesis.FindAsync(dto.ProtesisId);
            if (protesis == null)
            {
                return NotFound($"Prótesis con ID {dto.ProtesisId} no encontrada.");
            }

            // Validar que el componente exista
            var componente = await _context.Componentes.FindAsync(dto.ComponentID.Value);
            if (componente == null)
            {
                return NotFound($"Componente con ID {dto.ComponentID} no encontrado.");
            }

            // Verificar si el componente ya está asignado a la prótesis
            var protesisComponente = await _context.ProtesisComponentes
                .FirstOrDefaultAsync(pc => pc.ProtesisId == dto.ProtesisId && pc.ComponentId == dto.ComponentID.Value);

            if (protesisComponente != null)
            {
                // Actualizar la cantidad si ya existe
                protesisComponente.Cantidad += dto.Cantidad.Value;
            }
            else
            {
                // Asignar un nuevo componente
                protesisComponente = new ProtesisComponente
                {
                    ProtesisId = dto.ProtesisId,
                    ComponentId = dto.ComponentID.Value,
                    Cantidad = dto.Cantidad.Value
                };
                _context.ProtesisComponentes.Add(protesisComponente);
            }

            await _context.SaveChangesAsync();

            return Ok("Componente asignado exitosamente a la prótesis.");
        }

        // POST: api/Protesis/AsignarMultiplesComponentesAProtesis
        [HttpPost("AsignarMultiplesComponentesAProtesis")]
        public async Task<IActionResult> AsignarMultiplesComponentesAProtesis(int protesisID, [FromBody] List<ProtesisComponenteDTO> componentesDTO)
        {
            if (componentesDTO == null || componentesDTO.Count == 0)
            {
                return BadRequest("La lista de componentes no puede estar vacía.");
            }

            // Validar que la prótesis exista
            var protesis = await _context.Protesis.FindAsync(protesisID);
            if (protesis == null)
            {
                return NotFound($"Prótesis con ID {protesisID} no encontrada.");
            }

            foreach (var dto in componentesDTO)
            {
                // Validar que ComponentID y Cantidad no sean null
                if (!dto.ComponentID.HasValue)
                {
                    return BadRequest("El ComponentID es requerido para cada componente.");
                }

                if (!dto.Cantidad.HasValue)
                {
                    return BadRequest("La Cantidad es requerida para cada componente.");
                }

                if (dto.Cantidad.Value <= 0)
                {
                    return BadRequest("La cantidad de cada componente debe ser un número positivo.");
                }

                // Validar que cada componente exista
                var componente = await _context.Componentes.FindAsync(dto.ComponentID.Value);
                if (componente == null)
                {
                    return NotFound($"Componente con ID {dto.ComponentID} no encontrado.");
                }

                // Verificar si el componente ya está asignado a la prótesis
                var protesisComponente = await _context.ProtesisComponentes
                    .FirstOrDefaultAsync(pc => pc.ProtesisId == protesisID && pc.ComponentId == dto.ComponentID.Value);

                if (protesisComponente != null)
                {
                    // Actualizar la cantidad si ya existe
                    protesisComponente.Cantidad += dto.Cantidad.Value;
                }
                else
                {
                    // Asignar un nuevo componente
                    protesisComponente = new ProtesisComponente
                    {
                        ProtesisId = protesisID,
                        ComponentId = dto.ComponentID.Value,
                        Cantidad = dto.Cantidad.Value
                    };
                    _context.ProtesisComponentes.Add(protesisComponente);
                }
            }

            await _context.SaveChangesAsync();

            return Ok("Múltiples componentes asignados exitosamente a la prótesis.");
        }

        // Método de mapeo manual de Protesi a ProtesiDto
        private ProtesiDto MapToProtesiDto(Protesi protesis)
        {
            return new ProtesiDto
            {
                IdProtesis = protesis.IdProtesis,
                IdPaciente = protesis.IdPaciente,
                LinerTipo = protesis.LinerTipo,
                LinerTamano = protesis.LinerTamano,
                Protesista = protesis.Protesista,
                FechaEntrega = protesis.FechaEntrega?.ToString("yyyy-MM-dd"),
                Material = protesis.Material,
                Paciente = protesis.IdPacienteNavigation != null ? new PacienteDTO
                {
                    IdPaciente = protesis.IdPacienteNavigation.IdPaciente,
                    NombreCompleto = protesis.IdPacienteNavigation.NombreCompleto,
                    FechaNacimiento = protesis.IdPacienteNavigation.FechaNacimiento?.ToString("yyyy-MM-dd"),
                    HistorialPacienteIngresos = protesis.IdPacienteNavigation.HistorialPacienteIngresos?.Select(hpi => new HistorialPacienteIngresoDTO
                    {
                        IdHistorial = hpi.IdHistorial,
                        IdPaciente = hpi.IdPaciente,
                        TipoAmputacion = hpi.TipoAmputacion.HasValue // Validación para asignar el valor como nullable int
                            ? new TipoAmputacionDTO
                            {
                                IdTipoAmputacion = hpi.TipoAmputacion.Value // Conversión explícita
                            }.IdTipoAmputacion
                            : (int?)null, // Si no tiene valor, asigna null
                        LadoAmputacion = hpi.LadoAmputacion
                    }).ToList()
                } : null,
                Liner = protesis.LinerTipoNavigation != null && protesis.LinerTamanoNavigation != null ? new LinerDTO
                {
                    TipoLiner = new TipoLinerDTO
                    {
                        IdTipoLiner = protesis.LinerTipoNavigation.IdTipoLiner,
                        TipoNombre = protesis.LinerTipoNavigation.TipoNombre
                    },
                    Talla = new TallaDto
                    {
                        IdTalla = protesis.LinerTamanoNavigation.IdTalla,
                        TallaNombre = protesis.LinerTamanoNavigation.TallaNombre,
                        TipoAmputacionId = protesis.LinerTamanoNavigation.TipoAmputacionId // Sin necesidad de convertir explícitamente ya que coincide el tipo
                    }
                } : null,
                SocketPaciente = null // No se incluye en los GET
            };
        }


        // Método para verificar si una prótesis existe
        private bool ProtesisExists(int id)
        {
            return _context.Protesis.Any(e => e.IdProtesis == id);
        }
    }
}

