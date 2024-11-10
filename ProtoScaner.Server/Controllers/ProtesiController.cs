using Microsoft.AspNetCore.Mvc;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
                .Include(p => p.CodigoPacienteNavigation)
                    .ThenInclude(p => p.HistorialPacienteIngresos) // Incluir historial de ingresos
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

        // GET: api/Protesis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProtesiDto>> GetProtesi(int id)
        {
            var protesis = await _context.Protesis
                .Include(p => p.CodigoPacienteNavigation)
                .Where(p => p.IdProtesis == id)
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
                        Comentario = p.CodigoPacienteNavigation.Comentario
                    }
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
        public async Task<ActionResult<ProtesiDto>> CreateProtesi(ProtesiDto protesiDto)
        {
            var protesis = new Protesi
            {
                CodigoPaciente = protesiDto.CodigoPaciente,
                LinerTipo = protesiDto.LinerTipo,
                LinerTamano = protesiDto.LinerTamano,
                Protesista = protesiDto.Protesista,
                FechaEntrega = protesiDto.FechaEntrega,
                Material = protesiDto.Material
            };

            _context.Protesis.Add(protesis);
            await _context.SaveChangesAsync();

            protesiDto.IdProtesis = protesis.IdProtesis;
            return CreatedAtAction(nameof(GetProtesi), new { id = protesis.IdProtesis }, protesiDto);
        }

        // PUT: api/Protesis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProtesi(int id, ProtesiDto protesiDto)
        {
            if (id != protesiDto.IdProtesis)
            {
                return BadRequest();
            }

            var protesis = await _context.Protesis.FindAsync(id);
            if (protesis == null)
            {
                return NotFound();
            }

            protesis.CodigoPaciente = protesiDto.CodigoPaciente;
            protesis.LinerTipo = protesiDto.LinerTipo;
            protesis.LinerTamano = protesiDto.LinerTamano;
            protesis.Protesista = protesiDto.Protesista;
            protesis.FechaEntrega = protesiDto.FechaEntrega;
            protesis.Material = protesiDto.Material;

            _context.Entry(protesis).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProtesiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Protesis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProtesi(int id)
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

        private bool ProtesiExists(int id)
        {
            return _context.Protesis.Any(e => e.IdProtesis == id);
        }
    }
}
