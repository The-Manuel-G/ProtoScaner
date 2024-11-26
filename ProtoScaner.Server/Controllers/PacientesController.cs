using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.DTOs;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientesController : ControllerBase
    {
        private readonly ProtoScanner3DContext _context;

        public PacientesController(ProtoScanner3DContext context)
        {
            _context = context;
        }

        // GET: api/Pacientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PacienteDTO>>> GetAllPacientes()
        {
            var pacientes = await _context.Pacientes
                .Include(p => p.HistorialPacienteIngresos)
                .ToListAsync();

            var pacientesDto = pacientes.Select(paciente => new PacienteDTO
            {
                IdPaciente = paciente.IdPaciente,
                NombreCompleto = paciente.NombreCompleto,
                Cedula = paciente.Cedula,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento?.ToString("yyyy-MM-dd"),
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente,
                IdEstatusProtesis = paciente.IdEstatusProtesis,
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null,
                HistorialPacienteIngresos = paciente.HistorialPacienteIngresos.Select(h => new HistorialPacienteIngresoDTO
                {
                    IdHistorial = h.IdHistorial,
                    TipoAmputacion = h.TipoAmputacion,
                    LadoAmputacion = h.LadoAmputacion,
                    FechaAmputacion = h.FechaAmputacion,
                    Causa = h.Causa,
                    Terapia = h.Terapia,
                    TiempoTerapia = h.TiempoTerapia,
                    Comentario = h.Comentario
                }).ToList()
            }).ToList();

            return Ok(pacientesDto);
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PacienteDTO>> GetPacienteById(int id)
        {
            var paciente = await _context.Pacientes
                .Include(p => p.HistorialPacienteIngresos)
                .FirstOrDefaultAsync(p => p.IdPaciente == id);

            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            var pacienteDto = new PacienteDTO
            {
                IdPaciente = paciente.IdPaciente,
                NombreCompleto = paciente.NombreCompleto,
                Cedula = paciente.Cedula,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento?.ToString("yyyy-MM-dd"),
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente,
                IdEstatusProtesis = paciente.IdEstatusProtesis,
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null,
                HistorialPacienteIngresos = paciente.HistorialPacienteIngresos.Select(h => new HistorialPacienteIngresoDTO
                {
                    IdHistorial = h.IdHistorial,
                    TipoAmputacion = h.TipoAmputacion,
                    LadoAmputacion = h.LadoAmputacion,
                    FechaAmputacion = h.FechaAmputacion,
                    Causa = h.Causa,
                    Terapia = h.Terapia,
                    TiempoTerapia = h.TiempoTerapia,
                    Comentario = h.Comentario
                }).ToList()
            };

            return Ok(pacienteDto);
        }

        // POST: api/Pacientes
        [HttpPost]
        public async Task<ActionResult<PacienteDTO>> CreatePaciente([FromBody] RegisterPacienteRequest request)
        {
            var pacienteDto = request.Paciente;

            var paciente = new Paciente
            {
                NombreCompleto = pacienteDto.NombreCompleto,
                Cedula = pacienteDto.Cedula,
                Genero = pacienteDto.Genero,
                FechaNacimiento = !string.IsNullOrEmpty(pacienteDto.FechaNacimiento)
                    ? DateOnly.Parse(pacienteDto.FechaNacimiento)
                    : null,
                Direccion = pacienteDto.Direccion,
                Telefono = pacienteDto.Telefono,
                TelefonoCelular = pacienteDto.TelefonoCelular,
                IdProvincia = pacienteDto.IdProvincia,
                Sector = pacienteDto.Sector,
                Insidencia = pacienteDto.Insidencia,
                IdEstatusPaciente = pacienteDto.IdEstatusPaciente,
                IdEstatusProtesis = pacienteDto.IdEstatusProtesis,
                Comentario = pacienteDto.Comentario
            };

            // Manejar la foto del paciente con manejo de excepciones
            if (!string.IsNullOrEmpty(pacienteDto.FotoPaciente))
            {
                try
                {
                    paciente.FotoPaciente = Convert.FromBase64String(pacienteDto.FotoPaciente);
                }
                catch (FormatException)
                {
                    return BadRequest("El formato de la imagen proporcionada no es válido. Asegúrate de que esté en formato base64 correcto.");
                }
            }

            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();

            if (request.Historial != null)
            {
                var historial = new HistorialPacienteIngreso
                {
                    IdPaciente = paciente.IdPaciente,
                    TipoAmputacion = request.Historial.TipoAmputacion,
                    LadoAmputacion = request.Historial.LadoAmputacion,
                    FechaAmputacion = request.Historial.FechaAmputacion,
                    Causa = request.Historial.Causa,
                    Terapia = request.Historial.Terapia,
                    TiempoTerapia = request.Historial.TiempoTerapia,
                    Comentario = request.Historial.Comentario
                };
                _context.HistorialPacienteIngresos.Add(historial);
                await _context.SaveChangesAsync();
            }

            // Actualizar la representación de FotoPaciente en el DTO para incluir la imagen en base64
            pacienteDto.FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null;

            return CreatedAtAction(nameof(GetPacienteById), new { id = paciente.IdPaciente }, pacienteDto);
        }

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            var paciente = await _context.Pacientes
                .Include(p => p.HistorialPacienteIngresos)
                .FirstOrDefaultAsync(p => p.IdPaciente == id);

            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            // Remover registros de historial primero
            _context.HistorialPacienteIngresos.RemoveRange(paciente.HistorialPacienteIngresos);

            // Remover el registro del paciente
            _context.Pacientes.Remove(paciente);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Pacientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaciente(int id, [FromBody] RegisterPacienteRequest request)
        {
            if (id != request.Paciente.IdPaciente)
            {
                return BadRequest("El ID del paciente en la ruta no coincide con el ID en el cuerpo de la solicitud.");
            }

            var paciente = await _context.Pacientes
                .Include(p => p.HistorialPacienteIngresos)
                .FirstOrDefaultAsync(p => p.IdPaciente == id);

            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            // Actualizar propiedades del paciente
            paciente.NombreCompleto = request.Paciente.NombreCompleto;
            paciente.Cedula = request.Paciente.Cedula;
            paciente.Genero = request.Paciente.Genero;
            paciente.FechaNacimiento = !string.IsNullOrEmpty(request.Paciente.FechaNacimiento)
                ? DateOnly.Parse(request.Paciente.FechaNacimiento)
                : null;
            paciente.Direccion = request.Paciente.Direccion;
            paciente.Telefono = request.Paciente.Telefono;
            paciente.TelefonoCelular = request.Paciente.TelefonoCelular;
            paciente.IdProvincia = request.Paciente.IdProvincia;
            paciente.Sector = request.Paciente.Sector;
            paciente.Insidencia = request.Paciente.Insidencia;
            paciente.IdEstatusPaciente = request.Paciente.IdEstatusPaciente;
            paciente.IdEstatusProtesis = request.Paciente.IdEstatusProtesis;
            paciente.Comentario = request.Paciente.Comentario;

            // Manejar la foto del paciente con manejo de excepciones
            if (!string.IsNullOrEmpty(request.Paciente.FotoPaciente))
            {
                try
                {
                    paciente.FotoPaciente = Convert.FromBase64String(request.Paciente.FotoPaciente);
                }
                catch (FormatException)
                {
                    return BadRequest("El formato de la imagen proporcionada no es válido. Asegúrate de que esté en formato base64 correcto.");
                }
            }

            _context.Entry(paciente).State = EntityState.Modified;

            // Manejar HistorialPacienteIngreso
            if (request.Historial != null)
            {
                var historialExistente = paciente.HistorialPacienteIngresos
                    .FirstOrDefault(h => h.IdHistorial == request.Historial.IdHistorial);

                if (historialExistente != null)
                {
                    // Actualizar historial existente
                    historialExistente.TipoAmputacion = request.Historial.TipoAmputacion;
                    historialExistente.LadoAmputacion = request.Historial.LadoAmputacion;
                    historialExistente.FechaAmputacion = request.Historial.FechaAmputacion;
                    historialExistente.Causa = request.Historial.Causa;
                    historialExistente.Terapia = request.Historial.Terapia;
                    historialExistente.TiempoTerapia = request.Historial.TiempoTerapia;
                    historialExistente.Comentario = request.Historial.Comentario;

                    _context.Entry(historialExistente).State = EntityState.Modified;
                }
                else
                {
                    // Crear nuevo historial si no existe
                    var nuevoHistorial = new HistorialPacienteIngreso
                    {
                        IdPaciente = id,
                        TipoAmputacion = request.Historial.TipoAmputacion,
                        LadoAmputacion = request.Historial.LadoAmputacion,
                        FechaAmputacion = request.Historial.FechaAmputacion,
                        Causa = request.Historial.Causa,
                        Terapia = request.Historial.Terapia,
                        TiempoTerapia = request.Historial.TiempoTerapia,
                        Comentario = request.Historial.Comentario
                    };

                    _context.HistorialPacienteIngresos.Add(nuevoHistorial);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacienteExists(id))
                {
                    return NotFound("Paciente no encontrado durante la actualización.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool PacienteExists(int id)
        {
            return _context.Pacientes.Any(e => e.IdPaciente == id);
        }
    }
}
