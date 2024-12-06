// using statements
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
    public class LinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public LinerController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/liner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerDTO>>> GetLiners()
        {
            var liners = await _context.Liners.ToListAsync();
            var linersDTO = liners.Select(l => new LinerDTO
            {
                IdLiner = l.IdLiner,
                TipoLinerId = l.TipoLinerId,
                TallaId = l.TallaId,
                PacienteId = l.PacienteId
            }).ToList();

            return Ok(linersDTO);
        }

        // GET: api/liner/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerDTO>> GetLiner(int id)
        {
            var liner = await _context.Liners.FindAsync(id);

            if (liner == null)
            {
                return NotFound();
            }

            var linerDTO = new LinerDTO
            {
                IdLiner = liner.IdLiner,
                TipoLinerId = liner.TipoLinerId,
                TallaId = liner.TallaId,
                PacienteId = liner.PacienteId
            };

            return Ok(linerDTO);
        }

        // POST: api/liner
        [HttpPost]
        public async Task<ActionResult<LinerDTO>> CreateLiner(LinerDTO linerDTO)
        {
            var liner = new Liner
            {
                TipoLinerId = linerDTO.TipoLinerId,
                TallaId = linerDTO.TallaId,
                PacienteId = linerDTO.PacienteId
            };

            _context.Liners.Add(liner);
            await _context.SaveChangesAsync();

            linerDTO.IdLiner = liner.IdLiner;

            return CreatedAtAction(nameof(GetLiner), new { id = liner.IdLiner }, linerDTO);
        }

        // PUT: api/liner/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLiner(int id, LinerDTO linerDTO)
        {
            if (id != linerDTO.IdLiner)
            {
                return BadRequest("El ID del liner no coincide.");
            }

            var liner = await _context.Liners.FindAsync(id);

            if (liner == null)
            {
                return NotFound();
            }

            liner.TipoLinerId = linerDTO.TipoLinerId;
            liner.TallaId = linerDTO.TallaId;
            liner.PacienteId = linerDTO.PacienteId;

            _context.Entry(liner).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
