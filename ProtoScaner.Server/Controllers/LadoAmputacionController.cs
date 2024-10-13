using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LadoAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LadoAmputacionController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/ladoamputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LadoAmputacion>>> GetLadosAmputacion()
        {
            return Ok(await dbContext.LadoAmputacions.ToListAsync());
        }

        // GET: api/ladoamputacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LadoAmputacion>> GetLadoAmputacion(int id)
        {
            var ladoAmputacion = await dbContext.LadoAmputacions.FindAsync(id);
            if (ladoAmputacion == null)
            {
                return NotFound();
            }
            return Ok(ladoAmputacion);
        }

        // POST: api/ladoamputacion
        [HttpPost]
        public async Task<ActionResult<LadoAmputacion>> CreateLadoAmputacion(LadoAmputacion nuevoLadoAmputacion)
        {
            dbContext.LadoAmputacions.Add(nuevoLadoAmputacion);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLadoAmputacion), new { id = nuevoLadoAmputacion.IdLado }, nuevoLadoAmputacion);
        }

        // PUT: api/ladoamputacion/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLadoAmputacion(int id, LadoAmputacion ladoAmputacionActualizado)
        {
            var ladoAmputacion = await dbContext.LadoAmputacions.FindAsync(id);
            if (ladoAmputacion == null)
            {
                return NotFound();
            }

            ladoAmputacion.LadoAmputacion1 = ladoAmputacionActualizado.LadoAmputacion1;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/ladoamputacion/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLadoAmputacion(int id)
        {
            var ladoAmputacion = await dbContext.LadoAmputacions.FindAsync(id);
            if (ladoAmputacion == null)
            {
                return NotFound();
            }

            dbContext.LadoAmputacions.Remove(ladoAmputacion);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

