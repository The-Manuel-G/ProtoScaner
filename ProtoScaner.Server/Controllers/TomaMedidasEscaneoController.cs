using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
                .ToListAsync();

            return Ok(tomasMedidas);
        }

        // GET: api/TomaMedidasEscaneo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TomaMedidasEscaneoDTO>> GetTomaMedidasEscaneo(int id)
        {
            var tomaMedidas = await _context.TomaMedidasEscaneos.FindAsync(id);

            if (tomaMedidas == null)
            {
                return NotFound();
            }

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

        // PUT: api/TomaMedidasEscaneo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTomaMedidasEscaneo(int id, TomaMedidasEscaneoDTO tomaMedidasEscaneoDTO)
        {
            if (id != tomaMedidasEscaneoDTO.IdEscaneo)
            {
                return BadRequest();
            }

            var tomaMedidas = await _context.TomaMedidasEscaneos.FindAsync(id);
            if (tomaMedidas == null)
            {
                return NotFound();
            }

            tomaMedidas.IdPaciente = tomaMedidasEscaneoDTO.IdPaciente;
            tomaMedidas.IdAmputacion = tomaMedidasEscaneoDTO.IdAmputacion;
            tomaMedidas.IdLiner = tomaMedidasEscaneoDTO.IdLiner;
            tomaMedidas.FechaEscaneo = tomaMedidasEscaneoDTO.FechaEscaneo;
            tomaMedidas.Comentario = tomaMedidasEscaneoDTO.Comentario;
            tomaMedidas.ResultadoScaneo = tomaMedidasEscaneoDTO.ResultadoScaneo;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TomaMedidasEscaneo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTomaMedidasEscaneo(int id)
        {
            var tomaMedidas = await _context.TomaMedidasEscaneos.FindAsync(id);
            if (tomaMedidas == null)
            {
                return NotFound();
            }

            _context.TomaMedidasEscaneos.Remove(tomaMedidas);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


