using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TallaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public TallaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/talla
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TallaDTO>>> GetTallas()
        {
            var tallas = await dbContext.Tallas
                .Select(t => new TallaDTO
                {
                    IdTalla = t.IdTalla,
                    TallaNombre = t.TallaNombre
                })
                .ToListAsync();

            return Ok(tallas);
        }

        // GET: api/talla/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TallaDTO>> GetTalla(int id)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            var tallaDTO = new TallaDTO
            {
                IdTalla = talla.IdTalla,
                TallaNombre = talla.TallaNombre
            };

            return Ok(tallaDTO);
        }

        // POST: api/talla
        [HttpPost]
        public async Task<ActionResult<TallaDTO>> CreateTalla(TallaDTO nuevaTallaDTO)
        {
            var nuevaTalla = new Talla
            {
                TallaNombre = nuevaTallaDTO.TallaNombre
            };

            dbContext.Tallas.Add(nuevaTalla);
            await dbContext.SaveChangesAsync();

            nuevaTallaDTO.IdTalla = nuevaTalla.IdTalla;

            return CreatedAtAction(nameof(GetTalla), new { id = nuevaTalla.IdTalla }, nuevaTallaDTO);
        }

        // PUT: api/talla/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTalla(int id, TallaDTO tallaActualizadaDTO)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            talla.TallaNombre = tallaActualizadaDTO.TallaNombre;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/talla/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTalla(int id)
        {
            var talla = await dbContext.Tallas.FindAsync(id);
            if (talla == null)
            {
                return NotFound();
            }

            dbContext.Tallas.Remove(talla);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


