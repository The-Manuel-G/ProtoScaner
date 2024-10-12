using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComponenteTipoController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ComponenteTipoController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/componentetipo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComponenteTipo>>> GetComponentesTipos()
        {
            return Ok(await dbContext.ComponenteTipos.ToListAsync());
        }

        // GET: api/componentetipo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ComponenteTipo>> GetComponenteTipo(int id)
        {
            var componenteTipo = await dbContext.ComponenteTipos.FindAsync(id);
            if (componenteTipo == null)
            {
                return NotFound();
            }
            return Ok(componenteTipo);
        }

        // POST: api/componentetipo
        [HttpPost]
        public async Task<ActionResult<ComponenteTipo>> CreateComponenteTipo(ComponenteTipo nuevoComponenteTipo)
        {
            dbContext.ComponenteTipos.Add(nuevoComponenteTipo);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComponenteTipo), new { id = nuevoComponenteTipo.ComponentTipoId }, nuevoComponenteTipo);
        }

        // PUT: api/componentetipo/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateComponenteTipo(int id, ComponenteTipo componenteTipoActualizado)
        {
            var componenteTipo = await dbContext.ComponenteTipos.FindAsync(id);
            if (componenteTipo == null)
            {
                return NotFound();
            }

            componenteTipo.TipoNombre = componenteTipoActualizado.TipoNombre;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/componentetipo/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComponenteTipo(int id)
        {
            var componenteTipo = await dbContext.ComponenteTipos.FindAsync(id);
            if (componenteTipo == null)
            {
                return NotFound();
            }

            dbContext.ComponenteTipos.Remove(componenteTipo);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
