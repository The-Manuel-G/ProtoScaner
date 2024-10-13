using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CausaAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public CausaAmputacionController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/causaamputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CausaAmputacion>>> GetCausasAmputacion()
        {
            return Ok(await dbContext.CausaAmputacions.ToListAsync());
        }

        // GET: api/causaamputacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CausaAmputacion>> GetCausaAmputacion(int id)
        {
            var causa = await dbContext.CausaAmputacions.FindAsync(id);
            if (causa == null)
            {
                return NotFound();
            }
            return Ok(causa);
        }

        // POST: api/causaamputacion
        [HttpPost]
        public async Task<ActionResult<CausaAmputacion>> CreateCausaAmputacion(CausaAmputacion nuevaCausa)
        {
            dbContext.CausaAmputacions.Add(nuevaCausa);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCausaAmputacion), new { id = nuevaCausa.IdCausa }, nuevaCausa);
        }

        // PUT: api/causaamputacion/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCausaAmputacion(int id, CausaAmputacion causaActualizada)
        {
            var causa = await dbContext.CausaAmputacions.FindAsync(id);
            if (causa == null)
            {
                return NotFound();
            }

            causa.Descripcion = causaActualizada.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/causaamputacion/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCausaAmputacion(int id)
        {
            var causa = await dbContext.CausaAmputacions.FindAsync(id);
            if (causa == null)
            {
                return NotFound();
            }

            dbContext.CausaAmputacions.Remove(causa);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

