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
    public class TipoLinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TipoLinerController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TipoLiner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoLinerDTO>>> GetTiposLiner()
        {
            var tiposLiner = await _context.TipoLiners
                .Select(tl => new TipoLinerDTO
                {
                    IdTipoLiner = tl.IdTipoLiner,
                    TipoNombre = tl.TipoNombre
                })
                .ToListAsync();

            return Ok(tiposLiner);
        }

        // GET: api/TipoLiner/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoLinerDTO>> GetTipoLiner(int id)
        {
            var tipoLiner = await _context.TipoLiners.FindAsync(id);

            if (tipoLiner == null)
            {
                return NotFound();
            }

            var tipoLinerDTO = new TipoLinerDTO
            {
                IdTipoLiner = tipoLiner.IdTipoLiner,
                TipoNombre = tipoLiner.TipoNombre
            };

            return tipoLinerDTO;
        }

        // POST: api/TipoLiner
        [HttpPost]
        public async Task<ActionResult<TipoLinerDTO>> PostTipoLiner(TipoLinerDTO tipoLinerDTO)
        {
            var tipoLiner = new TipoLiner
            {
                TipoNombre = tipoLinerDTO.TipoNombre
            };

            _context.TipoLiners.Add(tipoLiner);
            await _context.SaveChangesAsync();

            tipoLinerDTO.IdTipoLiner = tipoLiner.IdTipoLiner;

            return CreatedAtAction("GetTipoLiner", new { id = tipoLiner.IdTipoLiner }, tipoLinerDTO);
        }

        // PUT: api/TipoLiner/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoLiner(int id, TipoLinerDTO tipoLinerDTO)
        {
            if (id != tipoLinerDTO.IdTipoLiner)
            {
                return BadRequest();
            }

            var tipoLiner = await _context.TipoLiners.FindAsync(id);
            if (tipoLiner == null)
            {
                return NotFound();
            }

            tipoLiner.TipoNombre = tipoLinerDTO.TipoNombre;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TipoLiner/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoLiner(int id)
        {
            var tipoLiner = await _context.TipoLiners.FindAsync(id);
            if (tipoLiner == null)
            {
                return NotFound();
            }

            _context.TipoLiners.Remove(tipoLiner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoLinerExists(int id)
        {
            return _context.TipoLiners.Any(e => e.IdTipoLiner == id);
        }
    }
}


