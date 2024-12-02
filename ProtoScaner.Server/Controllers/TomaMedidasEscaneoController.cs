using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TomaMedidasEscaneoController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TomaMedidasEscaneoController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TomaMedidasEscaneo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TomaMedidasEscaneoDTO>>> GetTomasMedidasEscaneo()
        {
            var tomasMedidas = await _context.TomaMedidasEscaneos
                .Select(t => new TomaMedidasEscaneoDTO
                {
                    IdEscaneo = t.IdEscaneo,
                    IdPaciente = t.IdPaciente,
                    IdAmputacion = t.IdAmputacion,
                    IdLiner = t.IdLiner,
                    FechaEscaneo = t.FechaEscaneo,
                    Comentario = t.Comentario,
                    ResultadoScaneo = t.ResultadoScaneo
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(tomasMedidas);
        }

        // GET: api/TomaMedidasEscaneo/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TomaMedidasEscaneoDTO>> GetTomaMedidasEscaneo(int id)
        {
            var tomaMedidas = await _context.TomaMedidasEscaneos.FindAsync(id);
            if (tomaMedidas == null) return NotFound();

            var tomaMedidasDTO = new TomaMedidasEscaneoDTO
            {
                IdEscaneo = tomaMedidas.IdEscaneo,
                IdPaciente = tomaMedidas.IdPaciente,
                IdAmputacion = tomaMedidas.IdAmputacion,
                IdLiner = tomaMedidas.IdLiner,
                FechaEscaneo = tomaMedidas.FechaEscaneo,
                Comentario = tomaMedidas.Comentario,
                ResultadoScaneo = tomaMedidas.ResultadoScaneo
            };

            return Ok(tomaMedidasDTO);
        }

        // POST: api/TomaMedidasEscaneo
        [HttpPost]
        public async Task<ActionResult<TomaMedidasEscaneoDTO>> PostTomaMedidasEscaneo(TomaMedidasEscaneoDTO tomaMedidasEscaneoDTO)
        {
            var tomaMedidasEscaneo = new TomaMedidasEscaneo
            {
                IdPaciente = tomaMedidasEscaneoDTO.IdPaciente,
                IdAmputacion = tomaMedidasEscaneoDTO.IdAmputacion,
                IdLiner = tomaMedidasEscaneoDTO.IdLiner,
                FechaEscaneo = tomaMedidasEscaneoDTO.FechaEscaneo,
                Comentario = tomaMedidasEscaneoDTO.Comentario,
                ResultadoScaneo = tomaMedidasEscaneoDTO.ResultadoScaneo
            };

            _context.TomaMedidasEscaneos.Add(tomaMedidasEscaneo);
            await _context.SaveChangesAsync();

            tomaMedidasEscaneoDTO.IdEscaneo = tomaMedidasEscaneo.IdEscaneo;
            return CreatedAtAction(nameof(GetTomaMedidasEscaneo), new { id = tomaMedidasEscaneo.IdEscaneo }, tomaMedidasEscaneoDTO);
        }

        // DELETE: api/TomaMedidasEscaneo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTomaMedidasEscaneo(int id)
        {
            var tomaMedidas = await _context.TomaMedidasEscaneos.FindAsync(id);
            if (tomaMedidas == null) return NotFound();

            _context.TomaMedidasEscaneos.Remove(tomaMedidas);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}