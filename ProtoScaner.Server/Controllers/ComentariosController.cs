using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.DTOs;
using ProtoScaner.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
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
                        ComentarioTexto = c.ComentarioTexto,
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
                        ComentarioTexto = c.ComentarioTexto,
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
            public async Task<ActionResult<Comentario>> CreateComentario(ComentarioDto comentarioDto)
            {
                var comentario = new Comentario
                {
                    IdUsuario = comentarioDto.IdUsuario,
                    IdPaciente = comentarioDto.IdPaciente,
                    IdTomaMedida = comentarioDto.IdTomaMedida,
                    IdPruebaSocket = comentarioDto.IdPruebaSocket,
                    IdMantenimiento = comentarioDto.IdMantenimiento,
                    IdProtesis = comentarioDto.IdProtesis,
                    ComentarioTexto = comentarioDto.ComentarioTexto,
                    FechaComentario = comentarioDto.FechaComentario
                };

                _context.Comentarios.Add(comentario);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetComentario), new { id = comentario.IdComentario }, comentario);
            }

            // PUT: api/Comentarios/5
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateComentario(int id, ComentarioDto comentarioDto)
            {
                if (id != comentarioDto.IdComentario)
                {
                    return BadRequest();
                }

                var comentario = await _context.Comentarios.FindAsync(id);
                if (comentario == null)
                {
                    return NotFound();
                }

                comentario.IdUsuario = comentarioDto.IdUsuario;
                comentario.IdPaciente = comentarioDto.IdPaciente;
                comentario.IdTomaMedida = comentarioDto.IdTomaMedida;
                comentario.IdPruebaSocket = comentarioDto.IdPruebaSocket;
                comentario.IdMantenimiento = comentarioDto.IdMantenimiento;
                comentario.IdProtesis = comentarioDto.IdProtesis;
                comentario.ComentarioTexto = comentarioDto.ComentarioTexto;
                comentario.FechaComentario = comentarioDto.FechaComentario;

                _context.Entry(comentario).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Comentarios.Any(e => e.IdComentario == id))
                    {
                        return NotFound();
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

