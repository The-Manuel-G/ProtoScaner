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
    public class EntregaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public EntregaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/entrega
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetEntregas()
        {
            var entregas = await dbContext.Entregas
                .Select(e => new EntregaDTO
                {
                    IdEntregas = e.IdEntregas,
                    IdPaciente = e.IdPaciente,
                    IdProtesis = e.IdProtesis,
                    IdUsuario = e.IdUsuario,
                    Reduccion = e.Reduccion,
                    GeneralModificacion = e.GeneralModificacion,
                    Otros = e.Otros,
                    IdPruebaSocket = e.IdPruebaSocket,
                    Insidencia = e.Insidencia,
                    MaterialRelleno = e.MaterialRelleno,
                    FechaEntrega = e.FechaEntrega,
                    PracticaMarcha = e.PracticaMarcha,
                    MantenimientoPostEntrega = e.MantenimientoPostEntrega,
                    IdMantenimiento = e.IdMantenimiento,
                    FirmaDescargoComponenteLista = e.FirmaDescargoComponenteLista
                })
                .ToListAsync();

            return Ok(entregas);
        }

        // GET: api/entrega/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EntregaDTO>> GetEntrega(int id)
        {
            var entrega = await dbContext.Entregas.FindAsync(id);
            if (entrega == null)
            {
                return NotFound();
            }

            var entregaDTO = new EntregaDTO
            {
                IdEntregas = entrega.IdEntregas,
                IdPaciente = entrega.IdPaciente,
                IdProtesis = entrega.IdProtesis,
                IdUsuario = entrega.IdUsuario,
                Reduccion = entrega.Reduccion,
                GeneralModificacion = entrega.GeneralModificacion,
                Otros = entrega.Otros,
                IdPruebaSocket = entrega.IdPruebaSocket,
                Insidencia = entrega.Insidencia,
                MaterialRelleno = entrega.MaterialRelleno,
                FechaEntrega = entrega.FechaEntrega,
                PracticaMarcha = entrega.PracticaMarcha,
                MantenimientoPostEntrega = entrega.MantenimientoPostEntrega,
                IdMantenimiento = entrega.IdMantenimiento,
                FirmaDescargoComponenteLista = entrega.FirmaDescargoComponenteLista
            };

            return Ok(entregaDTO);
        }

        // POST: api/entrega
        [HttpPost]
        public async Task<ActionResult<EntregaDTO>> CreateEntrega(EntregaDTO nuevaEntregaDTO)
        {
            var nuevaEntrega = new Entrega
            {
                IdPaciente = nuevaEntregaDTO.IdPaciente,
                IdProtesis = nuevaEntregaDTO.IdProtesis,
                IdUsuario = nuevaEntregaDTO.IdUsuario,
                Reduccion = nuevaEntregaDTO.Reduccion,
                GeneralModificacion = nuevaEntregaDTO.GeneralModificacion,
                Otros = nuevaEntregaDTO.Otros,
                IdPruebaSocket = nuevaEntregaDTO.IdPruebaSocket,
                Insidencia = nuevaEntregaDTO.Insidencia,
                MaterialRelleno = nuevaEntregaDTO.MaterialRelleno,
                FechaEntrega = nuevaEntregaDTO.FechaEntrega,
                PracticaMarcha = nuevaEntregaDTO.PracticaMarcha,
                MantenimientoPostEntrega = nuevaEntregaDTO.MantenimientoPostEntrega,
                IdMantenimiento = nuevaEntregaDTO.IdMantenimiento,
                FirmaDescargoComponenteLista = nuevaEntregaDTO.FirmaDescargoComponenteLista
            };

            dbContext.Entregas.Add(nuevaEntrega);
            await dbContext.SaveChangesAsync();

            nuevaEntregaDTO.IdEntregas = nuevaEntrega.IdEntregas;

            return CreatedAtAction(nameof(GetEntrega), new { id = nuevaEntrega.IdEntregas }, nuevaEntregaDTO);
        }

        // PUT: api/entrega/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEntrega(int id, EntregaDTO entregaActualizadaDTO)
        {
            var entrega = await dbContext.Entregas.FindAsync(id);
            if (entrega == null)
            {
                return NotFound();
            }

            entrega.IdPaciente = entregaActualizadaDTO.IdPaciente;
            entrega.IdProtesis = entregaActualizadaDTO.IdProtesis;
            entrega.IdUsuario = entregaActualizadaDTO.IdUsuario;
            entrega.Reduccion = entregaActualizadaDTO.Reduccion;
            entrega.GeneralModificacion = entregaActualizadaDTO.GeneralModificacion;
            entrega.Otros = entregaActualizadaDTO.Otros;
            entrega.IdPruebaSocket = entregaActualizadaDTO.IdPruebaSocket;
            entrega.Insidencia = entregaActualizadaDTO.Insidencia;
            entrega.MaterialRelleno = entregaActualizadaDTO.MaterialRelleno;
            entrega.FechaEntrega = entregaActualizadaDTO.FechaEntrega;
            entrega.PracticaMarcha = entregaActualizadaDTO.PracticaMarcha;
            entrega.MantenimientoPostEntrega = entregaActualizadaDTO.MantenimientoPostEntrega;
            entrega.IdMantenimiento = entregaActualizadaDTO.IdMantenimiento;
            entrega.FirmaDescargoComponenteLista = entregaActualizadaDTO.FirmaDescargoComponenteLista;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/entrega/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEntrega(int id)
        {
            var entrega = await dbContext.Entregas.FindAsync(id);
            if (entrega == null)
            {
                return NotFound();
            }

            dbContext.Entregas.Remove(entrega);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
