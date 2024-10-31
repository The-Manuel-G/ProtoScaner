using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System.Security.Cryptography;
using System.Text;

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
                .Include(u => u.ImagenPerfils)
                .Select(u => new UsuarioDTO
                {
                    IdUsuario = u.IdUsuario,
                    NombreUsuario = u.NombreUsuario,
                    Email = u.Email,
                    IdRol = u.IdRol,
                    FechaCreacion = u.FechaCreacion,
                    Activo = u.Activo,
                    ImagenPerfil = u.ImagenPerfils.Select(i => new ImagenPerfilDTO
                    {
                        IdImagen = i.IdImagen,
                        IdUsuario = i.IdUsuario,
                        Imagen = i.Imagen != null ? Convert.ToBase64String(i.Imagen) : null,
                        Descripcion = i.Descripcion
                    }).FirstOrDefault()
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.ImagenPerfils)
                .SingleOrDefaultAsync(u => u.IdUsuario == id);

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
                Activo = usuario.Activo,
                ImagenPerfil = usuario.ImagenPerfils.Select(i => new ImagenPerfilDTO
                {
                    IdImagen = i.IdImagen,
                    IdUsuario = i.IdUsuario,
                    Imagen = i.Imagen != null ? Convert.ToBase64String(i.Imagen) : null,
                    Descripcion = i.Descripcion
                }).FirstOrDefault()
            };

            return usuarioDTO;
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<ActionResult<UsuarioDTO>> PostUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            if (string.IsNullOrEmpty(usuarioDTO.NombreUsuario) ||
                string.IsNullOrEmpty(usuarioDTO.Email) ||
                string.IsNullOrEmpty(usuarioDTO.PasswordHash))
            {
                return BadRequest(new { message = "NombreUsuario, Email y PasswordHash son requeridos." });
            }

            var usuario = new Usuario
            {
                NombreUsuario = usuarioDTO.NombreUsuario,
                Email = usuarioDTO.Email,
                PasswordHash = HashPassword(usuarioDTO.PasswordHash),
                IdRol = usuarioDTO.IdRol,
                FechaCreacion = usuarioDTO.FechaCreacion ?? DateOnly.FromDateTime(DateTime.Now),
                Activo = usuarioDTO.Activo ?? true
            };

            if (usuarioDTO.ImagenPerfil != null && !string.IsNullOrEmpty(usuarioDTO.ImagenPerfil.Imagen))
            {
                try
                {
                    usuario.ImagenPerfils.Add(new ImagenPerfil
                    {
                        Imagen = Convert.FromBase64String(usuarioDTO.ImagenPerfil.Imagen),
                        Descripcion = usuarioDTO.ImagenPerfil.Descripcion
                    });
                }
                catch (FormatException)
                {
                    return BadRequest(new { message = "La imagen de perfil no tiene un formato Base64 válido." });
                }
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            usuarioDTO.IdUsuario = usuario.IdUsuario;

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.IdUsuario }, usuarioDTO);
        }

        // PUT: api/Usuario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, [FromBody] UsuarioDTO usuarioDTO)
        {
            if (id != usuarioDTO.IdUsuario)
            {
                return BadRequest();
            }

            var usuario = await _context.Usuarios.Include(u => u.ImagenPerfils).SingleOrDefaultAsync(u => u.IdUsuario == id);
            if (usuario == null)
            {
                return NotFound();
            }

            usuario.NombreUsuario = usuarioDTO.NombreUsuario;
            usuario.Email = usuarioDTO.Email;

            if (!string.IsNullOrEmpty(usuarioDTO.PasswordHash))
            {
                usuario.PasswordHash = HashPassword(usuarioDTO.PasswordHash);
            }

            usuario.IdRol = usuarioDTO.IdRol;
            usuario.Activo = usuarioDTO.Activo;

            if (usuarioDTO.ImagenPerfil != null && !string.IsNullOrEmpty(usuarioDTO.ImagenPerfil.Imagen))
            {
                var imagenPerfil = usuario.ImagenPerfils.FirstOrDefault();
                if (imagenPerfil != null)
                {
                    imagenPerfil.Imagen = Convert.FromBase64String(usuarioDTO.ImagenPerfil.Imagen);
                    imagenPerfil.Descripcion = usuarioDTO.ImagenPerfil.Descripcion;
                }
                else
                {
                    usuario.ImagenPerfils.Add(new ImagenPerfil
                    {
                        Imagen = Convert.FromBase64String(usuarioDTO.ImagenPerfil.Imagen),
                        Descripcion = usuarioDTO.ImagenPerfil.Descripcion
                    });
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.Include(u => u.ImagenPerfils).SingleOrDefaultAsync(u => u.IdUsuario == id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string HashPassword(string password)
        {
            using var hmac = new HMACSHA512();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashedPassword = hmac.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashedPassword);
        }
    }
}
