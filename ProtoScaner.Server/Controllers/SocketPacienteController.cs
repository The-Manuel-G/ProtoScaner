using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<SocketPaciente>>> GetSocketPacientes()
        {
            return Ok(await dbContext.SocketPacientes.Include(sp => sp.IdPacienteNavigation).ToListAsync());
        }

        // GET: api/socketpaciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SocketPaciente>> GetSocketPaciente(int id)
        {
            var socketPaciente = await dbContext.SocketPacientes
                .Include(sp => sp.IdPacienteNavigation)
                .FirstOrDefaultAsync(sp => sp.IdSocket == id);

            if (socketPaciente == null)
            {
                return NotFound();
            }
            return Ok(socketPaciente);
        }

        // POST: api/socketpaciente
        [HttpPost]
        public async Task<ActionResult<SocketPaciente>> CreateSocketPaciente(SocketPaciente nuevoSocketPaciente)
        {
            dbContext.SocketPacientes.Add(nuevoSocketPaciente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSocketPaciente), new { id = nuevoSocketPaciente.IdSocket }, nuevoSocketPaciente);
        }

        // PUT: api/socketpaciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSocketPaciente(int id, SocketPaciente socketPacienteActualizado)
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

