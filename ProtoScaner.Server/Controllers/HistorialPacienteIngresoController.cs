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
    public class HistorialPacienteIngresoController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialPacienteIngresoController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historialpacienteingreso
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialPacienteIngresoDTO>>> GetHistorialPacientesIngreso()
        {
            var historialPacientesIngreso = await dbContext.HistorialPacienteIngresos
                .Select(hpi => new HistorialPacienteIngresoDTO
                {
                    IdHistorial = hpi.IdHistorial,
                    IdPaciente = hpi.IdPaciente,
                    TipoAmputacion = hpi.TipoAmputacion,
                    LadoAmputacion = hpi.LadoAmputacion,
                    FechaAmputacion = hpi.FechaAmputacion,
                    Causa = hpi.Causa,
                    Terapia = hpi.Terapia,
                    TiempoTerapia = hpi.TiempoTerapia,
                    IdMedida = hpi.IdMedida,
                    Comentario = hpi.Comentario
                })
                .ToListAsync();

            return Ok(historialPacientesIngreso);
        }

        // GET: api/historialpacienteingreso/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialPacienteIngresoDTO>> GetHistorialPacienteIngreso(int id)
        {
            var historialPacienteIngreso = await dbContext.HistorialPacienteIngresos.FindAsync(id);
            if (historialPacienteIngreso == null)
            {
                return NotFound();
            }

            var historialPacienteIngresoDTO = new HistorialPacienteIngresoDTO
            {
                IdHistorial = historialPacienteIngreso.IdHistorial,
                IdPaciente = historialPacienteIngreso.IdPaciente,
                TipoAmputacion = historialPacienteIngreso.TipoAmputacion,
                LadoAmputacion = historialPacienteIngreso.LadoAmputacion,
                FechaAmputacion = historialPacienteIngreso.FechaAmputacion,
                Causa = historialPacienteIngreso.Causa,
                Terapia = historialPacienteIngreso.Terapia,
                TiempoTerapia = historialPacienteIngreso.TiempoTerapia,
                IdMedida = historialPacienteIngreso.IdMedida,
                Comentario = historialPacienteIngreso.Comentario
            };

            return Ok(historialPacienteIngresoDTO);
        }

        // POST: api/historialpacienteingreso
        [HttpPost]
        public async Task<ActionResult<HistorialPacienteIngresoDTO>> CreateHistorialPacienteIngreso(HistorialPacienteIngresoDTO nuevoHistorialPacienteIngresoDTO)
        {
            var nuevoHistorialPacienteIngreso = new HistorialPacienteIngreso
            {
                IdPaciente = nuevoHistorialPacienteIngresoDTO.IdPaciente,
                TipoAmputacion = nuevoHistorialPacienteIngresoDTO.TipoAmputacion,
                LadoAmputacion = nuevoHistorialPacienteIngresoDTO.LadoAmputacion,
                FechaAmputacion = nuevoHistorialPacienteIngresoDTO.FechaAmputacion,
                Causa = nuevoHistorialPacienteIngresoDTO.Causa,
                Terapia = nuevoHistorialPacienteIngresoDTO.Terapia,
                TiempoTerapia = nuevoHistorialPacienteIngresoDTO.TiempoTerapia,
                IdMedida = nuevoHistorialPacienteIngresoDTO.IdMedida,
                Comentario = nuevoHistorialPacienteIngresoDTO.Comentario
            };

            dbContext.HistorialPacienteIngresos.Add(nuevoHistorialPacienteIngreso);
            await dbContext.SaveChangesAsync();

            nuevoHistorialPacienteIngresoDTO.IdHistorial = nuevoHistorialPacienteIngreso.IdHistorial;

            return CreatedAtAction(nameof(GetHistorialPacienteIngreso), new { id = nuevoHistorialPacienteIngreso.IdHistorial }, nuevoHistorialPacienteIngresoDTO);
        }

        // PUT: api/historialpacienteingreso/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialPacienteIngreso(int id, HistorialPacienteIngresoDTO historialPacienteIngresoActualizadoDTO)
        {
            var historialPacienteIngreso = await dbContext.HistorialPacienteIngresos.FindAsync(id);
            if (historialPacienteIngreso == null)
            {
                return NotFound();
            }

            historialPacienteIngreso.IdPaciente = historialPacienteIngresoActualizadoDTO.IdPaciente;
            historialPacienteIngreso.TipoAmputacion = historialPacienteIngresoActualizadoDTO.TipoAmputacion;
            historialPacienteIngreso.LadoAmputacion = historialPacienteIngresoActualizadoDTO.LadoAmputacion;
            historialPacienteIngreso.FechaAmputacion = historialPacienteIngresoActualizadoDTO.FechaAmputacion;
            historialPacienteIngreso.Causa = historialPacienteIngresoActualizadoDTO.Causa;
            historialPacienteIngreso.Terapia = historialPacienteIngresoActualizadoDTO.Terapia;
            historialPacienteIngreso.TiempoTerapia = historialPacienteIngresoActualizadoDTO.TiempoTerapia;
            historialPacienteIngreso.IdMedida = historialPacienteIngresoActualizadoDTO.IdMedida;
            historialPacienteIngreso.Comentario = historialPacienteIngresoActualizadoDTO.Comentario;

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


        // GET: api/historialpacienteingreso/paciente/{pacienteId}
        [HttpGet("paciente/{pacienteId}")]
        public async Task<ActionResult<IEnumerable<HistorialPacienteIngresoDTO>>> GetHistorialByPacienteId(int pacienteId)
        {
            var historiales = await dbContext.HistorialPacienteIngresos
                .Where(h => h.IdPaciente == pacienteId)
                .Select(hpi => new HistorialPacienteIngresoDTO
                {
                    IdHistorial = hpi.IdHistorial,
                    IdPaciente = hpi.IdPaciente,
                    TipoAmputacion = hpi.TipoAmputacion,
                    LadoAmputacion = hpi.LadoAmputacion,
                    FechaAmputacion = hpi.FechaAmputacion,
                    Causa = hpi.Causa,
                    Terapia = hpi.Terapia,
                    TiempoTerapia = hpi.TiempoTerapia,
                    IdMedida = hpi.IdMedida,
                    Comentario = hpi.Comentario
                })
                .ToListAsync();

            if (historiales == null || historiales.Count == 0)
            {
                return NotFound("No se encontró historial para el paciente especificado.");
            }

            return Ok(historiales);
        }

    }
}

