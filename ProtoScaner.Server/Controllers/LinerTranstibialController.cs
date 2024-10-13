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
    public class LinerTranstibialController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerTranstibialController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/linertranstibial
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerTranstibialDTO>>> GetLinersTranstibiales()
        {
            var liners = await dbContext.LinerTranstibials
                .Select(lt => new LinerTranstibialDTO
                {
                    IdLiner = lt.IdLiner,
                    TipoLinerId = lt.TipoLinerId,
                    TallaId = lt.TallaId
                })
                .ToListAsync();

            return Ok(liners);
        }

        // GET: api/linertranstibial/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerTranstibialDTO>> GetLinerTranstibial(int id)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }

            var linerTranstibialDTO = new LinerTranstibialDTO
            {
                IdLiner = linerTranstibial.IdLiner,
                TipoLinerId = linerTranstibial.TipoLinerId,
                TallaId = linerTranstibial.TallaId
            };

            return Ok(linerTranstibialDTO);
        }

        // POST: api/linertranstibial
        [HttpPost]
        public async Task<ActionResult<LinerTranstibialDTO>> CreateLinerTranstibial(LinerTranstibialDTO nuevoLinerTranstibialDTO)
        {
            var nuevoLinerTranstibial = new LinerTranstibial
            {
                TipoLinerId = nuevoLinerTranstibialDTO.TipoLinerId,
                TallaId = nuevoLinerTranstibialDTO.TallaId
            };

            dbContext.LinerTranstibials.Add(nuevoLinerTranstibial);
            await dbContext.SaveChangesAsync();

            nuevoLinerTranstibialDTO.IdLiner = nuevoLinerTranstibial.IdLiner;

            return CreatedAtAction(nameof(GetLinerTranstibial), new { id = nuevoLinerTranstibial.IdLiner }, nuevoLinerTranstibialDTO);
        }

        // PUT: api/linertranstibial/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLinerTranstibial(int id, LinerTranstibialDTO linerTranstibialActualizadoDTO)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }

            linerTranstibial.TipoLinerId = linerTranstibialActualizadoDTO.TipoLinerId;
            linerTranstibial.TallaId = linerTranstibialActualizadoDTO.TallaId;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/linertranstibial/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLinerTranstibial(int id)
        {
            var linerTranstibial = await dbContext.LinerTranstibials.FindAsync(id);
            if (linerTranstibial == null)
            {
                return NotFound();
            }

            dbContext.LinerTranstibials.Remove(linerTranstibial);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


