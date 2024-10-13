using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoLinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TipoLinerController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TipoLiner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoLiner>>> GetTiposLiner()
        {
            return await _context.TipoLiners.ToListAsync();
        }

        // GET: api/TipoLiner/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoLiner>> GetTipoLiner(int id)
        {
            var tipoLiner = await _context.TipoLiners.FindAsync(id);

            if (tipoLiner == null)
            {
                return NotFound();
            }

            return tipoLiner;
        }

        // POST: api/TipoLiner
        [HttpPost]
        public async Task<ActionResult<TipoLiner>> PostTipoLiner(TipoLiner tipoLiner)
        {
            _context.TipoLiners.Add(tipoLiner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoLiner", new { id = tipoLiner.IdTipoLiner }, tipoLiner);
        }

        // PUT: api/TipoLiner/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoLiner(int id, TipoLiner tipoLiner)
        {
            if (id != tipoLiner.IdTipoLiner)
            {
                return BadRequest();
            }

            _context.Entry(tipoLiner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoLinerExists(id))
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

        // DELETE: api/TipoLiner/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoLiner(int id)
        {
            var tipoLiner = await _context.TipoLiners.FindAsync(id);
            if (tipoLiner == null)
            {
                return NotFound();
            }

            _context.TipoLiners.Remove(tipoLiner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoLinerExists(int id)
        {
            return _context.TipoLiners.Any(e => e.IdTipoLiner == id);
        }
    }
}

