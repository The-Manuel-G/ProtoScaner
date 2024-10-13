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
    public class MantenimientoComponenteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MantenimientoComponenteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/mantenimientoComponente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MantenimientoComponenteDTO>>> GetMantenimientosComponentes()
        {
            var mantenimientos = await dbContext.MantenimientoComponentes
                .Select(mc => new MantenimientoComponenteDTO
                {
                    ProtesisId = mc.ProtesisId,
                    ComponentId = mc.ComponentId,
                    Cantidad = mc.Cantidad,
                    MantenimientoId = mc.MantenimientoId,
                    IdPaciente = mc.IdPaciente,
                    Insidencia = mc.Insidencia,
                    Medidas = mc.Medidas
                })
                .ToListAsync();

            return Ok(mantenimientos);
        }

        // GET: api/mantenimientoComponente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MantenimientoComponenteDTO>> GetMantenimientoComponente(int id)
        {
            var mantenimientoComponente = await dbContext.MantenimientoComponentes.FindAsync(id);
            if (mantenimientoComponente == null)
            {
                return NotFound();
            }

            var mantenimientoComponenteDTO = new MantenimientoComponenteDTO
            {
                ProtesisId = mantenimientoComponente.ProtesisId,
                ComponentId = mantenimientoComponente.ComponentId,
                Cantidad = mantenimientoComponente.Cantidad,
                MantenimientoId = mantenimientoComponente.MantenimientoId,
                IdPaciente = mantenimientoComponente.IdPaciente,
                Insidencia = mantenimientoComponente.Insidencia,
                Medidas = mantenimientoComponente.Medidas
            };

            return Ok(mantenimientoComponenteDTO);
        }

        // POST: api/mantenimientoComponente
        [HttpPost]
        public async Task<ActionResult<MantenimientoComponenteDTO>> CreateMantenimientoComponente(MantenimientoComponenteDTO nuevoMantenimientoComponenteDTO)
        {
            var nuevoMantenimientoComponente = new MantenimientoComponente
            {
                ProtesisId = nuevoMantenimientoComponenteDTO.ProtesisId,
                ComponentId = nuevoMantenimientoComponenteDTO.ComponentId,
                Cantidad = nuevoMantenimientoComponenteDTO.Cantidad,
                MantenimientoId = nuevoMantenimientoComponenteDTO.MantenimientoId,
                IdPaciente = nuevoMantenimientoComponenteDTO.IdPaciente,
                Insidencia = nuevoMantenimientoComponenteDTO.Insidencia,
                Medidas = nuevoMantenimientoComponenteDTO.Medidas
            };

            dbContext.MantenimientoComponentes.Add(nuevoMantenimientoComponente);
            await dbContext.SaveChangesAsync();

            nuevoMantenimientoComponenteDTO.MantenimientoId = nuevoMantenimientoComponente.MantenimientoId;

            return CreatedAtAction(nameof(GetMantenimientoComponente), new { id = nuevoMantenimientoComponente.MantenimientoId }, nuevoMantenimientoComponenteDTO);
        }

        // PUT: api/mantenimientoComponente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMantenimientoComponente(int id, MantenimientoComponenteDTO mantenimientoComponenteActualizadoDTO)
        {
            var mantenimientoComponente = await dbContext.MantenimientoComponentes.FindAsync(id);
            if (mantenimientoComponente == null)
            {
                return NotFound();
            }

            mantenimientoComponente.Cantidad = mantenimientoComponenteActualizadoDTO.Cantidad;
            mantenimientoComponente.IdPaciente = mantenimientoComponenteActualizadoDTO.IdPaciente;
            mantenimientoComponente.Insidencia = mantenimientoComponenteActualizadoDTO.Insidencia;
            mantenimientoComponente.Medidas = mantenimientoComponenteActualizadoDTO.Medidas;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/mantenimientoComponente/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMantenimientoComponente(int id)
        {
            var mantenimientoComponente = await dbContext.MantenimientoComponentes.FindAsync(id);
            if (mantenimientoComponente == null)
            {
                return NotFound();
            }

            dbContext.MantenimientoComponentes.Remove(mantenimientoComponente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


