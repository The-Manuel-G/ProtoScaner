using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TipoAmputacionController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TipoAmputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoAmputacion>>> GetTiposAmputacion()
        {
            return await _context.TipoAmputacions.ToListAsync();
        }

        // GET: api/TipoAmputacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoAmputacion>> GetTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);

            if (tipoAmputacion == null)
            {
                return NotFound();
            }

            return tipoAmputacion;
        }

        // POST: api/TipoAmputacion
        [HttpPost]
        public async Task<ActionResult<TipoAmputacion>> PostTipoAmputacion(TipoAmputacion tipoAmputacion)
        {
            _context.TipoAmputacions.Add(tipoAmputacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoAmputacion", new { id = tipoAmputacion.IdAmputacion }, tipoAmputacion);
        }

        // PUT: api/TipoAmputacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoAmputacion(int id, TipoAmputacion tipoAmputacion)
        {
            if (id != tipoAmputacion.IdAmputacion)
            {
                return BadRequest();
            }

            _context.Entry(tipoAmputacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoAmputacionExists(id))
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

        // DELETE: api/TipoAmputacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);
            if (tipoAmputacion == null)
            {
                return NotFound();
            }

            _context.TipoAmputacions.Remove(tipoAmputacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoAmputacionExists(int id)
        {
            return _context.TipoAmputacions.Any(e => e.IdAmputacion == id);
        }
    }
}

