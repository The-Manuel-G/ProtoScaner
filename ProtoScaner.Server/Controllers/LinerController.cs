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
    public class LinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public LinerController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/liner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerDTO>>> GetLiners()
        {
            var liners = await _context.Liners
                .ToListAsync();

            var linersDTO = liners.Select(l => MapToLinerDTO(l)).ToList();

            return Ok(linersDTO);
        }

        // GET: api/liner/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerDTO>> GetLiner(int id)
        {
            var liner = await _context.Liners.FindAsync(id);

            if (liner == null)
            {
                return NotFound();
            }

            var linerDTO = MapToLinerDTO(liner);
            return Ok(linerDTO);
        }

        // POST: api/liner
        [HttpPost]
        public async Task<ActionResult<LinerDTO>> CreateLiner(LinerDTO linerDTO)
        {
            // Validaciones básicas
            if (linerDTO.TipoLinerId <= 0)
            {
                return BadRequest("TipoLinerId debe ser un entero positivo.");
            }

            if (linerDTO.TallaId <= 0)
            {
                return BadRequest("TallaId debe ser un entero positivo.");
            }

            // Verificar que TipoLinerId exista
            var tipoLinerExists = await _context.TipoLiners
                .AnyAsync(tl => tl.IdTipoLiner == linerDTO.TipoLinerId);
            if (!tipoLinerExists)
            {
                return BadRequest($"TipoLinerId {linerDTO.TipoLinerId} no existe.");
            }

            // Verificar que TallaId exista
            var tallaExists = await _context.Tallas
                .AnyAsync(t => t.IdTalla == linerDTO.TallaId);
            if (!tallaExists)
            {
                return BadRequest($"TallaId {linerDTO.TallaId} no existe.");
            }

            // Si PacienteId está proporcionado, verificar que exista
            if (linerDTO.PacienteId.HasValue)
            {
                var pacienteExists = await _context.Pacientes
                    .AnyAsync(p => p.IdPaciente == linerDTO.PacienteId.Value);
                if (!pacienteExists)
                {
                    return BadRequest($"PacienteId {linerDTO.PacienteId.Value} no existe.");
                }
            }

            var liner = new Liner
            {
                TipoLinerId = linerDTO.TipoLinerId,
                TallaId = linerDTO.TallaId,
                PacienteId = linerDTO.PacienteId
            };

            _context.Liners.Add(liner);
            await _context.SaveChangesAsync();

            // Mapear el Liner creado a LinerDTO
            var createdLinerDTO = MapToLinerDTO(liner);

            return CreatedAtAction(nameof(GetLiner), new { id = liner.IdLiner }, createdLinerDTO);
        }

        // PUT: api/liner/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLiner(int id, LinerDTO linerDTO)
        {
            if (id != linerDTO.IdLiner)
            {
                return BadRequest("El ID en la URL no coincide con el ID en el cuerpo de la solicitud.");
            }

            // Validaciones básicas
            if (linerDTO.TipoLinerId <= 0)
            {
                return BadRequest("TipoLinerId debe ser un entero positivo.");
            }

            if (linerDTO.TallaId <= 0)
            {
                return BadRequest("TallaId debe ser un entero positivo.");
            }

            // Verificar que TipoLinerId exista
            var tipoLinerExists = await _context.TipoLiners
                .AnyAsync(tl => tl.IdTipoLiner == linerDTO.TipoLinerId);
            if (!tipoLinerExists)
            {
                return BadRequest($"TipoLinerId {linerDTO.TipoLinerId} no existe.");
            }

            // Verificar que TallaId exista
            var tallaExists = await _context.Tallas
                .AnyAsync(t => t.IdTalla == linerDTO.TallaId);
            if (!tallaExists)
            {
                return BadRequest($"TallaId {linerDTO.TallaId} no existe.");
            }

            // Si PacienteId está proporcionado, verificar que exista
            if (linerDTO.PacienteId.HasValue)
            {
                var pacienteExists = await _context.Pacientes
                    .AnyAsync(p => p.IdPaciente == linerDTO.PacienteId.Value);
                if (!pacienteExists)
                {
                    return BadRequest($"PacienteId {linerDTO.PacienteId.Value} no existe.");
                }
            }

            var liner = await _context.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            liner.TipoLinerId = linerDTO.TipoLinerId;
            liner.TallaId = linerDTO.TallaId;
            liner.PacienteId = linerDTO.PacienteId;

            _context.Entry(liner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LinerExists(id))
                {
                    return NotFound($"Liner con ID {id} ya no existe.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/liner/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLiner(int id)
        {
            var liner = await _context.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            _context.Liners.Remove(liner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Método auxiliar para verificar si un Liner existe
        private bool LinerExists(int id)
        {
            return _context.Liners.Any(e => e.IdLiner == id);
        }

        // Método de mapeo manual de Liner a LinerDTO
        private LinerDTO MapToLinerDTO(Liner liner)
        {
            var dto = new LinerDTO
            {
                IdLiner = liner.IdLiner,
                TipoLinerId = liner.TipoLinerId,
                TallaId = liner.TallaId,
                PacienteId = liner.PacienteId
            };

            return dto;
        }
    }
}
