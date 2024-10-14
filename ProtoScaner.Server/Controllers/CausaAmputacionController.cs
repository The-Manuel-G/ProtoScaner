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
    public class CausaAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public CausaAmputacionController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/causaamputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CausaAmputacionDTO>>> GetCausasAmputacion()
        {
            var causas = await dbContext.CausaAmputacions
                .Select(c => new CausaAmputacionDTO
                {
                    IdCausa = c.IdCausa,
                    Descripcion = c.Descripcion
                })
                .ToListAsync();

            return Ok(causas);
        }

        // GET: api/causaamputacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CausaAmputacionDTO>> GetCausaAmputacion(int id)
        {
            var causa = await dbContext.CausaAmputacions.FindAsync(id);

            if (causa == null)
            {
                return NotFound();
            }

            var causaDTO = new CausaAmputacionDTO
            {
                IdCausa = causa.IdCausa,
                Descripcion = causa.Descripcion
            };

            return Ok(causaDTO);
        }

        // POST: api/causaamputacion
        [HttpPost]
        public async Task<ActionResult<CausaAmputacionDTO>> CreateCausaAmputacion(CausaAmputacionDTO nuevaCausaDTO)
        {
            var nuevaCausa = new CausaAmputacion
            {
                Descripcion = nuevaCausaDTO.Descripcion
            };

            dbContext.CausaAmputacions.Add(nuevaCausa);
            await dbContext.SaveChangesAsync();

            nuevaCausaDTO.IdCausa = nuevaCausa.IdCausa;

            return CreatedAtAction(nameof(GetCausaAmputacion), new { id = nuevaCausa.IdCausa }, nuevaCausaDTO);
        }

        // PUT: api/causaamputacion/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCausaAmputacion(int id, CausaAmputacionDTO causaActualizadaDTO)
        {
            var causa = await dbContext.CausaAmputacions.FindAsync(id);

            if (causa == null)
            {
                return NotFound();
            }

            causa.Descripcion = causaActualizadaDTO.Descripcion;

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



