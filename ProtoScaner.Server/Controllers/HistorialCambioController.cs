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
    public class HistorialCambioController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialCambioController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historialcambio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialCambioDTO>>> GetHistorialCambios()
        {
            var historialCambios = await dbContext.HistorialCambios
                .Select(hc => new HistorialCambioDTO
                {
                    IdHistorial = hc.IdHistorial,
                    IdUsuario = hc.IdUsuario,
                    TablaModificada = hc.TablaModificada,
                    IdRegistroModificado = hc.IdRegistroModificado,
                    Operacion = hc.Operacion,
                    ValorAnterior = hc.ValorAnterior,
                    ValorNuevo = hc.ValorNuevo,
                    FechaMidificacion = hc.FechaMidificacion
                })
                .ToListAsync();

            return Ok(historialCambios);
        }

        // GET: api/historialcambio/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialCambioDTO>> GetHistorialCambio(int id)
        {
            var historialCambio = await dbContext.HistorialCambios.FindAsync(id);
            if (historialCambio == null)
            {
                return NotFound();
            }

            var historialCambioDTO = new HistorialCambioDTO
            {
                IdHistorial = historialCambio.IdHistorial,
                IdUsuario = historialCambio.IdUsuario,
                TablaModificada = historialCambio.TablaModificada,
                IdRegistroModificado = historialCambio.IdRegistroModificado,
                Operacion = historialCambio.Operacion,
                ValorAnterior = historialCambio.ValorAnterior,
                ValorNuevo = historialCambio.ValorNuevo,
                FechaMidificacion = historialCambio.FechaMidificacion
            };

            return Ok(historialCambioDTO);
        }

        // POST: api/historialcambio
        [HttpPost]
        public async Task<ActionResult<HistorialCambioDTO>> CreateHistorialCambio(HistorialCambioDTO nuevoHistorialCambioDTO)
        {
            var nuevoHistorialCambio = new HistorialCambio
            {
                IdUsuario = nuevoHistorialCambioDTO.IdUsuario,
                TablaModificada = nuevoHistorialCambioDTO.TablaModificada,
                IdRegistroModificado = nuevoHistorialCambioDTO.IdRegistroModificado,
                Operacion = nuevoHistorialCambioDTO.Operacion,
                ValorAnterior = nuevoHistorialCambioDTO.ValorAnterior,
                ValorNuevo = nuevoHistorialCambioDTO.ValorNuevo,
                FechaMidificacion = nuevoHistorialCambioDTO.FechaMidificacion
            };

            dbContext.HistorialCambios.Add(nuevoHistorialCambio);
            await dbContext.SaveChangesAsync();

            nuevoHistorialCambioDTO.IdHistorial = nuevoHistorialCambio.IdHistorial;

            return CreatedAtAction(nameof(GetHistorialCambio), new { id = nuevoHistorialCambio.IdHistorial }, nuevoHistorialCambioDTO);
        }

        // PUT: api/historialcambio/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialCambio(int id, HistorialCambioDTO historialCambioActualizadoDTO)
        {
            var historialCambio = await dbContext.HistorialCambios.FindAsync(id);
            if (historialCambio == null)
            {
                return NotFound();
            }

            historialCambio.IdUsuario = historialCambioActualizadoDTO.IdUsuario;
            historialCambio.TablaModificada = historialCambioActualizadoDTO.TablaModificada;
            historialCambio.IdRegistroModificado = historialCambioActualizadoDTO.IdRegistroModificado;
            historialCambio.Operacion = historialCambioActualizadoDTO.Operacion;
            historialCambio.ValorAnterior = historialCambioActualizadoDTO.ValorAnterior;
            historialCambio.ValorNuevo = historialCambioActualizadoDTO.ValorNuevo;
            historialCambio.FechaMidificacion = historialCambioActualizadoDTO.FechaMidificacion;

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
