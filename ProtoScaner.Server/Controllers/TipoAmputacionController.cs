using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TipoAmputacionController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TipoAmputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoAmputacionDTO>>> GetTiposAmputacion()
        {
            var tiposAmputacion = await _context.TipoAmputacions
                .Select(ta => new TipoAmputacionDTO
                {
                    IdAmputacion = ta.IdAmputacion,
                    TipoAmputacion1 = ta.TipoAmputacion1
                })
                .ToListAsync();

            return Ok(tiposAmputacion);
        }

        // GET: api/TipoAmputacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoAmputacionDTO>> GetTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);

            if (tipoAmputacion == null)
            {
                return NotFound();
            }

            var tipoAmputacionDTO = new TipoAmputacionDTO
            {
                IdAmputacion = tipoAmputacion.IdAmputacion,
                TipoAmputacion1 = tipoAmputacion.TipoAmputacion1
            };

            return tipoAmputacionDTO;
        }

        // POST: api/TipoAmputacion
        [HttpPost]
        public async Task<ActionResult<TipoAmputacionDTO>> PostTipoAmputacion(TipoAmputacionDTO tipoAmputacionDTO)
        {
            var tipoAmputacion = new TipoAmputacion
            {
                TipoAmputacion1 = tipoAmputacionDTO.TipoAmputacion1
            };

            _context.TipoAmputacions.Add(tipoAmputacion);
            await _context.SaveChangesAsync();

            tipoAmputacionDTO.IdAmputacion = tipoAmputacion.IdAmputacion;

            return CreatedAtAction("GetTipoAmputacion", new { id = tipoAmputacion.IdAmputacion }, tipoAmputacionDTO);
        }

        // PUT: api/TipoAmputacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoAmputacion(int id, TipoAmputacionDTO tipoAmputacionDTO)
        {
            if (id != tipoAmputacionDTO.IdAmputacion)
            {
                return BadRequest();
            }

            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);
            if (tipoAmputacion == null)
            {
                return NotFound();
            }

            tipoAmputacion.TipoAmputacion1 = tipoAmputacionDTO.TipoAmputacion1;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TipoAmputacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoAmputacion(int id)
        {
            var tipoAmputacion = await _context.TipoAmputacions.FindAsync(id);
            if (tipoAmputacion == null)
            {
                return NotFound();
            }

            _context.TipoAmputacions.Remove(tipoAmputacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoAmputacionExists(int id)
        {
            return _context.TipoAmputacions.Any(e => e.IdAmputacion == id);
        }
    }
}


