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
    public class RolController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public RolController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/rol
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolDTO>>> GetRoles()
        {
            var roles = await dbContext.Rols
                .Select(r => new RolDTO
                {
                    IdRol = r.IdRol,
                    NombreRol = r.NombreRol,
                    Descripcion = r.Descripcion
                })
                .ToListAsync();

            return Ok(roles);
        }

        // GET: api/rol/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RolDTO>> GetRol(int id)
        {
            var rol = await dbContext.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            var rolDTO = new RolDTO
            {
                IdRol = rol.IdRol,
                NombreRol = rol.NombreRol,
                Descripcion = rol.Descripcion
            };

            return Ok(rolDTO);
        }

        // POST: api/rol
        [HttpPost]
        public async Task<ActionResult<RolDTO>> CreateRol(RolDTO nuevoRolDTO)
        {
            var nuevoRol = new Rol
            {
                NombreRol = nuevoRolDTO.NombreRol,
                Descripcion = nuevoRolDTO.Descripcion
            };

            dbContext.Rols.Add(nuevoRol);
            await dbContext.SaveChangesAsync();

            nuevoRolDTO.IdRol = nuevoRol.IdRol;

            return CreatedAtAction(nameof(GetRol), new { id = nuevoRol.IdRol }, nuevoRolDTO);
        }

        // PUT: api/rol/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRol(int id, RolDTO rolActualizadoDTO)
        {
            var rol = await dbContext.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            rol.NombreRol = rolActualizadoDTO.NombreRol;
            rol.Descripcion = rolActualizadoDTO.Descripcion;

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


