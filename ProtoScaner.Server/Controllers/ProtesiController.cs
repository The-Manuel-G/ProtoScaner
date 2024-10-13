using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProtesiController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProtesiController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/protesi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Protesi>>> GetProtesis()
        {
            return Ok(await dbContext.Proteses.ToListAsync());
        }

        // GET: api/protesi/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Protesi>> GetProtesi(int id)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }
            return Ok(protesi);
        }

        // POST: api/protesi
        [HttpPost]
        public async Task<ActionResult<Protesi>> CreateProtesi(Protesi nuevaProtesi)
        {
            dbContext.Proteses.Add(nuevaProtesi);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProtesi), new { id = nuevaProtesi.IdProtesis }, nuevaProtesi);
        }

        // PUT: api/protesi/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProtesi(int id, Protesi protesiActualizada)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }

            protesi.CodigoPaciente = protesiActualizada.CodigoPaciente;
            protesi.LinerTipo = protesiActualizada.LinerTipo;
            protesi.LinerTamano = protesiActualizada.LinerTamano;
            protesi.Protesista = protesiActualizada.Protesista;
            protesi.FechaEntrega = protesiActualizada.FechaEntrega;
            protesi.Material = protesiActualizada.Material;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/protesi/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProtesi(int id)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }

            dbContext.Proteses.Remove(protesi);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

