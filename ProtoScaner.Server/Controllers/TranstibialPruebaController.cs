using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranstibialPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public TranstibialPruebaController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/TranstibialPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TranstibialPruebaDTO>>> GetTranstibialPruebas()
        {
            var pruebas = await _context.TranstibialPruebas
                .Select(tp => new TranstibialPruebaDTO
                {
                    IdPrueba = tp.IdPrueba,
                    IdPaciente = tp.IdPaciente,
                    FechaEscaneo = tp.FechaEscaneo,
                    Protesista = tp.Protesista,
                    // Mapea otras propiedades necesarias
                })
                .ToListAsync();

            return Ok(pruebas);
        }

        // GET: api/TranstibialPrueba/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TranstibialPruebaDTO>> GetTranstibialPrueba(int id)
        {
            var prueba = await _context.TranstibialPruebas.FindAsync(id);

            if (prueba == null)
            {
                return NotFound();
            }

            var pruebaDTO = new TranstibialPruebaDTO
            {
                IdPrueba = prueba.IdPrueba,
                IdPaciente = prueba.IdPaciente,
                FechaEscaneo = prueba.FechaEscaneo,
                Protesista = prueba.Protesista,
                // Mapear otras propiedades necesarias
            };

            return pruebaDTO;
        }

        // POST: api/TranstibialPrueba
        [HttpPost]
        public async Task<ActionResult<TranstibialPruebaDTO>> PostTranstibialPrueba(TranstibialPruebaDTO pruebaDTO)
        {
            var prueba = new TranstibialPrueba
            {
                IdPaciente = pruebaDTO.IdPaciente,
                FechaEscaneo = pruebaDTO.FechaEscaneo,
                Protesista = pruebaDTO.Protesista,
                // Mapear otras propiedades necesarias
            };

            _context.TranstibialPruebas.Add(prueba);
            await _context.SaveChangesAsync();

            pruebaDTO.IdPrueba = prueba.IdPrueba;

            return CreatedAtAction(nameof(GetTranstibialPrueba), new { id = prueba.IdPrueba }, pruebaDTO);
        }

        // PUT: api/TranstibialPrueba/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTranstibialPrueba(int id, TranstibialPruebaDTO pruebaDTO)
        {
            if (id != pruebaDTO.IdPrueba)
            {
                return BadRequest();
            }

            var prueba = await _context.TranstibialPruebas.FindAsync(id);
            if (prueba == null)
            {
                return NotFound();
            }

            prueba.IdPaciente = pruebaDTO.IdPaciente;
            prueba.FechaEscaneo = pruebaDTO.FechaEscaneo;
            prueba.Protesista = pruebaDTO.Protesista;
            // Mapear otras propiedades necesarias

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TranstibialPrueba/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTranstibialPrueba(int id)
        {
            var prueba = await _context.TranstibialPruebas.FindAsync(id);
            if (prueba == null)
            {
                return NotFound();
            }

            _context.TranstibialPruebas.Remove(prueba);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}


