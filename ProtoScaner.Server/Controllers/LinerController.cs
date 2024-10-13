using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/liner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Liner>>> GetLiners()
        {
            return Ok(await dbContext.Liners.ToListAsync());
        }

        // GET: api/liner/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Liner>> GetLiner(int id)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }
            return Ok(liner);
        }

        // POST: api/liner
        [HttpPost]
        public async Task<ActionResult<Liner>> CreateLiner(Liner nuevoLiner)
        {
            dbContext.Liners.Add(nuevoLiner);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLiner), new { id = nuevoLiner.IdLiner }, nuevoLiner);
        }

        // PUT: api/liner/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLiner(int id, Liner linerActualizado)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            liner.TipoLiner = linerActualizado.TipoLiner;
            liner.Talla = linerActualizado.Talla;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/liner/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLiner(int id)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            dbContext.Liners.Remove(liner);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

