using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistorialPacienteIngresoController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialPacienteIngresoController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historialpacienteingreso
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialPacienteIngreso>>> GetHistorialPacientesIngreso()
        {
            return Ok(await dbContext.HistorialPacienteIngresos.ToListAsync());
        }

        // GET: api/historialpacienteingreso/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialPacienteIngreso>> GetHistorialPacienteIngreso(int id)
        {
            var historialPacienteIngreso = await dbContext.HistorialPacienteIngresos.FindAsync(id);
            if (historialPacienteIngreso == null)
            {
                return NotFound();
            }
            return Ok(historialPacienteIngreso);
        }

        // POST: api/historialpacienteingreso
        [HttpPost]
        public async Task<ActionResult<HistorialPacienteIngreso>> CreateHistorialPacienteIngreso(HistorialPacienteIngreso nuevoHistorialPacienteIngreso)
        {
            dbContext.HistorialPacienteIngresos.Add(nuevoHistorialPacienteIngreso);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHistorialPacienteIngreso), new { id = nuevoHistorialPacienteIngreso.IdHistorial }, nuevoHistorialPacienteIngreso);
        }

        // PUT: api/historialpacienteingreso/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialPacienteIngreso(int id, HistorialPacienteIngreso historialPacienteIngresoActualizado)
        {
            var historialPacienteIngreso = await dbContext.HistorialPacienteIngresos.FindAsync(id);
            if (historialPacienteIngreso == null)
            {
                return NotFound();
            }

            historialPacienteIngreso.IdPaciente = historialPacienteIngresoActualizado.IdPaciente;
            historialPacienteIngreso.TipoAmputacion = historialPacienteIngresoActualizado.TipoAmputacion;
            historialPacienteIngreso.LadoAmputacion = historialPacienteIngresoActualizado.LadoAmputacion;
            historialPacienteIngreso.FechaAmputacion = historialPacienteIngresoActualizado.FechaAmputacion;
            historialPacienteIngreso.Causa = historialPacienteIngresoActualizado.Causa;
            historialPacienteIngreso.Terapia = historialPacienteIngresoActualizado.Terapia;
            historialPacienteIngreso.TiempoTerapia = historialPacienteIngresoActualizado.TiempoTerapia;
            historialPacienteIngreso.IdMedida = historialPacienteIngresoActualizado.IdMedida;
            historialPacienteIngreso.Comentario = historialPacienteIngresoActualizado.Comentario;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/historialpacienteingreso/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistorialPacienteIngreso(int id)
        {
            var historialPacienteIngreso = await dbContext.HistorialPacienteIngresos.FindAsync(id);
            if (historialPacienteIngreso == null)
            {
                return NotFound();
            }

            dbContext.HistorialPacienteIngresos.Remove(historialPacienteIngreso);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

