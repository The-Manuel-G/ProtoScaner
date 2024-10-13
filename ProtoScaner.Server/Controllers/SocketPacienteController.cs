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
    public class SocketPacienteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public SocketPacienteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/socketpaciente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocketPacienteDTO>>> GetSocketPacientes()
        {
            var socketPacientes = await dbContext.SocketPacientes
                .Include(sp => sp.IdPacienteNavigation)
                .Select(sp => new SocketPacienteDTO
                {
                    IdSocket = sp.IdSocket,
                    IdPaciente = sp.IdPaciente,
                    Descripcion = sp.Descripcion,
                    FechaCreacion = sp.FechaCreacion,
                    Tamaño = sp.Tamaño
                })
                .ToListAsync();

            return Ok(socketPacientes);
        }

        // GET: api/socketpaciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SocketPacienteDTO>> GetSocketPaciente(int id)
        {
            var socketPaciente = await dbContext.SocketPacientes
                .Include(sp => sp.IdPacienteNavigation)
                .Select(sp => new SocketPacienteDTO
                {
                    IdSocket = sp.IdSocket,
                    IdPaciente = sp.IdPaciente,
                    Descripcion = sp.Descripcion,
                    FechaCreacion = sp.FechaCreacion,
                    Tamaño = sp.Tamaño
                })
                .FirstOrDefaultAsync(sp => sp.IdSocket == id);

            if (socketPaciente == null)
            {
                return NotFound();
            }
            return Ok(socketPaciente);
        }

        // POST: api/socketpaciente
        [HttpPost]
        public async Task<ActionResult<SocketPacienteDTO>> CreateSocketPaciente(SocketPacienteDTO nuevaSocketPacienteDTO)
        {
            var nuevaSocketPaciente = new SocketPaciente
            {
                IdPaciente = nuevaSocketPacienteDTO.IdPaciente,
                Descripcion = nuevaSocketPacienteDTO.Descripcion,
                FechaCreacion = nuevaSocketPacienteDTO.FechaCreacion,
                Tamaño = nuevaSocketPacienteDTO.Tamaño
            };

            dbContext.SocketPacientes.Add(nuevaSocketPaciente);
            await dbContext.SaveChangesAsync();

            nuevaSocketPacienteDTO.IdSocket = nuevaSocketPaciente.IdSocket;

            return CreatedAtAction(nameof(GetSocketPaciente), new { id = nuevaSocketPaciente.IdSocket }, nuevaSocketPacienteDTO);
        }

        // PUT: api/socketpaciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSocketPaciente(int id, SocketPacienteDTO socketPacienteActualizado)
        {
            var socketPaciente = await dbContext.SocketPacientes.FindAsync(id);
            if (socketPaciente == null)
            {
                return NotFound();
            }

            socketPaciente.Descripcion = socketPacienteActualizado.Descripcion;
            socketPaciente.FechaCreacion = socketPacienteActualizado.FechaCreacion;
            socketPaciente.Tamaño = socketPacienteActualizado.Tamaño;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/socketpaciente/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSocketPaciente(int id)
        {
            var socketPaciente = await dbContext.SocketPacientes.FindAsync(id);
            if (socketPaciente == null)
            {
                return NotFound();
            }

            dbContext.SocketPacientes.Remove(socketPaciente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


