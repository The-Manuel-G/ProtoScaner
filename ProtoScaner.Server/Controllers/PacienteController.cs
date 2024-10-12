using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public PacienteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/paciente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
            return Ok(await dbContext.Pacientes.ToListAsync());
        }

        // GET: api/paciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            var paciente = await dbContext.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }
            return Ok(paciente);
        }

        // POST: api/paciente
        [HttpPost]
        public async Task<ActionResult<Paciente>> CreatePaciente(Paciente nuevoPaciente)
        {
            dbContext.Pacientes.Add(nuevoPaciente);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPaciente), new { id = nuevoPaciente.IdPaciente }, nuevoPaciente);
        }

        // PUT: api/paciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePaciente(int id, Paciente pacienteActualizado)
        {
            var paciente = await dbContext.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            paciente.NombreCompleto = pacienteActualizado.NombreCompleto;
            paciente.Cedula = pacienteActualizado.Cedula;
            paciente.Genero = pacienteActualizado.Genero;
            paciente.FechaNacimiento = pacienteActualizado.FechaNacimiento;
            paciente.Direccion = pacienteActualizado.Direccion;
            paciente.Telefono = pacienteActualizado.Telefono;
            paciente.TelefonoCelular = pacienteActualizado.TelefonoCelular;
            paciente.IdProvincia = pacienteActualizado.IdProvincia;
            paciente.Sector = pacienteActualizado.Sector;
            paciente.Insidencia = pacienteActualizado.Insidencia;
            paciente.IdEstatusPaciente = pacienteActualizado.IdEstatusPaciente;
            paciente.IdEstatusProtesis = pacienteActualizado.IdEstatusProtesis;
            paciente.Comentario = pacienteActualizado.Comentario;
            paciente.FotoPaciente = pacienteActualizado.FotoPaciente;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/paciente/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePaciente(int id)
        {
            var paciente = await dbContext.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            dbContext.Pacientes.Remove(paciente);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

