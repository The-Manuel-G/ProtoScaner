using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.DTOs;
using ProtoScaner.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TallasController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TallasController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/Tallas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TallaDto>>> GetTallas()
        {
            return await _context.Tallas
                .Select(t => new TallaDto
                {
                    IdTalla = t.IdTalla,
                    TallaNombre = t.TallaNombre,
                    TipoAmputacionId = t.TipoAmputacionId,
                    PacienteId = t.PacienteId
                })
                .ToListAsync();
        }

        // GET: api/Tallas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TallaDto>> GetTalla(int id)
        {
            var talla = await _context.Tallas
                .Where(t => t.IdTalla == id)
                .Select(t => new TallaDto
                {
                    IdTalla = t.IdTalla,
                    TallaNombre = t.TallaNombre,
                    TipoAmputacionId = t.TipoAmputacionId,
                    PacienteId = t.PacienteId
                })
                .FirstOrDefaultAsync();

            if (talla == null)
            {
                return NotFound();
            }

            return talla;
        }

        // GET: api/Tallas/tipo/{tipoAmputacionId}
        [HttpGet("tipo/{tipoAmputacionId}")]
        public async Task<ActionResult<IEnumerable<TallaDto>>> GetTallasPorTipoAmputacion(int tipoAmputacionId)
        {
            var tallas = await _context.Tallas
                .Where(t => t.TipoAmputacionId == tipoAmputacionId)
                .Select(t => new TallaDto
                {
                    IdTalla = t.IdTalla,
                    TallaNombre = t.TallaNombre,
                    TipoAmputacionId = t.TipoAmputacionId,
                    PacienteId = t.PacienteId
                })
                .ToListAsync();

            if (tallas == null || !tallas.Any())
            {
                return NotFound($"No se encontraron tallas para el TipoAmputacionId {tipoAmputacionId}");
            }

            return tallas;
        }

        // POST: api/Tallas
        [HttpPost]
        public async Task<ActionResult<TallaDto>> CreateTalla(TallaDto tallaDto)
        {
            if (string.IsNullOrWhiteSpace(tallaDto.TallaNombre))
            {
                return BadRequest("El nombre de la talla es requerido.");
            }

            var talla = new Talla
            {
                TallaNombre = tallaDto.TallaNombre,
                TipoAmputacionId = tallaDto.TipoAmputacionId,
                PacienteId = tallaDto.PacienteId
            };

            _context.Tallas.Add(talla);
            await _context.SaveChangesAsync();

            tallaDto.IdTalla = talla.IdTalla;

            return CreatedAtAction(nameof(GetTalla), new { id = talla.IdTalla }, tallaDto);
        }

        // PUT: api/Tallas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTalla(int id, TallaDto tallaDto)
        {
            if (id != tallaDto.IdTalla)
            {
                return BadRequest("El ID en la URL no coincide con el ID de la solicitud.");
            }

            var talla = await _context.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            talla.TallaNombre = tallaDto.TallaNombre;
            talla.TipoAmputacionId = tallaDto.TipoAmputacionId;
            talla.PacienteId = tallaDto.PacienteId;

            _context.Entry(talla).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Tallas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalla(int id)
        {
            var talla = await _context.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            _context.Tallas.Remove(talla);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
