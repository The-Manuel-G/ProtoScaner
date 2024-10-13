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
    public class ProvinciumController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProvinciumController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/provincium
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProvinciumDTO>>> GetProvincias()
        {
            var provincias = await dbContext.Provincia
                .Select(p => new ProvinciumDTO
                {
                    IdProvincia = p.IdProvincia,
                    NombreProvincia = p.NombreProvincia
                })
                .ToListAsync();

            return Ok(provincias);
        }

        // GET: api/provincium/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProvinciumDTO>> GetProvincium(int id)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            var provinciaDTO = new ProvinciumDTO
            {
                IdProvincia = provincia.IdProvincia,
                NombreProvincia = provincia.NombreProvincia
            };

            return Ok(provinciaDTO);
        }

        // POST: api/provincium
        [HttpPost]
        public async Task<ActionResult<ProvinciumDTO>> CreateProvincium(ProvinciumDTO nuevaProvinciaDTO)
        {
            var nuevaProvincia = new Provincium
            {
                NombreProvincia = nuevaProvinciaDTO.NombreProvincia
            };

            dbContext.Provincia.Add(nuevaProvincia);
            await dbContext.SaveChangesAsync();

            nuevaProvinciaDTO.IdProvincia = nuevaProvincia.IdProvincia;

            return CreatedAtAction(nameof(GetProvincium), new { id = nuevaProvincia.IdProvincia }, nuevaProvinciaDTO);
        }

        // PUT: api/provincium/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProvincium(int id, ProvinciumDTO provinciaActualizadaDTO)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            provincia.NombreProvincia = provinciaActualizadaDTO.NombreProvincia;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/provincium/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProvincium(int id)
        {
            var provincia = await dbContext.Provincia.FindAsync(id);
            if (provincia == null)
            {
                return NotFound();
            }

            dbContext.Provincia.Remove(provincia);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


