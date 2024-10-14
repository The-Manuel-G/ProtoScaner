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
    public class ReporteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ReporteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/reporte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReporteDTO>>> GetReportes()
        {
            var reportes = await dbContext.Reportes
                .Select(r => new ReporteDTO
                {
                    IdReporte = r.IdReporte,
                    CodigoPaciente = r.CodigoPaciente,
                    NumSocketsFabricados = r.NumSocketsFabricados
                })
                .ToListAsync();

            return Ok(reportes);
        }

        // GET: api/reporte/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ReporteDTO>> GetReporte(int id)
        {
            var reporte = await dbContext.Reportes.FindAsync(id);
            if (reporte == null)
            {
                return NotFound();
            }

            var reporteDTO = new ReporteDTO
            {
                IdReporte = reporte.IdReporte,
                CodigoPaciente = reporte.CodigoPaciente,
                NumSocketsFabricados = reporte.NumSocketsFabricados
            };

            return Ok(reporteDTO);
        }

        // POST: api/reporte
        [HttpPost]
        public async Task<ActionResult<ReporteDTO>> CreateReporte(ReporteDTO nuevoReporteDTO)
        {
            var nuevoReporte = new Reporte
            {
                CodigoPaciente = nuevoReporteDTO.CodigoPaciente,
                NumSocketsFabricados = nuevoReporteDTO.NumSocketsFabricados
            };

            dbContext.Reportes.Add(nuevoReporte);
            await dbContext.SaveChangesAsync();

            nuevoReporteDTO.IdReporte = nuevoReporte.IdReporte;

            return CreatedAtAction(nameof(GetReporte), new { id = nuevoReporte.IdReporte }, nuevoReporteDTO);
        }

        // PUT: api/reporte/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReporte(int id, ReporteDTO reporteActualizadoDTO)
        {
            var reporte = await dbContext.Reportes.FindAsync(id);
            if (reporte == null)
            {
                return NotFound();
            }

            reporte.CodigoPaciente = reporteActualizadoDTO.CodigoPaciente;
            reporte.NumSocketsFabricados = reporteActualizadoDTO.NumSocketsFabricados;

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



