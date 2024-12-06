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
                CodigoPaciente = paciente.CodigoPaciente,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento?.ToString("yyyy-MM-dd"),
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente ?? 1, // Establecer a 1 si es nulo
                IdEstatusProtesis = paciente.IdEstatusProtesis,      // Dejar tal cual
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null,
                FechaIngreso = paciente.FechaIngreso.ToString("yyyy-MM-dd"), // Nueva propiedad
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
                CodigoPaciente = paciente.CodigoPaciente,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento?.ToString("yyyy-MM-dd"),
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente ?? 1, // Establecer a 1 si es nulo
                IdEstatusProtesis = paciente.IdEstatusProtesis,      // Dejar tal cual
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null,
                FechaIngreso = paciente.FechaIngreso.ToString("yyyy-MM-dd"), // Nueva propiedad
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

        // Otros métodos existentes...

        // GET: api/Pacientes/codigo/{codigoPaciente}
        [HttpGet("codigo/{codigoPaciente}")]
        public async Task<ActionResult<PacienteDTO>> GetPacienteByCodigo(string codigoPaciente)
        {
            var paciente = await _context.Pacientes
                .Include(p => p.HistorialPacienteIngresos)
                .FirstOrDefaultAsync(p => p.CodigoPaciente == codigoPaciente);

            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            var pacienteDto = new PacienteDTO
            {
                IdPaciente = paciente.IdPaciente,
                NombreCompleto = paciente.NombreCompleto,
                Cedula = paciente.Cedula,
                CodigoPaciente = paciente.CodigoPaciente,
                Genero = paciente.Genero,
                FechaNacimiento = paciente.FechaNacimiento?.ToString("yyyy-MM-dd"),
                Direccion = paciente.Direccion,
                Telefono = paciente.Telefono,
                TelefonoCelular = paciente.TelefonoCelular,
                IdProvincia = paciente.IdProvincia,
                Sector = paciente.Sector,
                Insidencia = paciente.Insidencia,
                IdEstatusPaciente = paciente.IdEstatusPaciente ?? 1,
                IdEstatusProtesis = paciente.IdEstatusProtesis,
                Comentario = paciente.Comentario,
                FotoPaciente = paciente.FotoPaciente != null ? Convert.ToBase64String(paciente.FotoPaciente) : null,
                FechaIngreso = paciente.FechaIngreso.ToString("yyyy-MM-dd"),
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

       

        // POST: api/Pacientes/bulk
        [HttpPost("bulk")]
        public async Task<ActionResult> CreatePacientes([FromBody] List<RegisterPacienteRequest> requests)
        {
            if (requests == null || !requests.Any())
            {
                return BadRequest("La lista de pacientes está vacía.");
            }

            foreach (var request in requests)
            {
                var pacienteDto = request.Paciente;

                // Establecer IdEstatusPaciente a 1 si es nulo
                if (!pacienteDto.IdEstatusPaciente.HasValue)
                {
                    pacienteDto.IdEstatusPaciente = 1;
                }

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
                    Comentario = pacienteDto.Comentario,
                    FechaIngreso = DateOnly.FromDateTime(DateTime.Now),
                    CodigoPaciente = pacienteDto.CodigoPaciente ?? "PAC" + DateTime.Now.ToString("yyyyMMddHHmmssfff")
                };

                // Manejar la foto del paciente
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
            }

            return Ok("Pacientes registrados exitosamente.");
        }


        // POST: api/Pacientes
        [HttpPost]
        public async Task<ActionResult<PacienteDTO>> CreatePaciente([FromBody] RegisterPacienteRequest request)
        {
            var pacienteDto = request.Paciente;

            // Establecer IdEstatusPaciente a 1 si es nulo
            if (!pacienteDto.IdEstatusPaciente.HasValue)
            {
                pacienteDto.IdEstatusPaciente = 1;
            }
            // No establecer IdEstatusProtesis, dejarlo tal cual

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
                IdEstatusProtesis = pacienteDto.IdEstatusProtesis, // Puede ser nulo
                Comentario = pacienteDto.Comentario,
                FechaIngreso = DateOnly.FromDateTime(DateTime.Now), // Asignar fecha de ingreso
                CodigoPaciente = "PAC" + DateTime.Now.ToString("yyyyMMddHHmmssfff") // Generar código único
            };

            // Manejar la foto del paciente
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

            // Actualizar propiedades en el DTO
            pacienteDto.IdPaciente = paciente.IdPaciente;
            pacienteDto.CodigoPaciente = paciente.CodigoPaciente;
            pacienteDto.FechaIngreso = paciente.FechaIngreso.ToString("yyyy-MM-dd");
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

            // Actualizar propiedades del paciente (excepto CodigoPaciente y FechaIngreso)
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

            // No actualizar CodigoPaciente y FechaIngreso

            // Manejar la foto del paciente
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

        // Avanzar estatus de paciente
        [HttpPut("{id}/avanzarEstatusPaciente")]
        public async Task<IActionResult> AvanzarEstatusPaciente(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            if (!paciente.IdEstatusPaciente.HasValue)
            {
                paciente.IdEstatusPaciente = 1; // Inicializar a 1 si es nulo
            }
            else if (paciente.IdEstatusPaciente >= 6)
            {
                return BadRequest("El estatus de paciente ya está en el estado final.");
            }
            else
            {
                paciente.IdEstatusPaciente += 1;

                // Lógica específica según los estatus
                if (paciente.IdEstatusPaciente == 2)
                {
                    // Cuando el paciente está en 'Pendiente de Prueba', la prótesis debería estar en 'Impreso 1'
                    if (paciente.IdEstatusProtesis < 2)
                    {
                        paciente.IdEstatusProtesis = 2; // 'Impreso 1'
                    }
                }
                else if (paciente.IdEstatusPaciente == 4)
                {
                    // Cuando el paciente está en 'Pendiente Definitivo Cita', la prótesis debería estar en 'Impreso 2'
                    if (paciente.IdEstatusProtesis < 4)
                    {
                        paciente.IdEstatusProtesis = 4; // 'Impreso 2'
                    }
                }
                else if (paciente.IdEstatusPaciente == 6)
                {
                    // Si el paciente se marca como 'Completado', la prótesis debe estar en 'Entregado'
                    if (paciente.IdEstatusProtesis < 5)
                    {
                        paciente.IdEstatusProtesis = 5; // 'Entregado'
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok("Estatus de paciente avanzado.");
        }

        // Retroceder estatus de paciente
        [HttpPut("{id}/retrocederEstatusPaciente")]
        public async Task<IActionResult> RetrocederEstatusPaciente(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            if (!paciente.IdEstatusPaciente.HasValue || paciente.IdEstatusPaciente <= 1)
            {
                return BadRequest("El estatus de paciente ya está en el estado inicial o no ha sido asignado.");
            }

            paciente.IdEstatusPaciente -= 1;

            // Lógica específica según los estatus
            if (paciente.IdEstatusPaciente == 3)
            {
                // Si el paciente retrocede a 'Prueba', la prótesis debe estar en 'Pendiente Diseño 2'
                if (paciente.IdEstatusProtesis > 3)
                {
                    paciente.IdEstatusProtesis = 3; // 'Pendiente Diseño 2'
                }
            }
            else if (paciente.IdEstatusPaciente == 2)
            {
                // Si el paciente retrocede a 'Pendiente de Prueba', la prótesis debe estar en 'Impreso 1'
                if (paciente.IdEstatusProtesis > 2)
                {
                    paciente.IdEstatusProtesis = 2; // 'Impreso 1'
                }
            }
            else if (paciente.IdEstatusPaciente < 2)
            {
                // Si retrocede por debajo de 'Pendiente de Prueba', establecer estatus de prótesis a 'Pendiente Diseño 1'
                paciente.IdEstatusProtesis = 1; // 'Pendiente Diseño 1'
            }

            await _context.SaveChangesAsync();

            return Ok("Estatus de paciente retrocedido.");
        }

        // Avanzar estatus de prótesis
        [HttpPut("{id}/avanzarEstatusProtesis")]
        public async Task<IActionResult> AvanzarEstatusProtesis(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);

            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            if (!paciente.IdEstatusProtesis.HasValue)
            {
                paciente.IdEstatusProtesis = 1; // Inicializar a 1 si es nulo
            }
            else if (paciente.IdEstatusProtesis >= 6)
            {
                return BadRequest("El estatus de prótesis ya está en el estado final.");
            }
            else
            {
                paciente.IdEstatusProtesis += 1;

                // Lógica específica según los estatus
                if (paciente.IdEstatusProtesis == 2)
                {
                    // Al avanzar a 'Impreso 1', actualizar estatus de paciente a 'Pendiente de Prueba'
                    if (paciente.IdEstatusPaciente < 2)
                    {
                        paciente.IdEstatusPaciente = 2; // 'Pendiente de Prueba'
                    }
                }
                else if (paciente.IdEstatusProtesis == 3)
                {
                    // Al avanzar a 'Pendiente Diseño 2', actualizar estatus de paciente a 'Prueba'
                    if (paciente.IdEstatusPaciente < 3)
                    {
                        paciente.IdEstatusPaciente = 3; // 'Prueba'
                    }
                }
                else if (paciente.IdEstatusProtesis == 4)
                {
                    // Al avanzar a 'Impreso 2', actualizar estatus de paciente a 'Pendiente Definitivo Cita'
                    if (paciente.IdEstatusPaciente < 4)
                    {
                        paciente.IdEstatusPaciente = 4; // 'Pendiente Definitivo Cita'
                    }
                }
                else if (paciente.IdEstatusProtesis == 5)
                {
                    // Al avanzar a 'Entregado', si el paciente no está en 'Completado', actualizarlo
                    if (paciente.IdEstatusPaciente < 6)
                    {
                        paciente.IdEstatusPaciente = 6; // 'Completado'
                    }
                }
                else if (paciente.IdEstatusProtesis == 6)
                {
                    // 'Descartado' solo se puede alcanzar manualmente si el paciente está en 'Completado'
                    if (paciente.IdEstatusPaciente != 6)
                    {
                        return BadRequest("No se puede descartar la prótesis si el paciente no está en 'Completado'.");
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok("Estatus de prótesis avanzado.");
        }

        // Retroceder estatus de prótesis
        [HttpPut("{id}/retrocederEstatusProtesis")]
        public async Task<IActionResult> RetrocederEstatusProtesis(int id)
        {
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound("Paciente no encontrado.");
            }

            if (!paciente.IdEstatusProtesis.HasValue || paciente.IdEstatusProtesis <= 1)
            {
                return BadRequest("El estatus de prótesis ya está en el estado inicial o no ha sido asignado.");
            }

            paciente.IdEstatusProtesis -= 1;

            // Lógica específica según los estatus
            if (paciente.IdEstatusProtesis == 4)
            {
                // Si retrocede a 'Impreso 2', el paciente debe estar en 'Pendiente Definitivo Cita'
                if (paciente.IdEstatusPaciente > 4)
                {
                    paciente.IdEstatusPaciente = 4; // 'Pendiente Definitivo Cita'
                }
            }
            else if (paciente.IdEstatusProtesis == 3)
            {
                // Si retrocede a 'Pendiente Diseño 2', el paciente debe estar en 'Prueba'
                if (paciente.IdEstatusPaciente > 3)
                {
                    paciente.IdEstatusPaciente = 3; // 'Prueba'
                }
            }
            else if (paciente.IdEstatusProtesis == 2)
            {
                // Si retrocede a 'Impreso 1', el paciente debe estar en 'Pendiente de Prueba'
                if (paciente.IdEstatusPaciente > 2)
                {
                    paciente.IdEstatusPaciente = 2; // 'Pendiente de Prueba'
                }
            }
            else if (paciente.IdEstatusProtesis < 5 && paciente.IdEstatusPaciente == 6)
            {
                // Si la prótesis no está en 'Entregado' y el paciente estaba en 'Completado', retroceder el paciente
                paciente.IdEstatusPaciente = 5; // 'Pendiente Definitivo'
            }

            await _context.SaveChangesAsync();

            return Ok("Estatus de prótesis retrocedido.");
        }
    }
}
