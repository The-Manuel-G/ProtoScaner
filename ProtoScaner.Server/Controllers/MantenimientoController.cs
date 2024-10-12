using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MantenimientoController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MantenimientoController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/mantenimiento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mantenimiento>>> GetMantenimientos()
        {
            return Ok(await dbContext.Mantenimientos.ToListAsync());
        }

        // GET: api/mantenimiento/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Mantenimiento>> GetMantenimiento(int id)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }
            return Ok(mantenimiento);
        }

        // POST: api/mantenimiento
        [HttpPost]
        public async Task<ActionResult<Mantenimiento>> CreateMantenimiento(Mantenimiento nuevoMantenimiento)
        {
            dbContext.Mantenimientos.Add(nuevoMantenimiento);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMantenimiento), new { id = nuevoMantenimiento.IdMantenimiento }, nuevoMantenimiento);
        }

        // PUT: api/mantenimiento/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMantenimiento(int id, Mantenimiento mantenimientoActualizado)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }

            mantenimiento.IdPaciente = mantenimientoActualizado.IdPaciente;
            mantenimiento.IdProtesis = mantenimientoActualizado.IdProtesis;
            mantenimiento.FechaMantenimiento = mantenimientoActualizado.FechaMantenimiento;
            mantenimiento.ImagenFallo1 = mantenimientoActualizado.ImagenFallo1;
            mantenimiento.ImagenFallo2 = mantenimientoActualizado.ImagenFallo2;
            mantenimiento.IdSocket = mantenimientoActualizado.IdSocket;
            mantenimiento.NumSocketsFabricados = mantenimientoActualizado.NumSocketsFabricados;
            mantenimiento.NuevasMedidas = mantenimientoActualizado.NuevasMedidas;
            mantenimiento.IdComponentes = mantenimientoActualizado.IdComponentes;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/mantenimiento/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMantenimiento(int id)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }

            dbContext.Mantenimientos.Remove(mantenimiento);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

