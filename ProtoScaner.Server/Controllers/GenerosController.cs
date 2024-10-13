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
    public class GeneroController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public GeneroController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/genero
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeneroDTO>>> GetGeneros()
        {
            var generos = await dbContext.Generos
                .Select(g => new GeneroDTO
                {
                    IdGenero = g.IdGenero,
                    Genero1 = g.Genero1
                })
                .ToListAsync();

            return Ok(generos);
        }

        // GET: api/genero/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GeneroDTO>> GetGenero(int id)
        {
            var genero = await dbContext.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }

            var generoDTO = new GeneroDTO
            {
                IdGenero = genero.IdGenero,
                Genero1 = genero.Genero1
            };

            return Ok(generoDTO);
        }

        // POST: api/genero
        [HttpPost]
        public async Task<ActionResult<GeneroDTO>> CreateGenero(GeneroDTO nuevoGeneroDTO)
        {
            var nuevoGenero = new Genero
            {
                Genero1 = nuevoGeneroDTO.Genero1
            };

            dbContext.Generos.Add(nuevoGenero);
            await dbContext.SaveChangesAsync();

            nuevoGeneroDTO.IdGenero = nuevoGenero.IdGenero;

            return CreatedAtAction(nameof(GetGenero), new { id = nuevoGenero.IdGenero }, nuevoGeneroDTO);
        }

        // PUT: api/genero/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGenero(int id, GeneroDTO generoActualizadoDTO)
        {
            var genero = await dbContext.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }

            genero.Genero1 = generoActualizadoDTO.Genero1;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/genero/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGenero(int id)
        {
            var genero = await dbContext.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }

            dbContext.Generos.Remove(genero);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

