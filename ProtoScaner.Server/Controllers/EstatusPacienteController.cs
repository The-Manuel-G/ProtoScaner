using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstatusPacienteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public EstatusPacienteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/estatuspaciente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstatusPaciente>>> GetEstatusPacientes()
        {
            return Ok(await dbContext.EstatusPacientes.ToListAsync());
        }

        // GET: api/estatuspaciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EstatusPaciente>> GetEstatusPaciente(int id)
        {
            var estatusPaciente = await dbContext.EstatusPacientes.FindAsync(id);
            if (estatusPaciente == null)
            {
                return NotFound();
            }
            return Ok(estatusPaciente);
        }

        // POST: api/estatuspaciente
        [HttpPost]
        public async Task<ActionResult<EstatusPaciente>> CreateEstatusPaciente(EstatusPaciente nuevoEstatusPaciente)
        {
            dbContext.EstatusPacientes.Add(nuevoEstatusPaciente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEstatusPaciente), new { id = nuevoEstatusPaciente.IdEstatusPaciente }, nuevoEstatusPaciente);
        }

        // PUT: api/estatuspaciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstatusPaciente(int id, EstatusPaciente estatusPacienteActualizado)
        {
            var estatusPaciente = await dbContext.EstatusPacientes.FindAsync(id);
            if (estatusPaciente == null)
            {
                return NotFound();
            }

            estatusPaciente.Descripcion = estatusPacienteActualizado.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/estatuspaciente/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEstatusPaciente(int id)
        {
            var estatusPaciente = await dbContext.EstatusPacientes.FindAsync(id);
            if (estatusPaciente == null)
            {
                return NotFound();
            }

            dbContext.EstatusPacientes.Remove(estatusPaciente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

