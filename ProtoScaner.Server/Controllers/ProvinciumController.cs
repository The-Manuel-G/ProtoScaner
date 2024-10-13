using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProvinciumController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProvinciumController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/provincium
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Provincium>>> GetProvincias()
        {
            return Ok(await dbContext.Provincia.ToListAsync());
        }

        // GET: api/provincium/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Provincium>> GetProvincium(int id)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }
            return Ok(provincia);
        }

        // POST: api/provincium
        [HttpPost]
        public async Task<ActionResult<Provincium>> CreateProvincium(Provincium nuevaProvincia)
        {
            dbContext.Provincia.Add(nuevaProvincia);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProvincium), new { id = nuevaProvincia.IdProvincia }, nuevaProvincia);
        }

        // PUT: api/provincium/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProvincium(int id, Provincium provinciaActualizada)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            provincia.NombreProvincia = provinciaActualizada.NombreProvincia;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/provincium/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProvincium(int id)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            dbContext.Provincia.Remove(provincia);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

