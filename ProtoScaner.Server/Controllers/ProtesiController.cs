using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProtoScaner.Server.DTOs;

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
                .Include(p => p.IdPacienteNavigation)
                    .ThenInclude(pa => pa.HistorialPacienteIngresos)
                .Include(p => p.LinerTipoNavigation)
                .Include(p => p.LinerTamanoNavigation)
                .Select(p => new ProtesiDto
                {
                    IdProtesis = p.IdProtesis,
                    IdPaciente = p.IdPaciente ?? 0, // Maneja int nullable
                    LinerTipo = p.LinerTipo,
                    LinerTamano = p.LinerTamano,
                    Protesista = p.Protesista,
                    FechaEntrega = p.FechaEntrega.HasValue ? p.FechaEntrega.Value.ToString("yyyy-MM-dd") : null,
                    Material = p.Material,
                    Paciente = p.IdPacienteNavigation == null ? null : new PacienteDTO
                    {
                        IdPaciente = p.IdPacienteNavigation.IdPaciente,
                        NombreCompleto = p.IdPacienteNavigation.NombreCompleto,
                        FechaNacimiento = p.IdPacienteNavigation.FechaNacimiento.HasValue
                            ? p.IdPacienteNavigation.FechaNacimiento.Value.ToString("yyyy-MM-dd")
                            : null,
                        Cedula = p.IdPacienteNavigation.Cedula,
                        Genero = p.IdPacienteNavigation.Genero,
                        Direccion = p.IdPacienteNavigation.Direccion,
                        Telefono = p.IdPacienteNavigation.Telefono,
                        TelefonoCelular = p.IdPacienteNavigation.TelefonoCelular,
                        IdProvincia = p.IdPacienteNavigation.IdProvincia ?? 0, // Maneja int nullable
                        Sector = p.IdPacienteNavigation.Sector,
                        Insidencia = p.IdPacienteNavigation.Insidencia,
                        IdEstatusPaciente = p.IdPacienteNavigation.IdEstatusPaciente ?? 0, // Maneja int nullable
                        IdEstatusProtesis = p.IdPacienteNavigation.IdEstatusProtesis ?? 0, // Maneja int nullable
                        Comentario = p.IdPacienteNavigation.Comentario,
                        HistorialPacienteIngresos = p.IdPacienteNavigation.HistorialPacienteIngresos
                            .Select(hpi => new HistorialPacienteIngresoDTO
                            {
                                IdHistorial = hpi.IdHistorial,
                                IdPaciente = hpi.IdPaciente ?? 0, // Maneja int nullable
                                TipoAmputacion = hpi.TipoAmputacion, // Cambio aquí
                                LadoAmputacion = hpi.LadoAmputacion,
                                FechaAmputacion = hpi.FechaAmputacion,
                                Causa = hpi.Causa,
                                Terapia = hpi.Terapia,
                                TiempoTerapia = hpi.TiempoTerapia,
                                IdMedida = hpi.IdMedida ?? 0, // Maneja int nullable
                                Comentario = hpi.Comentario
                            }).ToList()
                    },
                    Liner = (p.LinerTipoNavigation != null && p.LinerTamanoNavigation != null) ? new LinerDTO
                    {
                        IdLiner = p.LinerTipoNavigation.IdTipoLiner, // Asumiendo que 'IdLiner' corresponde a 'TipoLinerId'
                        TipoLinerId = p.LinerTipo ?? 0, // Maneja int nullable
                        TallaId = p.LinerTamano ?? 0, // Maneja int nullable
                        PacienteId = p.IdPaciente ?? 0, // Maneja int nullable
                        TipoLiner = new TipoLinerDTO
                        {
                            IdTipoLiner = p.LinerTipoNavigation.IdTipoLiner,
                            TipoNombre = p.LinerTipoNavigation.TipoNombre
                        },
                        Talla = new TallaDto
                        {
                            IdTalla = p.LinerTamanoNavigation.IdTalla,
                            TallaNombre = p.LinerTamanoNavigation.TallaNombre,
                            TipoAmputacionId = p.LinerTamanoNavigation.TipoAmputacionId, // Maneja int nullable
                            PacienteId = p.IdPaciente ?? 0, // Maneja int nullable
                            // Eliminado TipoAmputacion para evitar acceder al nombre
                        },
                        Paciente = null
                    } : null,
                    SocketPaciente = null // Puedes mapearlo si es necesario
                })
                .ToListAsync();

            return Ok(protesis);
        }

        // GET: api/Protesis/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProtesiDto>> GetProtesis(int id)
        {
            var protesis = await _context.Protesis
                .AsNoTracking()
                .Include(p => p.IdPacienteNavigation)
                    .ThenInclude(pa => pa.HistorialPacienteIngresos)
                .Include(p => p.LinerTipoNavigation)
                .Include(p => p.LinerTamanoNavigation)
                .Where(p => p.IdProtesis == id)
                .Select(p => new ProtesiDto
                {
                    IdProtesis = p.IdProtesis,
                    IdPaciente = p.IdPaciente ?? 0, // Maneja int nullable
                    LinerTipo = p.LinerTipo,
                    LinerTamano = p.LinerTamano,
                    Protesista = p.Protesista,
                    FechaEntrega = p.FechaEntrega.HasValue ? p.FechaEntrega.Value.ToString("yyyy-MM-dd") : null,
                    Material = p.Material,
                    Paciente = p.IdPacienteNavigation == null ? null : new PacienteDTO
                    {
                        IdPaciente = p.IdPacienteNavigation.IdPaciente,
                        NombreCompleto = p.IdPacienteNavigation.NombreCompleto,
                        FechaNacimiento = p.IdPacienteNavigation.FechaNacimiento.HasValue
                            ? p.IdPacienteNavigation.FechaNacimiento.Value.ToString("yyyy-MM-dd")
                            : null,
                        Cedula = p.IdPacienteNavigation.Cedula,
                        Genero = p.IdPacienteNavigation.Genero,
                        Direccion = p.IdPacienteNavigation.Direccion,
                        Telefono = p.IdPacienteNavigation.Telefono,
                        TelefonoCelular = p.IdPacienteNavigation.TelefonoCelular,
                        IdProvincia = p.IdPacienteNavigation.IdProvincia ?? 0, // Maneja int nullable
                        Sector = p.IdPacienteNavigation.Sector,
                        Insidencia = p.IdPacienteNavigation.Insidencia,
                        IdEstatusPaciente = p.IdPacienteNavigation.IdEstatusPaciente ?? 0, // Maneja int nullable
                        IdEstatusProtesis = p.IdPacienteNavigation.IdEstatusProtesis ?? 0, // Maneja int nullable
                        Comentario = p.IdPacienteNavigation.Comentario,
                        HistorialPacienteIngresos = p.IdPacienteNavigation.HistorialPacienteIngresos
                            .Select(hpi => new HistorialPacienteIngresoDTO
                            {
                                IdHistorial = hpi.IdHistorial,
                                IdPaciente = hpi.IdPaciente ?? 0, // Maneja int nullable
                                TipoAmputacion = hpi.TipoAmputacion, // Cambio aquí
                                LadoAmputacion = hpi.LadoAmputacion,
                                FechaAmputacion = hpi.FechaAmputacion,
                                Causa = hpi.Causa,
                                Terapia = hpi.Terapia,
                                TiempoTerapia = hpi.TiempoTerapia,
                                IdMedida = hpi.IdMedida ?? 0, // Maneja int nullable
                                Comentario = hpi.Comentario
                            }).ToList()
                    },
                    Liner = p.LinerTipoNavigation == null || p.LinerTamanoNavigation == null ? null : new LinerDTO
                    {
                        IdLiner = p.LinerTipoNavigation.IdTipoLiner, // Asumiendo que 'IdLiner' corresponde a 'TipoLinerId'
                        TipoLinerId = p.LinerTipo ?? 0, // Maneja int nullable
                        TallaId = p.LinerTamano ?? 0, // Maneja int nullable
                        PacienteId = p.IdPaciente ?? 0, // Maneja int nullable
                        TipoLiner = new TipoLinerDTO
                        {
                            IdTipoLiner = p.LinerTipoNavigation.IdTipoLiner,
                            TipoNombre = p.LinerTipoNavigation.TipoNombre
                        },
                        Talla = new TallaDto
                        {
                            IdTalla = p.LinerTamanoNavigation.IdTalla,
                            TallaNombre = p.LinerTamanoNavigation.TallaNombre,
                            TipoAmputacionId = p.LinerTamanoNavigation.TipoAmputacionId, // Maneja int nullable
                            PacienteId = p.IdPaciente ?? 0, // Maneja int nullable
                            // Eliminado TipoAmputacion para evitar acceder al nombre
                        },
                        Paciente = null // Puedes mapearlo si es necesario
                    },
                    SocketPaciente = null // Puedes mapearlo si es necesario
                })
                .FirstOrDefaultAsync();

            if (protesis == null)
            {
                return NotFound();
            }

            return Ok(protesis);
        }


        // POST: api/Protesis
        [HttpPost]
        public async Task<ActionResult<CreateProtesiDto>> CreateProtesis(CreateProtesiDto protesisDTO)
        {
            // Validaciones básicas
            if (protesisDTO.LinerTipo == 0 || protesisDTO.LinerTamano == 0)
            {
                return BadRequest("El LinerTipo y LinerTamano son requeridos.");
            }

            // Crear la entidad Protesi
            var protesis = new Protesi
            {
                IdPaciente = protesisDTO.IdPaciente,
                LinerTipo = protesisDTO.LinerTipo,
                LinerTamano = protesisDTO.LinerTamano,
                Protesista = protesisDTO.Protesista,
                FechaEntrega = !string.IsNullOrEmpty(protesisDTO.FechaEntrega)
                    ? DateOnly.Parse(protesisDTO.FechaEntrega)
                    : (DateOnly?)null,
                Material = protesisDTO.Material
            };

            // Guardar en la base de datos
            _context.Protesis.Add(protesis);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProtesis), new { id = protesis.IdProtesis }, protesisDTO);
        }


        // PUT: api/Protesis/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProtesis(int id, UpdateProtesisDto protesisDTO)
        {
            if (id != protesisDTO.IdProtesis)
            {
                return BadRequest("El ID en la URL no coincide con el ID en el cuerpo de la solicitud.");
            }

            var protesisExistente = await _context.Protesis.FindAsync(id);
            if (protesisExistente == null)
            {
                return NotFound($"Prótesis con ID {id} no encontrada.");
            }

            // Actualizar los campos necesarios
            protesisExistente.IdPaciente = protesisDTO.IdPaciente ?? protesisExistente.IdPaciente; // No actualizar si es null
            protesisExistente.LinerTipo = protesisDTO.LinerTipo;
            protesisExistente.LinerTamano = protesisDTO.LinerTamano;
            protesisExistente.Protesista = protesisDTO.Protesista;
            protesisExistente.Material = protesisDTO.Material;
            protesisExistente.FechaEntrega = !string.IsNullOrEmpty(protesisDTO.FechaEntrega)
                ? DateOnly.Parse(protesisDTO.FechaEntrega)
                : protesisExistente.FechaEntrega; // No actualizar si es null

            _context.Entry(protesisExistente).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/Protesis/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProtesis(int id)
        {
            var protesis = await _context.Protesis.FindAsync(id);
            if (protesis == null)
            {
                return NotFound();
            }

            _context.Protesis.Remove(protesis);
            await _context.SaveChangesAsync();

            return NoContent();
        }

       /* // POST: api/Protesis/AsignarComponenteProtesis
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
                return NotFound($"Componente con ID {dto.ComponentID.Value} no encontrado.");
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

       /* // POST: api/Protesis/AsignarMultiplesComponentesAProtesis
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
                    return NotFound($"Componente con ID {dto.ComponentID.Value} no encontrado.");
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

        // Método para verificar si una prótesis existe
        private bool ProtesisExists(int id)
        {
            return _context.Protesis.Any(e => e.IdProtesis == id);
        }*/
    }
}