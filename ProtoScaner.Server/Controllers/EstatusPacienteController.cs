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
    public class EstatusPacienteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public EstatusPacienteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/estatuspaciente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstatusPacienteDTO>>> GetEstatusPacientes()
        {
            var estatusPacientes = await dbContext.EstatusPacientes
                .Select(ep => new EstatusPacienteDTO
                {
                    IdEstatusPaciente = ep.IdEstatusPaciente,
                    Descripcion = ep.Descripcion
                })
                .ToListAsync();

            return Ok(estatusPacientes);
        }

        // GET: api/estatuspaciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EstatusPacienteDTO>> GetEstatusPaciente(int id)
        {
            var estatusPaciente = await dbContext.EstatusPacientes.FindAsync(id);
            if (estatusPaciente == null)
            {
                return NotFound();
            }

            var estatusPacienteDTO = new EstatusPacienteDTO
            {
                IdEstatusPaciente = estatusPaciente.IdEstatusPaciente,
                Descripcion = estatusPaciente.Descripcion
            };

            return Ok(estatusPacienteDTO);
        }

        // POST: api/estatuspaciente
        [HttpPost]
        public async Task<ActionResult<EstatusPacienteDTO>> CreateEstatusPaciente(EstatusPacienteDTO nuevoEstatusPacienteDTO)
        {
            var nuevoEstatusPaciente = new EstatusPaciente
            {
                Descripcion = nuevoEstatusPacienteDTO.Descripcion
            };

            dbContext.EstatusPacientes.Add(nuevoEstatusPaciente);
            await dbContext.SaveChangesAsync();

            nuevoEstatusPacienteDTO.IdEstatusPaciente = nuevoEstatusPaciente.IdEstatusPaciente;

            return CreatedAtAction(nameof(GetEstatusPaciente), new { id = nuevoEstatusPaciente.IdEstatusPaciente }, nuevoEstatusPacienteDTO);
        }

        // PUT: api/estatuspaciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEstatusPaciente(int id, EstatusPacienteDTO estatusPacienteActualizadoDTO)
        {
            var estatusPaciente = await dbContext.EstatusPacientes.FindAsync(id);
            if (estatusPaciente == null)
            {
                return NotFound();
            }

            estatusPaciente.Descripcion = estatusPacienteActualizadoDTO.Descripcion;

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
