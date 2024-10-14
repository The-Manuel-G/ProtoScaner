using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

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
        public async Task<ActionResult<IEnumerable<ComponenteTipoDTO>>> GetComponentesTipos()
        {
            var componentesTipos = await dbContext.ComponenteTipos
                .Select(ct => new ComponenteTipoDTO
                {
                    ComponentTipoId = ct.ComponentTipoId,
                    TipoNombre = ct.TipoNombre
                })
                .ToListAsync();

            return Ok(componentesTipos);
        }

        // GET: api/componentetipo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ComponenteTipoDTO>> GetComponenteTipo(int id)
        {
            var componenteTipo = await dbContext.ComponenteTipos.FindAsync(id);
            if (componenteTipo == null)
            {
                return NotFound();
            }

            var componenteTipoDTO = new ComponenteTipoDTO
            {
                ComponentTipoId = componenteTipo.ComponentTipoId,
                TipoNombre = componenteTipo.TipoNombre
            };

            return Ok(componenteTipoDTO);
        }

        // POST: api/componentetipo
        [HttpPost]
        public async Task<ActionResult<ComponenteTipoDTO>> CreateComponenteTipo(ComponenteTipoDTO nuevoComponenteTipoDTO)
        {
            var nuevoComponenteTipo = new ComponenteTipo
            {
                TipoNombre = nuevoComponenteTipoDTO.TipoNombre
            };

            dbContext.ComponenteTipos.Add(nuevoComponenteTipo);
            await dbContext.SaveChangesAsync();

            nuevoComponenteTipoDTO.ComponentTipoId = nuevoComponenteTipo.ComponentTipoId;

            return CreatedAtAction(nameof(GetComponenteTipo), new { id = nuevoComponenteTipo.ComponentTipoId }, nuevoComponenteTipoDTO);
        }

        // PUT: api/componentetipo/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateComponenteTipo(int id, ComponenteTipoDTO componenteTipoActualizadoDTO)
        {
            var componenteTipo = await dbContext.ComponenteTipos.FindAsync(id);
            if (componenteTipo == null)
            {
                return NotFound();
            }

            componenteTipo.TipoNombre = componenteTipoActualizadoDTO.TipoNombre;

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
