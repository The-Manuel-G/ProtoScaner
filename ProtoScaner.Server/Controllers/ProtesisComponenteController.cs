using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
                    ComponentID = pc.ComponentId, // Verifica que coincida con el DTO
                    Cantidad = pc.Cantidad
                })
                .ToListAsync();

            return Ok(componentes);
        }

        // GET: api/protesisComponente/{protesisId}/{componentId}
        [HttpGet("{protesisId}/{componentId}")]
        public async Task<ActionResult<ProtesisComponenteDTO>> GetProtesisComponente(int protesisId, int componentId)
        {
            var componente = await dbContext.ProtesisComponentes.FindAsync(protesisId, componentId);
            if (componente == null)
            {
                return NotFound();
            }

            var componenteDTO = new ProtesisComponenteDTO
            {
                ProtesisId = componente.ProtesisId,
                ComponentID = componente.ComponentId, // Asegúrate de que coincida con el nombre en el DTO
                Cantidad = componente.Cantidad
            };

            return Ok(componenteDTO);
        }

        // POST: api/protesisComponente
        [HttpPost]
        public async Task<ActionResult<ProtesisComponenteDTO>> CreateProtesisComponente(ProtesisComponenteDTO nuevoComponenteDTO)
        {
            if (nuevoComponenteDTO.Cantidad < 0)
            {
                return BadRequest("La cantidad no puede ser negativa.");
            }

            var nuevoComponente = new ProtesisComponente
            {
                ProtesisId = nuevoComponenteDTO.ProtesisId,
                ComponentId = nuevoComponenteDTO.ComponentID,
                Cantidad = nuevoComponenteDTO.Cantidad
            };

            dbContext.ProtesisComponentes.Add(nuevoComponente);
            await dbContext.SaveChangesAsync();

            nuevoComponenteDTO.ProtesisId = nuevoComponente.ProtesisId;
            nuevoComponenteDTO.ComponentID = nuevoComponente.ComponentId;

            return CreatedAtAction(nameof(GetProtesisComponente), new { protesisId = nuevoComponente.ProtesisId, componentId = nuevoComponente.ComponentId }, nuevoComponenteDTO);
        }

        // PUT: api/protesisComponente/{protesisId}/{componentId}
        [HttpPut("{protesisId}/{componentId}")]
        public async Task<ActionResult> UpdateProtesisComponente(int protesisId, int componentId, ProtesisComponenteDTO componenteActualizadoDTO)
        {
            if (componenteActualizadoDTO.Cantidad < 0)
            {
                return BadRequest("La cantidad no puede ser negativa.");
            }

            var componente = await dbContext.ProtesisComponentes.FindAsync(protesisId, componentId);
            if (componente == null)
            {
                return NotFound();
            }

            componente.Cantidad = componenteActualizadoDTO.Cantidad;

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
