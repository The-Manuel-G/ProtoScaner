using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public RolController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/rol
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
        {
            return Ok(await dbContext.Rols.ToListAsync());
        }

        // GET: api/rol/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Rol>> GetRol(int id)
        {
            var rol = await dbContext.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }
            return Ok(rol);
        }

        // POST: api/rol
        [HttpPost]
        public async Task<ActionResult<Rol>> CreateRol(Rol nuevoRol)
        {
            dbContext.Rols.Add(nuevoRol);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRol), new { id = nuevoRol.IdRol }, nuevoRol);
        }

        // PUT: api/rol/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRol(int id, Rol rolActualizado)
        {
            var rol = await dbContext.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            rol.NombreRol = rolActualizado.NombreRol;
            rol.Descripcion = rolActualizado.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/rol/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRol(int id)
        {
            var rol = await dbContext.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            dbContext.Rols.Remove(rol);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

