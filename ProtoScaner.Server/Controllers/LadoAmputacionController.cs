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
    public class LadoAmputacionController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public LadoAmputacionController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/ladoamputacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LadoAmputacionDTO>>> GetLadosAmputacion()
        {
            var lados = await dbContext.LadoAmputacions
                .Select(la => new LadoAmputacionDTO
                {
                    IdLado = la.IdLado,
                    LadoAmputacion1 = la.LadoAmputacion1
                })
                .ToListAsync();

            return Ok(lados);
        }

        // GET: api/ladoamputacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LadoAmputacionDTO>> GetLadoAmputacion(int id)
        {
            var ladoAmputacion = await dbContext.LadoAmputacions.FindAsync(id);
            if (ladoAmputacion == null)
            {
                return NotFound();
            }

            var ladoAmputacionDTO = new LadoAmputacionDTO
            {
                IdLado = ladoAmputacion.IdLado,
                LadoAmputacion1 = ladoAmputacion.LadoAmputacion1
            };

            return Ok(ladoAmputacionDTO);
        }

        // POST: api/ladoamputacion
        [HttpPost]
        public async Task<ActionResult<LadoAmputacionDTO>> CreateLadoAmputacion(LadoAmputacionDTO nuevoLadoAmputacionDTO)
        {
            var nuevoLadoAmputacion = new LadoAmputacion
            {
                LadoAmputacion1 = nuevoLadoAmputacionDTO.LadoAmputacion1
            };

            dbContext.LadoAmputacions.Add(nuevoLadoAmputacion);
            await dbContext.SaveChangesAsync();

            nuevoLadoAmputacionDTO.IdLado = nuevoLadoAmputacion.IdLado;

            return CreatedAtAction(nameof(GetLadoAmputacion), new { id = nuevoLadoAmputacion.IdLado }, nuevoLadoAmputacionDTO);
        }

        // PUT: api/ladoamputacion/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLadoAmputacion(int id, LadoAmputacionDTO ladoAmputacionActualizadoDTO)
        {
            var ladoAmputacion = await dbContext.LadoAmputacions.FindAsync(id);
            if (ladoAmputacion == null)
            {
                return NotFound();
            }

            ladoAmputacion.LadoAmputacion1 = ladoAmputacionActualizadoDTO.LadoAmputacion1;

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

