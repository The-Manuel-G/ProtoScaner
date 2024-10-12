using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<ImagenPerfil>>> GetImagenesPerfil()
        {
            return Ok(await dbContext.ImagenPerfils.ToListAsync());
        }

        // GET: api/imagenperfil/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ImagenPerfil>> GetImagenPerfil(int id)
        {
            var imagenPerfil = await dbContext.ImagenPerfils.FindAsync(id);
            if (imagenPerfil == null)
            {
                return NotFound();
            }
            return Ok(imagenPerfil);
        }

        // POST: api/imagenperfil
        [HttpPost]
        public async Task<ActionResult<ImagenPerfil>> CreateImagenPerfil(ImagenPerfil nuevaImagenPerfil)
        {
            dbContext.ImagenPerfils.Add(nuevaImagenPerfil);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetImagenPerfil), new { id = nuevaImagenPerfil.IdImagen }, nuevaImagenPerfil);
        }

        // PUT: api/imagenperfil/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateImagenPerfil(int id, ImagenPerfil imagenPerfilActualizada)
        {
            var imagenPerfil = await dbContext.ImagenPerfils.FindAsync(id);
            if (imagenPerfil == null)
            {
                return NotFound();
            }

            imagenPerfil.IdUsuario = imagenPerfilActualizada.IdUsuario;
            imagenPerfil.Imagen = imagenPerfilActualizada.Imagen;
            imagenPerfil.Descripcion = imagenPerfilActualizada.Descripcion;

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

