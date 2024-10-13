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
    public class ImagenPerfilController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ImagenPerfilController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/imagenperfil
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImagenPerfilDTO>>> GetImagenesPerfil()
        {
            var imagenes = await dbContext.ImagenPerfils
                .Select(ip => new ImagenPerfilDTO
                {
                    IdImagen = ip.IdImagen,
                    IdUsuario = ip.IdUsuario,
                    Imagen = ip.Imagen,
                    Descripcion = ip.Descripcion
                })
                .ToListAsync();

            return Ok(imagenes);
        }

        // GET: api/imagenperfil/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ImagenPerfilDTO>> GetImagenPerfil(int id)
        {
            var imagenPerfil = await dbContext.ImagenPerfils.FindAsync(id);
            if (imagenPerfil == null)
            {
                return NotFound();
            }

            var imagenPerfilDTO = new ImagenPerfilDTO
            {
                IdImagen = imagenPerfil.IdImagen,
                IdUsuario = imagenPerfil.IdUsuario,
                Imagen = imagenPerfil.Imagen,
                Descripcion = imagenPerfil.Descripcion
            };

            return Ok(imagenPerfilDTO);
        }

        // POST: api/imagenperfil
        [HttpPost]
        public async Task<ActionResult<ImagenPerfilDTO>> CreateImagenPerfil(ImagenPerfilDTO nuevaImagenPerfilDTO)
        {
            var nuevaImagenPerfil = new ImagenPerfil
            {
                IdUsuario = nuevaImagenPerfilDTO.IdUsuario,
                Imagen = nuevaImagenPerfilDTO.Imagen,
                Descripcion = nuevaImagenPerfilDTO.Descripcion
            };

            dbContext.ImagenPerfils.Add(nuevaImagenPerfil);
            await dbContext.SaveChangesAsync();

            nuevaImagenPerfilDTO.IdImagen = nuevaImagenPerfil.IdImagen;

            return CreatedAtAction(nameof(GetImagenPerfil), new { id = nuevaImagenPerfil.IdImagen }, nuevaImagenPerfilDTO);
        }

        // PUT: api/imagenperfil/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateImagenPerfil(int id, ImagenPerfilDTO imagenPerfilActualizadaDTO)
        {
            var imagenPerfil = await dbContext.ImagenPerfils.FindAsync(id);
            if (imagenPerfil == null)
            {
                return NotFound();
            }

            imagenPerfil.IdUsuario = imagenPerfilActualizadaDTO.IdUsuario;
            imagenPerfil.Imagen = imagenPerfilActualizadaDTO.Imagen;
            imagenPerfil.Descripcion = imagenPerfilActualizadaDTO.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/imagenperfil/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteImagenPerfil(int id)
        {
            var imagenPerfil = await dbContext.ImagenPerfils.FindAsync(id);
            if (imagenPerfil == null)
            {
                return NotFound();
            }

            dbContext.ImagenPerfils.Remove(imagenPerfil);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

