using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.DTOs;
using ProtoScaner.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComentariosController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public ComentariosController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/Comentarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComentarioDto>>> GetComentarios()
        {
            return await _context.Comentarios
                .Select(c => new ComentarioDto
                {
                    IdComentario = c.IdComentario,
                    IdUsuario = c.IdUsuario,
                    IdPaciente = c.IdPaciente,
                    IdTomaMedida = c.IdTomaMedida,
                    IdPruebaSocket = c.IdPruebaSocket,
                    IdMantenimiento = c.IdMantenimiento,
                    IdProtesis = c.IdProtesis,
                    ComentarioTexto = c.Comentario1,
                    FechaComentario = c.FechaComentario
                })
                .ToListAsync();
        }

        // GET: api/Comentarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDto>> GetComentario(int id)
        {
            var comentario = await _context.Comentarios
                .Where(c => c.IdComentario == id)
                .Select(c => new ComentarioDto
                {
                    IdComentario = c.IdComentario,
                    IdUsuario = c.IdUsuario,
                    IdPaciente = c.IdPaciente,
                    IdTomaMedida = c.IdTomaMedida,
                    IdPruebaSocket = c.IdPruebaSocket,
                    IdMantenimiento = c.IdMantenimiento,
                    IdProtesis = c.IdProtesis,
                    ComentarioTexto = c.Comentario1,
                    FechaComentario = c.FechaComentario
                })
                .FirstOrDefaultAsync();

            if (comentario == null)
            {
                return NotFound();
            }

            return comentario;
        }

        // POST: api/Comentarios
        [HttpPost]
        public async Task<ActionResult<ComentarioDto>> CreateComentario(ComentarioDto comentarioDto)
        {
            // Validaciones básicas
            if (string.IsNullOrWhiteSpace(comentarioDto.ComentarioTexto))
            {
                return BadRequest("El campo ComentarioTexto es requerido.");
            }

            // Verificar que las entidades relacionadas existan
            if (!_context.Usuarios.Any(u => u.IdUsuario == comentarioDto.IdUsuario))
            {
                return BadRequest($"Usuario con Id {comentarioDto.IdUsuario} no existe.");
            }

            if (comentarioDto.IdPaciente.HasValue && !_context.Pacientes.Any(p => p.IdPaciente == comentarioDto.IdPaciente.Value))
            {
                return BadRequest($"Paciente con Id {comentarioDto.IdPaciente.Value} no existe.");
            }

            if (comentarioDto.IdProtesis.HasValue && !_context.Protesis.Any(p => p.IdProtesis == comentarioDto.IdProtesis.Value))
            {
                return BadRequest($"Prótesis con Id {comentarioDto.IdProtesis.Value} no existe.");
            }

            if (comentarioDto.IdMantenimiento.HasValue && !_context.Mantenimientos.Any(m => m.IdMantenimiento == comentarioDto.IdMantenimiento.Value))
            {
                return BadRequest($"Mantenimiento con Id {comentarioDto.IdMantenimiento.Value} no existe.");
            }

            if (comentarioDto.IdPruebaSocket.HasValue && !_context.PruebaSockets.Any(ps => ps.IdPrueba == comentarioDto.IdPruebaSocket.Value))
            {
                return BadRequest($"PruebaSocket con Id {comentarioDto.IdPruebaSocket.Value} no existe.");
            }

            if (comentarioDto.IdTomaMedida.HasValue && !_context.TomaMedidasEscaneos.Any(t => t.IdEscaneo == comentarioDto.IdTomaMedida.Value))
            {
                return BadRequest($"TomaMedida con Id {comentarioDto.IdTomaMedida.Value} no existe.");
            }

            var comentario = new Comentario
            {
                IdUsuario = comentarioDto.IdUsuario,
                IdPaciente = comentarioDto.IdPaciente,
                IdTomaMedida = comentarioDto.IdTomaMedida,
                IdPruebaSocket = comentarioDto.IdPruebaSocket,
                IdMantenimiento = comentarioDto.IdMantenimiento,
                IdProtesis = comentarioDto.IdProtesis,
                Comentario1 = comentarioDto.ComentarioTexto,
                FechaComentario = comentarioDto.FechaComentario ?? System.DateTime.Now
            };

            _context.Comentarios.Add(comentario);
            await _context.SaveChangesAsync();

            var createdComentarioDto = new ComentarioDto
            {
                IdComentario = comentario.IdComentario,
                IdUsuario = comentario.IdUsuario,
                IdPaciente = comentario.IdPaciente,
                IdTomaMedida = comentario.IdTomaMedida,
                IdPruebaSocket = comentario.IdPruebaSocket,
                IdMantenimiento = comentario.IdMantenimiento,
                IdProtesis = comentario.IdProtesis,
                ComentarioTexto = comentario.Comentario1,
                FechaComentario = comentario.FechaComentario
            };

            return CreatedAtAction(nameof(GetComentario), new { id = comentario.IdComentario }, createdComentarioDto);
        }

        // PUT: api/Comentarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComentario(int id, ComentarioDto comentarioDto)
        {
            if (id != comentarioDto.IdComentario)
            {
                return BadRequest("El ID en la URL no coincide con el ID en el cuerpo de la solicitud.");
            }

            var comentario = await _context.Comentarios.FindAsync(id);
            if (comentario == null)
            {
                return NotFound($"Comentario con ID {id} no encontrado.");
            }

            comentario.IdUsuario = comentarioDto.IdUsuario;
            comentario.IdPaciente = comentarioDto.IdPaciente;
            comentario.IdTomaMedida = comentarioDto.IdTomaMedida;
            comentario.IdPruebaSocket = comentarioDto.IdPruebaSocket;
            comentario.IdMantenimiento = comentarioDto.IdMantenimiento;
            comentario.IdProtesis = comentarioDto.IdProtesis;
            comentario.Comentario1 = comentarioDto.ComentarioTexto;

            if (comentarioDto.FechaComentario.HasValue)
            {
                comentario.FechaComentario = comentarioDto.FechaComentario.Value;
            }

            _context.Entry(comentario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Comentarios.Any(e => e.IdComentario == id))
                {
                    return NotFound($"Comentario con ID {id} ya no existe.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Comentarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComentario(int id)
        {
            var comentario = await _context.Comentarios.FindAsync(id);
            if (comentario == null)
            {
                return NotFound();
            }

            _context.Comentarios.Remove(comentario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
