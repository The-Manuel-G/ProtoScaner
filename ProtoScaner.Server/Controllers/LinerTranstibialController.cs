using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinerTranstibialController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerTranstibialController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/linertranstibial
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerTranstibial>>> GetLinersTranstibiales()
        {
            return Ok(await dbContext.LinerTranstibials.ToListAsync());
        }

        // GET: api/linertranstibial/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerTranstibial>> GetLinerTranstibial(int id)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }
            return Ok(linerTranstibial);
        }

        // POST: api/linertranstibial
        [HttpPost]
        public async Task<ActionResult<LinerTranstibial>> CreateLinerTranstibial(LinerTranstibial nuevoLinerTranstibial)
        {
            dbContext.LinerTranstibials.Add(nuevoLinerTranstibial);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLinerTranstibial), new { id = nuevoLinerTranstibial.IdLiner }, nuevoLinerTranstibial);
        }

        // PUT: api/linertranstibial/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLinerTranstibial(int id, LinerTranstibial linerTranstibialActualizado)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }

            linerTranstibial.TipoLinerId = linerTranstibialActualizado.TipoLinerId;
            linerTranstibial.TallaId = linerTranstibialActualizado.TallaId;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/linertranstibial/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLinerTranstibial(int id)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }

            dbContext.LinerTranstibials.Remove(linerTranstibial);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

