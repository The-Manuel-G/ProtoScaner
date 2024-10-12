using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinerTransfemoralController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerTransfemoralController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/linertransfemoral
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerTransfemoral>>> GetLinersTransfemorales()
        {
            return Ok(await dbContext.LinerTransfemorals.ToListAsync());
        }

        // GET: api/linertransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerTransfemoral>> GetLinerTransfemoral(int id)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }
            return Ok(linerTransfemoral);
        }

        // POST: api/linertransfemoral
        [HttpPost]
        public async Task<ActionResult<LinerTransfemoral>> CreateLinerTransfemoral(LinerTransfemoral nuevoLinerTransfemoral)
        {
            dbContext.LinerTransfemorals.Add(nuevoLinerTransfemoral);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLinerTransfemoral), new { id = nuevoLinerTransfemoral.IdLiner }, nuevoLinerTransfemoral);
        }

        // PUT: api/linertransfemoral/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLinerTransfemoral(int id, LinerTransfemoral linerTransfemoralActualizado)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }

            linerTransfemoral.TipoLinerId = linerTransfemoralActualizado.TipoLinerId;
            linerTransfemoral.TallaId = linerTransfemoralActualizado.TallaId;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/linertransfemoral/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLinerTransfemoral(int id)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }

            dbContext.LinerTransfemorals.Remove(linerTransfemoral);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

