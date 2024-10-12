using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TomaMedidasEscaneoController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TomaMedidasEscaneoController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TomaMedidasEscaneo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TomaMedidasEscaneo>>> GetTomasMedidasEscaneo()
        {
            return await _context.TomaMedidasEscaneos.ToListAsync();
        }

        // GET: api/TomaMedidasEscaneo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TomaMedidasEscaneo>> GetTomaMedidasEscaneo(int id)
        {
            var tomaMedidasEscaneo = await _context.TomaMedidasEscaneos.FindAsync(id);

            if (tomaMedidasEscaneo == null)
            {
                return NotFound();
            }

            return tomaMedidasEscaneo;
        }

        // POST: api/TomaMedidasEscaneo
        [HttpPost]
        public async Task<ActionResult<TomaMedidasEscaneo>> PostTomaMedidasEscaneo(TomaMedidasEscaneo tomaMedidasEscaneo)
        {
            _context.TomaMedidasEscaneos.Add(tomaMedidasEscaneo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTomaMedidasEscaneo", new { id = tomaMedidasEscaneo.IdEscaneo }, tomaMedidasEscaneo);
        }

        // PUT: api/TomaMedidasEscaneo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTomaMedidasEscaneo(int id, TomaMedidasEscaneo tomaMedidasEscaneo)
        {
            if (id != tomaMedidasEscaneo.IdEscaneo)
            {
                return BadRequest();
            }

            _context.Entry(tomaMedidasEscaneo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TomaMedidasEscaneoExists(id))
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

        // DELETE: api/TomaMedidasEscaneo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTomaMedidasEscaneo(int id)
        {
            var tomaMedidasEscaneo = await _context.TomaMedidasEscaneos.FindAsync(id);
            if (tomaMedidasEscaneo == null)
            {
                return NotFound();
            }

            _context.TomaMedidasEscaneos.Remove(tomaMedidasEscaneo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TomaMedidasEscaneoExists(int id)
        {
            return _context.TomaMedidasEscaneos.Any(e => e.IdEscaneo == id);
        }
    }
}

