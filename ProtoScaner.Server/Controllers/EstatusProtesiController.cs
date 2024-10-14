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
    public class EstatusProtesiController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public EstatusProtesiController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/estatusprotesi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstatusProtesiDTO>>> GetEstatusProtesis()
        {
            var estatusProtesis = await dbContext.EstatusProteses
                .Select(ep => new EstatusProtesiDTO
                {
                    IdEstatusProtesis = ep.IdEstatusProtesis,
                    Descripcion = ep.Descripcion
                })
                .ToListAsync();

            return Ok(estatusProtesis);
        }

        // GET: api/estatusprotesi/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EstatusProtesiDTO>> GetEstatusProtesi(int id)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }

            var estatusProtesiDTO = new EstatusProtesiDTO
            {
                IdEstatusProtesis = estatusProtesi.IdEstatusProtesis,
                Descripcion = estatusProtesi.Descripcion
            };

            return Ok(estatusProtesiDTO);
        }

        // POST: api/estatusprotesi
        [HttpPost]
        public async Task<ActionResult<EstatusProtesiDTO>> CreateEstatusProtesi(EstatusProtesiDTO nuevoEstatusProtesiDTO)
        {
            var nuevoEstatusProtesi = new EstatusProtesi
            {
                Descripcion = nuevoEstatusProtesiDTO.Descripcion
            };

            dbContext.EstatusProteses.Add(nuevoEstatusProtesi);
            await dbContext.SaveChangesAsync();

            nuevoEstatusProtesiDTO.IdEstatusProtesis = nuevoEstatusProtesi.IdEstatusProtesis;

            return CreatedAtAction(nameof(GetEstatusProtesi), new { id = nuevoEstatusProtesi.IdEstatusProtesis }, nuevoEstatusProtesiDTO);
        }

        // PUT: api/estatusprotesi/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstatusProtesi(int id, EstatusProtesiDTO estatusProtesiActualizadoDTO)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }

            estatusProtesi.Descripcion = estatusProtesiActualizadoDTO.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/estatusprotesi/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstatusProtesi(int id)
        {
            var estatusProtesi = await dbContext.EstatusProteses.FindAsync(id);
            if (estatusProtesi == null)
            {
                return NotFound();
            }

            dbContext.EstatusProteses.Remove(estatusProtesi);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
