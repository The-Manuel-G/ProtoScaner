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
    public class LinerController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/liner
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerDTO>>> GetLiners()
        {
            var liners = await dbContext.Liners
                .Select(l => new LinerDTO
                {
                    IdLiner = l.IdLiner,
                    TipoLiner = l.TipoLiner,
                    Talla = l.Talla
                })
                .ToListAsync();

            return Ok(liners);
        }

        // GET: api/liner/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerDTO>> GetLiner(int id)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            var linerDTO = new LinerDTO
            {
                IdLiner = liner.IdLiner,
                TipoLiner = liner.TipoLiner,
                Talla = liner.Talla
            };

            return Ok(linerDTO);
        }

        // POST: api/liner
        [HttpPost]
        public async Task<ActionResult<LinerDTO>> CreateLiner(LinerDTO nuevoLinerDTO)
        {
            var nuevoLiner = new Liner
            {
                TipoLiner = nuevoLinerDTO.TipoLiner,
                Talla = nuevoLinerDTO.Talla
            };

            dbContext.Liners.Add(nuevoLiner);
            await dbContext.SaveChangesAsync();

            nuevoLinerDTO.IdLiner = nuevoLiner.IdLiner;

            return CreatedAtAction(nameof(GetLiner), new { id = nuevoLiner.IdLiner }, nuevoLinerDTO);
        }

        // PUT: api/liner/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLiner(int id, LinerDTO linerActualizadoDTO)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            liner.TipoLiner = linerActualizadoDTO.TipoLiner;
            liner.Talla = linerActualizadoDTO.Talla;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/liner/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLiner(int id)
        {
            var liner = await dbContext.Liners.FindAsync(id);
            if (liner == null)
            {
                return NotFound();
            }

            dbContext.Liners.Remove(liner);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

