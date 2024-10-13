using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComponenteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ComponenteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/componente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Componente>>> GetComponentes()
        {
            return Ok(await dbContext.Componentes.ToListAsync());
        }

        // GET: api/componente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Componente>> GetComponente(int id)
        {
            var componente = await dbContext.Componentes.FindAsync(id);
            if (componente == null)
            {
                return NotFound();
            }
            return Ok(componente);
        }

        // POST: api/componente
        [HttpPost]
        public async Task<ActionResult<Componente>> CreateComponente(Componente nuevoComponente)
        {
            dbContext.Componentes.Add(nuevoComponente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComponente), new { id = nuevoComponente.ComponentId }, nuevoComponente);
        }

        // PUT: api/componente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateComponente(int id, Componente componenteActualizado)
        {
            var componente = await dbContext.Componentes.FindAsync(id);
            if (componente == null)
            {
                return NotFound();
            }

            componente.ComponentTipoId = componenteActualizado.ComponentTipoId;
            componente.Codigo = componenteActualizado.Codigo;
            componente.Description = componenteActualizado.Description;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/componente/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComponente(int id)
        {
            var componente = await dbContext.Componentes.FindAsync(id);
            if (componente == null)
            {
                return NotFound();
            }

            dbContext.Componentes.Remove(componente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

