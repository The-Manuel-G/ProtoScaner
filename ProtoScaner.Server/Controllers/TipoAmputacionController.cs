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
    public class TipoAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TipoAmputacionController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TipoAmputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoAmputacionDTO>>> GetTiposAmputacion()
        {
            var tiposAmputacion = await _context.TipoAmputacions.ToListAsync();

            var tiposAmputacionDTO = tiposAmputacion.Select(t => new TipoAmputacionDTO
            {
                IdTipoAmputacion = t.IdAmputacion,
                Nombre = t.TipoAmputacion1
            }).ToList();

            return Ok(tiposAmputacionDTO);
        }

        // GET: api/TipoAmputacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoAmputacionDTO>> GetTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);

            if (tipoAmputacion == null)
            {
                return NotFound($"Tipo de amputación con ID {id} no encontrado.");
            }

            var tipoAmputacionDTO = new TipoAmputacionDTO
            {
                IdTipoAmputacion = tipoAmputacion.IdAmputacion,
                Nombre = tipoAmputacion.TipoAmputacion1
            };

            return Ok(tipoAmputacionDTO);
        }

        // POST: api/TipoAmputacion
        [HttpPost]
        public async Task<ActionResult<TipoAmputacionDTO>> CreateTipoAmputacion(TipoAmputacionDTO tipoAmputacionDTO)
        {
            if (string.IsNullOrEmpty(tipoAmputacionDTO.Nombre))
            {
                return BadRequest("El nombre del tipo de amputación es requerido.");
            }

            var tipoAmputacion = new TipoAmputacion
            {
                TipoAmputacion1 = tipoAmputacionDTO.Nombre
            };

            _context.TipoAmputacions.Add(tipoAmputacion);
            await _context.SaveChangesAsync();

            tipoAmputacionDTO.IdTipoAmputacion = tipoAmputacion.IdAmputacion;

            return CreatedAtAction(nameof(GetTipoAmputacion), new { id = tipoAmputacion.IdAmputacion }, tipoAmputacionDTO);
        }

        // PUT: api/TipoAmputacion/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTipoAmputacion(int id, TipoAmputacionDTO tipoAmputacionDTO)
        {
            if (id != tipoAmputacionDTO.IdTipoAmputacion)
            {
                return BadRequest("El ID en la URL no coincide con el ID del tipo de amputación.");
            }

            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);
            if (tipoAmputacion == null)
            {
                return NotFound($"Tipo de amputación con ID {id} no encontrado.");
            }

            tipoAmputacion.TipoAmputacion1 = tipoAmputacionDTO.Nombre;

            _context.Entry(tipoAmputacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TipoAmputacions.Any(e => e.IdAmputacion == id))
                {
                    return NotFound($"Tipo de amputación con ID {id} ya no existe.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/TipoAmputacion/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);
            if (tipoAmputacion == null)
            {
                return NotFound($"Tipo de amputación con ID {id} no encontrado.");
            }

            _context.TipoAmputacions.Remove(tipoAmputacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
