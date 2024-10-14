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
    public class HistorialLoginController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public HistorialLoginController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/historiallogin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialLoginDTO>>> GetHistorialLogins()
        {
            var historialLogins = await dbContext.HistorialLogins
                .Select(hl => new HistorialLoginDTO
                {
                    IdHistorial = hl.IdHistorial,
                    IdUsuario = hl.IdUsuario,
                    FechaLogin = hl.FechaLogin,
                    Direccion = hl.Direccion,
                    Dispositivo = hl.Dispositivo,
                    Exito = hl.Exito
                })
                .ToListAsync();

            return Ok(historialLogins);
        }

        // GET: api/historiallogin/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HistorialLoginDTO>> GetHistorialLogin(int id)
        {
            var historialLogin = await dbContext.HistorialLogins.FindAsync(id);
            if (historialLogin == null)
            {
                return NotFound();
            }

            var historialLoginDTO = new HistorialLoginDTO
            {
                IdHistorial = historialLogin.IdHistorial,
                IdUsuario = historialLogin.IdUsuario,
                FechaLogin = historialLogin.FechaLogin,
                Direccion = historialLogin.Direccion,
                Dispositivo = historialLogin.Dispositivo,
                Exito = historialLogin.Exito
            };

            return Ok(historialLoginDTO);
        }

        // POST: api/historiallogin
        [HttpPost]
        public async Task<ActionResult<HistorialLoginDTO>> CreateHistorialLogin(HistorialLoginDTO nuevoHistorialLoginDTO)
        {
            var nuevoHistorialLogin = new HistorialLogin
            {
                IdUsuario = nuevoHistorialLoginDTO.IdUsuario,
                FechaLogin = nuevoHistorialLoginDTO.FechaLogin,
                Direccion = nuevoHistorialLoginDTO.Direccion,
                Dispositivo = nuevoHistorialLoginDTO.Dispositivo,
                Exito = nuevoHistorialLoginDTO.Exito
            };

            dbContext.HistorialLogins.Add(nuevoHistorialLogin);
            await dbContext.SaveChangesAsync();

            nuevoHistorialLoginDTO.IdHistorial = nuevoHistorialLogin.IdHistorial;

            return CreatedAtAction(nameof(GetHistorialLogin), new { id = nuevoHistorialLogin.IdHistorial }, nuevoHistorialLoginDTO);
        }

        // PUT: api/historiallogin/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHistorialLogin(int id, HistorialLoginDTO historialLoginActualizadoDTO)
        {
            var historialLogin = await dbContext.HistorialLogins.FindAsync(id);
            if (historialLogin == null)
            {
                return NotFound();
            }

            historialLogin.IdUsuario = historialLoginActualizadoDTO.IdUsuario;
            historialLogin.FechaLogin = historialLoginActualizadoDTO.FechaLogin;
            historialLogin.Direccion = historialLoginActualizadoDTO.Direccion;
            historialLogin.Dispositivo = historialLoginActualizadoDTO.Dispositivo;
            historialLogin.Exito = historialLoginActualizadoDTO.Exito;

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
