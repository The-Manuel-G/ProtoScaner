using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<Genero>>> GetGeneros()
        {
            return Ok(await dbContext.Generos.ToListAsync());
        }

        // GET: api/genero/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Genero>> GetGenero(int id)
        {
            var genero = await dbContext.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }
            return Ok(genero);
        }

        // POST: api/genero
        [HttpPost]
        public async Task<ActionResult<Genero>> CreateGenero(Genero nuevoGenero)
        {
            dbContext.Generos.Add(nuevoGenero);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGenero), new { id = nuevoGenero.IdGenero }, nuevoGenero);
        }

        // PUT: api/genero/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGenero(int id, Genero generoActualizado)
        {
            var genero = await dbContext.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }

            genero.Genero1 = generoActualizado.Genero1;

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

