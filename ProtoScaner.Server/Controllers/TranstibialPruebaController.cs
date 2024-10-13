using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranstibialPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TranstibialPruebaController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TranstibialPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TranstibialPrueba>>> GetTranstibialPruebas()
        {
            return await _context.TranstibialPruebas.ToListAsync();
        }

        // GET: api/TranstibialPrueba/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TranstibialPrueba>> GetTranstibialPrueba(int id)
        {
            var transtibialPrueba = await _context.TranstibialPruebas.FindAsync(id);

            if (transtibialPrueba == null)
            {
                return NotFound();
            }

            return transtibialPrueba;
        }

        // POST: api/TranstibialPrueba
        [HttpPost]
        public async Task<ActionResult<TranstibialPrueba>> PostTranstibialPrueba(TranstibialPrueba transtibialPrueba)
        {
            _context.TranstibialPruebas.Add(transtibialPrueba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTranstibialPrueba", new { id = transtibialPrueba.IdPrueba }, transtibialPrueba);
        }

        // PUT: api/TranstibialPrueba/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranstibialPrueba(int id, TranstibialPrueba transtibialPrueba)
        {
            if (id != transtibialPrueba.IdPrueba)
            {
                return BadRequest();
            }

            _context.Entry(transtibialPrueba).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TranstibialPruebaExists(id))
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

        // DELETE: api/TranstibialPrueba/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranstibialPrueba(int id)
        {
            var transtibialPrueba = await _context.TranstibialPruebas.FindAsync(id);
            if (transtibialPrueba == null)
            {
                return NotFound();
            }

            _context.TranstibialPruebas.Remove(transtibialPrueba);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TranstibialPruebaExists(int id)
        {
            return _context.TranstibialPruebas.Any(e => e.IdPrueba == id);
        }
    }
}

