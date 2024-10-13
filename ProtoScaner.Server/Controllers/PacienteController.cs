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
    public class PacienteController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public PacienteController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/paciente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PacienteDTO>>> GetPacientes()
        {
            var pacientes = await dbContext.Pacientes
                .Select(p => new PacienteDTO
                {
                    IdPaciente = p.IdPaciente,
                    NombreCompleto = p.NombreCompleto,
                    Cedula = p.Cedula,
                    Genero = p.Genero,
                    FechaNacimiento = p.FechaNacimiento,
                    Direccion = p.Direccion,
                    Telefono = p.Telefono,
                    TelefonoCelular = p.TelefonoCelular,
                    IdProvincia = p.IdProvincia,
                    Sector = p.Sector,
                    Insidencia = p.Insidencia,
                    IdEstatusPaciente = p.IdEstatusPaciente,
                    IdEstatusProtesis = p.IdEstatusProtesis,
                    Comentario = p.Comentario,
                    FotoPaciente = p.FotoPaciente
                })
                .ToListAsync();

            return Ok(pacientes);
        }

        // GET: api/paciente/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PacienteDTO>> GetPaciente(int id)
        {
            var paciente = await dbContext.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            var pacienteDTO = new PacienteDTO
            {
                IdPaciente = paciente.IdPaciente,
                NombreCompleto = paciente.NombreCompleto,
                Cedula = paciente.Cedula,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento,
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente,
                IdEstatusProtesis = paciente.IdEstatusProtesis,
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente
            };

            return Ok(pacienteDTO);
        }

        // POST: api/paciente
        [HttpPost]
        public async Task<ActionResult<PacienteDTO>> CreatePaciente(PacienteDTO nuevoPacienteDTO)
        {
            var nuevoPaciente = new Paciente
            {
                NombreCompleto = nuevoPacienteDTO.NombreCompleto,
                Cedula = nuevoPacienteDTO.Cedula,
                Genero = nuevoPacienteDTO.Genero,
                FechaNacimiento = nuevoPacienteDTO.FechaNacimiento,
                Direccion = nuevoPacienteDTO.Direccion,
                Telefono = nuevoPacienteDTO.Telefono,
                TelefonoCelular = nuevoPacienteDTO.TelefonoCelular,
                IdProvincia = nuevoPacienteDTO.IdProvincia,
                Sector = nuevoPacienteDTO.Sector,
                Insidencia = nuevoPacienteDTO.Insidencia,
                IdEstatusPaciente = nuevoPacienteDTO.IdEstatusPaciente,
                IdEstatusProtesis = nuevoPacienteDTO.IdEstatusProtesis,
                Comentario = nuevoPacienteDTO.Comentario,
                FotoPaciente = nuevoPacienteDTO.FotoPaciente
            };

            dbContext.Pacientes.Add(nuevoPaciente);
            await dbContext.SaveChangesAsync();

            nuevoPacienteDTO.IdPaciente = nuevoPaciente.IdPaciente;

            return CreatedAtAction(nameof(GetPaciente), new { id = nuevoPaciente.IdPaciente }, nuevoPacienteDTO);
        }

        // PUT: api/paciente/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePaciente(int id, PacienteDTO pacienteActualizadoDTO)
        {
            var paciente = await dbContext.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            paciente.NombreCompleto = pacienteActualizadoDTO.NombreCompleto;
            paciente.Cedula = pacienteActualizadoDTO.Cedula;
            paciente.Genero = pacienteActualizadoDTO.Genero;
            paciente.FechaNacimiento = pacienteActualizadoDTO.FechaNacimiento;
            paciente.Direccion = pacienteActualizadoDTO.Direccion;
            paciente.Telefono = pacienteActualizadoDTO.Telefono;
            paciente.TelefonoCelular = pacienteActualizadoDTO.TelefonoCelular;
            paciente.IdProvincia = pacienteActualizadoDTO.IdProvincia;
            paciente.Sector = pacienteActualizadoDTO.Sector;
            paciente.Insidencia = pacienteActualizadoDTO.Insidencia;
            paciente.IdEstatusPaciente = pacienteActualizadoDTO.IdEstatusPaciente;
            paciente.IdEstatusProtesis = pacienteActualizadoDTO.IdEstatusProtesis;
            paciente.Comentario = pacienteActualizadoDTO.Comentario;
            paciente.FotoPaciente = pacienteActualizadoDTO.FotoPaciente;

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


