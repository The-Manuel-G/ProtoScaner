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
    public class ComponenteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ComponenteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/componente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComponenteDTO>>> GetComponentes()
        {
            var componentes = await dbContext.Componentes
                .Select(c => new ComponenteDTO
                {
                    ComponentId = c.ComponentId,
                    ComponentTipoId = c.ComponentTipoId,
                    Codigo = c.Codigo,
                    Description = c.Description
                })
                .ToListAsync();

            return Ok(componentes);
        }

        // GET: api/componente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ComponenteDTO>> GetComponente(int id)
        {
            var componente = await dbContext.Componentes.FindAsync(id);
            if (componente == null)
            {
                return NotFound();
            }

            var componenteDTO = new ComponenteDTO
            {
                ComponentId = componente.ComponentId,
                ComponentTipoId = componente.ComponentTipoId,
                Codigo = componente.Codigo,
                Description = componente.Description
            };

            return Ok(componenteDTO);
        }

        // POST: api/componente
        [HttpPost]
        public async Task<ActionResult<ComponenteDTO>> CreateComponente(ComponenteDTO nuevoComponenteDTO)
        {
            var nuevoComponente = new Componente
            {
                ComponentTipoId = nuevoComponenteDTO.ComponentTipoId,
                Codigo = nuevoComponenteDTO.Codigo,
                Description = nuevoComponenteDTO.Description
            };

            dbContext.Componentes.Add(nuevoComponente);
            await dbContext.SaveChangesAsync();

            nuevoComponenteDTO.ComponentId = nuevoComponente.ComponentId;

            return CreatedAtAction(nameof(GetComponente), new { id = nuevoComponente.ComponentId }, nuevoComponenteDTO);
        }

        // PUT: api/componente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateComponente(int id, ComponenteDTO componenteActualizadoDTO)
        {
            var componente = await dbContext.Componentes.FindAsync(id);
            if (componente == null)
            {
                return NotFound();
            }

            componente.ComponentTipoId = componenteActualizadoDTO.ComponentTipoId;
            componente.Codigo = componenteActualizadoDTO.Codigo;
            componente.Description = componenteActualizadoDTO.Description;

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
