using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstatusProtesiController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public EstatusProtesiController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/estatusprotesi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstatusProtesi>>> GetEstatusProtesis()
        {
            return Ok(await dbContext.EstatusProteses.ToListAsync());
        }

        // GET: api/estatusprotesi/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EstatusProtesi>> GetEstatusProtesi(int id)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }
            return Ok(estatusProtesi);
        }

        // POST: api/estatusprotesi
        [HttpPost]
        public async Task<ActionResult<EstatusProtesi>> CreateEstatusProtesi(EstatusProtesi nuevoEstatusProtesi)
        {
            dbContext.EstatusProteses.Add(nuevoEstatusProtesi);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEstatusProtesi), new { id = nuevoEstatusProtesi.IdEstatusProtesis }, nuevoEstatusProtesi);
        }

        // PUT: api/estatusprotesi/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstatusProtesi(int id, EstatusProtesi estatusProtesiActualizado)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }

            estatusProtesi.Descripcion = estatusProtesiActualizado.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/estatusprotesi/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstatusProtesi(int id)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }

            dbContext.EstatusProteses.Remove(estatusProtesi);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

