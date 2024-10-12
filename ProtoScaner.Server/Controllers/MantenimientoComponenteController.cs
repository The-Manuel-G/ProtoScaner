using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<MantenimientoComponente>>> GetMantenimientosComponentes()
        {
            return Ok(await dbContext.MantenimientoComponentes.ToListAsync());
        }

        // GET: api/mantenimientoComponente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MantenimientoComponente>> GetMantenimientoComponente(int id)
        {
            var mantenimientoComponente = await dbContext.MantenimientoComponentes.FindAsync(id);
            if (mantenimientoComponente == null)
            {
                return NotFound();
            }
            return Ok(mantenimientoComponente);
        }

        // POST: api/mantenimientoComponente
        [HttpPost]
        public async Task<ActionResult<MantenimientoComponente>> CreateMantenimientoComponente(MantenimientoComponente nuevoMantenimientoComponente)
        {
            dbContext.MantenimientoComponentes.Add(nuevoMantenimientoComponente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMantenimientoComponente), new { id = nuevoMantenimientoComponente.MantenimientoId }, nuevoMantenimientoComponente);
        }

        // PUT: api/mantenimientoComponente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMantenimientoComponente(int id, MantenimientoComponente mantenimientoComponenteActualizado)
        {
            var mantenimientoComponente = await dbContext.MantenimientoComponentes.FindAsync(id);
            if (mantenimientoComponente == null)
            {
                return NotFound();
            }

            mantenimientoComponente.Cantidad = mantenimientoComponenteActualizado.Cantidad;
            mantenimientoComponente.IdPaciente = mantenimientoComponenteActualizado.IdPaciente;
            mantenimientoComponente.Insidencia = mantenimientoComponenteActualizado.Insidencia;
            mantenimientoComponente.Medidas = mantenimientoComponenteActualizado.Medidas;

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

