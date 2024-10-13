using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProtesisComponenteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProtesisComponenteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/protesisComponente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProtesisComponente>>> GetProtesisComponentes()
        {
            return Ok(await dbContext.ProtesisComponentes.ToListAsync());
        }

        // GET: api/protesisComponente/{protesisId}/{componentId}
        [HttpGet("{protesisId}/{componentId}")]
        public async Task<ActionResult<ProtesisComponente>> GetProtesisComponente(int protesisId, int componentId)
        {
            var protesisComponente = await dbContext.ProtesisComponentes.FindAsync(protesisId, componentId);
            if (protesisComponente == null)
            {
                return NotFound();
            }
            return Ok(protesisComponente);
        }

        // POST: api/protesisComponente
        [HttpPost]
        public async Task<ActionResult<ProtesisComponente>> CreateProtesisComponente(ProtesisComponente nuevoComponente)
        {
            dbContext.ProtesisComponentes.Add(nuevoComponente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProtesisComponente), new { protesisId = nuevoComponente.ProtesisId, componentId = nuevoComponente.ComponentId }, nuevoComponente);
        }

        // PUT: api/protesisComponente/{protesisId}/{componentId}
        [HttpPut("{protesisId}/{componentId}")]
        public async Task<ActionResult> UpdateProtesisComponente(int protesisId, int componentId, ProtesisComponente componenteActualizado)
        {
            var componente = await dbContext.ProtesisComponentes.FindAsync(protesisId, componentId);
            if (componente == null)
            {
                return NotFound();
            }

            componente.Cantidad = componenteActualizado.Cantidad;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/protesisComponente/{protesisId}/{componentId}
        [HttpDelete("{protesisId}/{componentId}")]
        public async Task<ActionResult> DeleteProtesisComponente(int protesisId, int componentId)
        {
            var componente = await dbContext.ProtesisComponentes.FindAsync(protesisId, componentId);
            if (componente == null)
            {
                return NotFound();
            }

            dbContext.ProtesisComponentes.Remove(componente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

