using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<Entrega>>> GetEntregas()
        {
            return Ok(await dbContext.Entregas.ToListAsync());
        }

        // GET: api/entrega/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Entrega>> GetEntrega(int id)
        {
            var entrega = await dbContext.Entregas.FindAsync(id);
            if (entrega == null)
            {
                return NotFound();
            }
            return Ok(entrega);
        }

        // POST: api/entrega
        [HttpPost]
        public async Task<ActionResult<Entrega>> CreateEntrega(Entrega nuevaEntrega)
        {
            dbContext.Entregas.Add(nuevaEntrega);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEntrega), new { id = nuevaEntrega.IdEntregas }, nuevaEntrega);
        }

        // PUT: api/entrega/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEntrega(int id, Entrega entregaActualizada)
        {
            var entrega = await dbContext.Entregas.FindAsync(id);
            if (entrega == null)
            {
                return NotFound();
            }

            entrega.IdPaciente = entregaActualizada.IdPaciente;
            entrega.IdProtesis = entregaActualizada.IdProtesis;
            entrega.IdUsuario = entregaActualizada.IdUsuario;
            entrega.Reduccion = entregaActualizada.Reduccion;
            entrega.GeneralModificacion = entregaActualizada.GeneralModificacion;
            entrega.Otros = entregaActualizada.Otros;
            entrega.IdPruebaSocket = entregaActualizada.IdPruebaSocket;
            entrega.Insidencia = entregaActualizada.Insidencia;
            entrega.MaterialRelleno = entregaActualizada.MaterialRelleno;
            entrega.FechaEntrega = entregaActualizada.FechaEntrega;
            entrega.PracticaMarcha = entregaActualizada.PracticaMarcha;
            entrega.MantenimientoPostEntrega = entregaActualizada.MantenimientoPostEntrega;
            entrega.IdMantenimiento = entregaActualizada.IdMantenimiento;
            entrega.FirmaDescargoComponenteLista = entregaActualizada.FirmaDescargoComponenteLista;

            await dbContext.SaveChangesAsync();
            return NoContent(); // Aquí se devuelve un NoContent al finalizar correctamente
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

