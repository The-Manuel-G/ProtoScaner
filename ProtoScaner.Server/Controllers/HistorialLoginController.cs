using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistorialLoginController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialLoginController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historiallogin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialLogin>>> GetHistorialLogins()
        {
            return Ok(await dbContext.HistorialLogins.ToListAsync());
        }

        // GET: api/historiallogin/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialLogin>> GetHistorialLogin(int id)
        {
            var historialLogin = await dbContext.HistorialLogins.FindAsync(id);
            if (historialLogin == null)
            {
                return NotFound();
            }
            return Ok(historialLogin);
        }

        // POST: api/historiallogin
        [HttpPost]
        public async Task<ActionResult<HistorialLogin>> CreateHistorialLogin(HistorialLogin nuevoHistorialLogin)
        {
            dbContext.HistorialLogins.Add(nuevoHistorialLogin);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHistorialLogin), new { id = nuevoHistorialLogin.IdHistorial }, nuevoHistorialLogin);
        }

        // PUT: api/historiallogin/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialLogin(int id, HistorialLogin historialLoginActualizado)
        {
            var historialLogin = await dbContext.HistorialLogins.FindAsync(id);
            if (historialLogin == null)
            {
                return NotFound();
            }

            historialLogin.IdUsuario = historialLoginActualizado.IdUsuario;
            historialLogin.FechaLogin = historialLoginActualizado.FechaLogin;
            historialLogin.Direccion = historialLoginActualizado.Direccion;
            historialLogin.Dispositivo = historialLoginActualizado.Dispositivo;
            historialLogin.Exito = historialLoginActualizado.Exito;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/historiallogin/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteHistorialLogin(int id)
        {
            var historialLogin = await dbContext.HistorialLogins.FindAsync(id);
            if (historialLogin == null)
            {
                return NotFound();
            }

            dbContext.HistorialLogins.Remove(historialLogin);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

