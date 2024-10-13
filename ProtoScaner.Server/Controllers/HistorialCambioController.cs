using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistorialCambioController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialCambioController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historialcambio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialCambio>>> GetHistorialCambios()
        {
            return Ok(await dbContext.HistorialCambios.ToListAsync());
        }

        // GET: api/historialcambio/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialCambio>> GetHistorialCambio(int id)
        {
            var historialCambio = await dbContext.HistorialCambios.FindAsync(id);
            if (historialCambio == null)
            {
                return NotFound();
            }
            return Ok(historialCambio);
        }

        // POST: api/historialcambio
        [HttpPost]
        public async Task<ActionResult<HistorialCambio>> CreateHistorialCambio(HistorialCambio nuevoHistorialCambio)
        {
            dbContext.HistorialCambios.Add(nuevoHistorialCambio);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHistorialCambio), new { id = nuevoHistorialCambio.IdHistorial }, nuevoHistorialCambio);
        }

        // PUT: api/historialcambio/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialCambio(int id, HistorialCambio historialCambioActualizado)
        {
            var historialCambio = await dbContext.HistorialCambios.FindAsync(id);
            if (historialCambio == null)
            {
                return NotFound();
            }

            historialCambio.IdUsuario = historialCambioActualizado.IdUsuario;
            historialCambio.TablaModificada = historialCambioActualizado.TablaModificada;
            historialCambio.IdRegistroModificado = historialCambioActualizado.IdRegistroModificado;
            historialCambio.Operacion = historialCambioActualizado.Operacion;
            historialCambio.ValorAnterior = historialCambioActualizado.ValorAnterior;
            historialCambio.ValorNuevo = historialCambioActualizado.ValorNuevo;
            historialCambio.FechaMidificacion = historialCambioActualizado.FechaMidificacion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/historialcambio/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistorialCambio(int id)
        {
            var historialCambio = await dbContext.HistorialCambios.FindAsync(id);
            if (historialCambio == null)
            {
                return NotFound();
            }

            dbContext.HistorialCambios.Remove(historialCambio);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

