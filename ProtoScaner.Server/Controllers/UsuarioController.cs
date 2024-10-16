using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public UsuarioController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/Usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            var usuarios = await _context.Usuarios
                .Select(u => new UsuarioDTO
                {
                    IdUsuario = u.IdUsuario,
                    NombreUsuario = u.NombreUsuario,
                    Email = u.Email,
                    IdRol = u.IdRol,
                    FechaCreacion = u.FechaCreacion,
                    Activo = u.Activo
                    // Excluye PasswordHash en la respuesta por seguridad
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            var usuarioDTO = new UsuarioDTO
            {
                IdUsuario = usuario.IdUsuario,
                NombreUsuario = usuario.NombreUsuario,
                Email = usuario.Email,
                IdRol = usuario.IdRol,
                FechaCreacion = usuario.FechaCreacion,
                Activo = usuario.Activo
                // Excluye PasswordHash en la respuesta por seguridad
            };

            return usuarioDTO;
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> PostUsuario(UsuarioDTO usuarioDTO)
        {
            var usuario = new Usuario
            {
                NombreUsuario = usuarioDTO.NombreUsuario,
                Email = usuarioDTO.Email,
                PasswordHash = usuarioDTO.PasswordHash,
                IdRol = usuarioDTO.IdRol,
                FechaCreacion = usuarioDTO.FechaCreacion ?? DateOnly.FromDateTime(DateTime.Now),
                Activo = usuarioDTO.Activo ?? true
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            usuarioDTO.IdUsuario = usuario.IdUsuario;

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuarioDTO);
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, UsuarioDTO usuarioDTO)
        {
            if (id != usuarioDTO.IdUsuario)
            {
                return BadRequest();
            }

            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            usuario.NombreUsuario = usuarioDTO.NombreUsuario;
            usuario.Email = usuarioDTO.Email;
            usuario.PasswordHash = usuarioDTO.PasswordHash;
            usuario.IdRol = usuarioDTO.IdRol;
            usuario.Activo = usuarioDTO.Activo;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

