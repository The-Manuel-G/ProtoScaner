using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReporteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ReporteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/reporte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reporte>>> GetReportes()
        {
            return Ok(await dbContext.Reportes.Include(r => r.CodigoPacienteNavigation).ToListAsync());
        }

        // GET: api/reporte/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Reporte>> GetReporte(int id)
        {
            var reporte = await dbContext.Reportes
                .Include(r => r.CodigoPacienteNavigation)
                .FirstOrDefaultAsync(r => r.IdReporte == id);

            if (reporte == null)
            {
                return NotFound();
            }
            return Ok(reporte);
        }

        // POST: api/reporte
        [HttpPost]
        public async Task<ActionResult<Reporte>> CreateReporte(Reporte nuevoReporte)
        {
            dbContext.Reportes.Add(nuevoReporte);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReporte), new { id = nuevoReporte.IdReporte }, nuevoReporte);
        }

        // PUT: api/reporte/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReporte(int id, Reporte reporteActualizado)
        {
            var reporte = await dbContext.Reportes.FindAsync(id);
            if (reporte == null)
            {
                return NotFound();
            }

            reporte.CodigoPaciente = reporteActualizado.CodigoPaciente;
            reporte.NumSocketsFabricados = reporteActualizado.NumSocketsFabricados;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/reporte/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReporte(int id)
        {
            var reporte = await dbContext.Reportes.FindAsync(id);
            if (reporte == null)
            {
                return NotFound();
            }

            dbContext.Reportes.Remove(reporte);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


