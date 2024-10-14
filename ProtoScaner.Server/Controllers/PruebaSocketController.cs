using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PruebaSocketController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public PruebaSocketController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/pruebaSocket
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PruebaSocketDTO>>> GetPruebaSockets()
        {
            var pruebaSockets = await dbContext.PruebaSockets
                .Select(ps => new PruebaSocketDTO
                {
                    IdPrueba = ps.IdPrueba,
                    IdPaciente = ps.IdPaciente,
                    ModificacionGeneral = ps.ModificacionGeneral,
                    QuienLaHizo = ps.QuienLaHizo,
                    FechaPrueba = ps.FechaPrueba,
                    PracticaMarcha = ps.PracticaMarcha,
                    FechaMantenimientoPostEntrega = ps.FechaMantenimientoPostEntrega,
                    SocketFallo = ps.SocketFallo,
                    FechaFallo = ps.FechaFallo,
                    MaterialRellenoUsado = ps.MaterialRellenoUsado,
                    IdComponente = ps.IdComponente,
                    IdUsuario = ps.IdUsuario,
                    IdSocket = ps.IdSocket,
                    PracticaRecibida = ps.PracticaRecibida,
                    DuracionTerapia = ps.DuracionTerapia,
                    FechaPractica = ps.FechaPractica
                })
                .ToListAsync();

            return Ok(pruebaSockets);
        }

        // GET: api/pruebaSocket/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PruebaSocketDTO>> GetPruebaSocket(int id)
        {
            var pruebaSocket = await dbContext.PruebaSockets.FindAsync(id);
            if (pruebaSocket == null)
            {
                return NotFound();
            }

            var pruebaSocketDTO = new PruebaSocketDTO
            {
                IdPrueba = pruebaSocket.IdPrueba,
                IdPaciente = pruebaSocket.IdPaciente,
                ModificacionGeneral = pruebaSocket.ModificacionGeneral,
                QuienLaHizo = pruebaSocket.QuienLaHizo,
                FechaPrueba = pruebaSocket.FechaPrueba,
                PracticaMarcha = pruebaSocket.PracticaMarcha,
                FechaMantenimientoPostEntrega = pruebaSocket.FechaMantenimientoPostEntrega,
                SocketFallo = pruebaSocket.SocketFallo,
                FechaFallo = pruebaSocket.FechaFallo,
                MaterialRellenoUsado = pruebaSocket.MaterialRellenoUsado,
                IdComponente = pruebaSocket.IdComponente,
                IdUsuario = pruebaSocket.IdUsuario,
                IdSocket = pruebaSocket.IdSocket,
                PracticaRecibida = pruebaSocket.PracticaRecibida,
                DuracionTerapia = pruebaSocket.DuracionTerapia,
                FechaPractica = pruebaSocket.FechaPractica
            };

            return Ok(pruebaSocketDTO);
        }

        // POST: api/pruebaSocket
        [HttpPost]
        public async Task<ActionResult<PruebaSocketDTO>> CreatePruebaSocket(PruebaSocketDTO nuevaPruebaSocketDTO)
        {
            var nuevaPruebaSocket = new PruebaSocket
            {
                IdPaciente = nuevaPruebaSocketDTO.IdPaciente,
                ModificacionGeneral = nuevaPruebaSocketDTO.ModificacionGeneral,
                QuienLaHizo = nuevaPruebaSocketDTO.QuienLaHizo,
                FechaPrueba = nuevaPruebaSocketDTO.FechaPrueba,
                PracticaMarcha = nuevaPruebaSocketDTO.PracticaMarcha,
                FechaMantenimientoPostEntrega = nuevaPruebaSocketDTO.FechaMantenimientoPostEntrega,
                SocketFallo = nuevaPruebaSocketDTO.SocketFallo,
                FechaFallo = nuevaPruebaSocketDTO.FechaFallo,
                MaterialRellenoUsado = nuevaPruebaSocketDTO.MaterialRellenoUsado,
                IdComponente = nuevaPruebaSocketDTO.IdComponente,
                IdUsuario = nuevaPruebaSocketDTO.IdUsuario,
                IdSocket = nuevaPruebaSocketDTO.IdSocket,
                PracticaRecibida = nuevaPruebaSocketDTO.PracticaRecibida,
                DuracionTerapia = nuevaPruebaSocketDTO.DuracionTerapia,
                FechaPractica = nuevaPruebaSocketDTO.FechaPractica
            };

            dbContext.PruebaSockets.Add(nuevaPruebaSocket);
            await dbContext.SaveChangesAsync();

            nuevaPruebaSocketDTO.IdPrueba = nuevaPruebaSocket.IdPrueba;

            return CreatedAtAction(nameof(GetPruebaSocket), new { id = nuevaPruebaSocket.IdPrueba }, nuevaPruebaSocketDTO);
        }

        // PUT: api/pruebaSocket/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePruebaSocket(int id, PruebaSocketDTO pruebaSocketActualizadaDTO)
        {
            var pruebaSocket = await dbContext.PruebaSockets.FindAsync(id);
            if (pruebaSocket == null)
            {
                return NotFound();
            }

            pruebaSocket.IdPaciente = pruebaSocketActualizadaDTO.IdPaciente;
            pruebaSocket.ModificacionGeneral = pruebaSocketActualizadaDTO.ModificacionGeneral;
            pruebaSocket.QuienLaHizo = pruebaSocketActualizadaDTO.QuienLaHizo;
            pruebaSocket.FechaPrueba = pruebaSocketActualizadaDTO.FechaPrueba;
            pruebaSocket.PracticaMarcha = pruebaSocketActualizadaDTO.PracticaMarcha;
            pruebaSocket.FechaMantenimientoPostEntrega = pruebaSocketActualizadaDTO.FechaMantenimientoPostEntrega;
            pruebaSocket.SocketFallo = pruebaSocketActualizadaDTO.SocketFallo;
            pruebaSocket.FechaFallo = pruebaSocketActualizadaDTO.FechaFallo;
            pruebaSocket.MaterialRellenoUsado = pruebaSocketActualizadaDTO.MaterialRellenoUsado;
            pruebaSocket.IdComponente = pruebaSocketActualizadaDTO.IdComponente;
            pruebaSocket.IdUsuario = pruebaSocketActualizadaDTO.IdUsuario;
            pruebaSocket.IdSocket = pruebaSocketActualizadaDTO.IdSocket;
            pruebaSocket.PracticaRecibida = pruebaSocketActualizadaDTO.PracticaRecibida;
            pruebaSocket.DuracionTerapia = pruebaSocketActualizadaDTO.DuracionTerapia;
            pruebaSocket.FechaPractica = pruebaSocketActualizadaDTO.FechaPractica;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/pruebaSocket/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePruebaSocket(int id)
        {
            var pruebaSocket = await dbContext.PruebaSockets.FindAsync(id);
            if (pruebaSocket == null)
            {
                return NotFound();
            }

            dbContext.PruebaSockets.Remove(pruebaSocket);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


