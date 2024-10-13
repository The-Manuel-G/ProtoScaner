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
    public class LinerTransfemoralController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LinerTransfemoralController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/linertransfemoral
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinerTransfemoralDTO>>> GetLinersTransfemorales()
        {
            var liners = await dbContext.LinerTransfemorals
                .Select(lt => new LinerTransfemoralDTO
                {
                    IdLiner = lt.IdLiner,
                    TipoLinerId = lt.TipoLinerId,
                    TallaId = lt.TallaId
                })
                .ToListAsync();

            return Ok(liners);
        }

        // GET: api/linertransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LinerTransfemoralDTO>> GetLinerTransfemoral(int id)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }

            var linerTransfemoralDTO = new LinerTransfemoralDTO
            {
                IdLiner = linerTransfemoral.IdLiner,
                TipoLinerId = linerTransfemoral.TipoLinerId,
                TallaId = linerTransfemoral.TallaId
            };

            return Ok(linerTransfemoralDTO);
        }

        // POST: api/linertransfemoral
        [HttpPost]
        public async Task<ActionResult<LinerTransfemoralDTO>> CreateLinerTransfemoral(LinerTransfemoralDTO nuevoLinerTransfemoralDTO)
        {
            var nuevoLinerTransfemoral = new LinerTransfemoral
            {
                TipoLinerId = nuevoLinerTransfemoralDTO.TipoLinerId,
                TallaId = nuevoLinerTransfemoralDTO.TallaId
            };

            dbContext.LinerTransfemorals.Add(nuevoLinerTransfemoral);
            await dbContext.SaveChangesAsync();

            nuevoLinerTransfemoralDTO.IdLiner = nuevoLinerTransfemoral.IdLiner;

            return CreatedAtAction(nameof(GetLinerTransfemoral), new { id = nuevoLinerTransfemoral.IdLiner }, nuevoLinerTransfemoralDTO);
        }

        // PUT: api/linertransfemoral/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLinerTransfemoral(int id, LinerTransfemoralDTO linerTransfemoralActualizadoDTO)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }

            linerTransfemoral.TipoLinerId = linerTransfemoralActualizadoDTO.TipoLinerId;
            linerTransfemoral.TallaId = linerTransfemoralActualizadoDTO.TallaId;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/linertransfemoral/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLinerTransfemoral(int id)
        {
            var linerTransfemoral = await dbContext.LinerTransfemorals.FindAsync(id);
            if (linerTransfemoral == null)
            {
                return NotFound();
            }

            dbContext.LinerTransfemorals.Remove(linerTransfemoral);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
