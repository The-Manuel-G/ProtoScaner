using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TallaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public TallaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/talla
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Talla>>> GetTallas()
        {
            return Ok(await dbContext.Tallas.ToListAsync());
        }

        // GET: api/talla/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Talla>> GetTalla(int id)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }
            return Ok(talla);
        }

        // POST: api/talla
        [HttpPost]
        public async Task<ActionResult<Talla>> CreateTalla(Talla nuevaTalla)
        {
            dbContext.Tallas.Add(nuevaTalla);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTalla), new { id = nuevaTalla.IdTalla }, nuevaTalla);
        }

        // PUT: api/talla/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTalla(int id, Talla tallaActualizada)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            talla.TallaNombre = tallaActualizada.TallaNombre;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/talla/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTalla(int id)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            dbContext.Tallas.Remove(talla);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

