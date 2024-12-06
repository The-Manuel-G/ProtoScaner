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
    public class ProtesisComponenteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProtesisComponenteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/protesisComponente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProtesisComponenteDTO>>> GetProtesisComponentes()
        {
            var componentes = await dbContext.ProtesisComponentes
                .Select(pc => new ProtesisComponenteDTO
                {
                    ProtesisId = pc.ProtesisId,
                    ComponentID = pc.ComponentId,
                    Cantidad = pc.Cantidad
                })
                .ToListAsync();

            return Ok(componentes);
        }

        // GET: api/protesisComponente/{protesisId}/{componentId}
        [HttpGet("{protesisId}/{componentId}")]
        public async Task<ActionResult<ProtesisComponenteDTO>> GetProtesisComponente(int protesisId, int componentId)
        {
            var componente = await dbContext.ProtesisComponentes
                .FirstOrDefaultAsync(pc => pc.ProtesisId == protesisId && pc.ComponentId == componentId);

            if (componente == null)
            {
                return NotFound();
            }

            var componenteDTO = new ProtesisComponenteDTO
            {
                ProtesisId = componente.ProtesisId,
                ComponentID = componente.ComponentId,
                Cantidad = componente.Cantidad
            };

            return Ok(componenteDTO);
        }

        // POST: api/protesisComponente
        [HttpPost]
        public async Task<ActionResult<ProtesisComponenteDTO>> CreateProtesisComponente(ProtesisComponenteDTO nuevoComponenteDTO)
        {
            if (nuevoComponenteDTO.Cantidad.HasValue && nuevoComponenteDTO.Cantidad.Value < 0)
            {
                return BadRequest("La cantidad no puede ser negativa.");
            }

            var nuevoComponente = new ProtesisComponente
            {
                ProtesisId = nuevoComponenteDTO.ProtesisId,
                ComponentId = nuevoComponenteDTO.ComponentID ?? 0, // Usa 0 como predeterminado si ComponentID es null
                Cantidad = nuevoComponenteDTO.Cantidad
            };

            dbContext.ProtesisComponentes.Add(nuevoComponente);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProtesisComponente),
                new { protesisId = nuevoComponente.ProtesisId, componentId = nuevoComponente.ComponentId },
                nuevoComponenteDTO
            );
        }

        // PUT: api/protesisComponente/{protesisId}/{componentId}
        [HttpPut("{protesisId}/{componentId}")]
        public async Task<IActionResult> UpdateProtesisComponente(int protesisId, int componentId, ProtesisComponenteDTO componenteActualizadoDTO)
        {
            if (componenteActualizadoDTO.Cantidad.HasValue && componenteActualizadoDTO.Cantidad.Value < 0)
            {
                return BadRequest("La cantidad no puede ser negativa.");
            }

            var componente = await dbContext.ProtesisComponentes
                .FirstOrDefaultAsync(pc => pc.ProtesisId == protesisId && pc.ComponentId == componentId);

            if (componente == null)
            {
                return NotFound();
            }

            componente.Cantidad = componenteActualizadoDTO.Cantidad;

            dbContext.Entry(componente).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/protesisComponente/{protesisId}/{componentId}
        [HttpDelete("{protesisId}/{componentId}")]
        public async Task<IActionResult> DeleteProtesisComponente(int protesisId, int componentId)
        {
            var componente = await dbContext.ProtesisComponentes
                .FirstOrDefaultAsync(pc => pc.ProtesisId == protesisId && pc.ComponentId == componentId);

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
