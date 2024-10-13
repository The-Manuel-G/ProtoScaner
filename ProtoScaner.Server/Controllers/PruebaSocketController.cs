using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<PruebaSocket>>> GetPruebaSockets()
        {
            return Ok(await dbContext.PruebaSockets.ToListAsync());
        }

        // GET: api/pruebaSocket/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PruebaSocket>> GetPruebaSocket(int id)
        {
            var pruebaSocket = await dbContext.PruebaSockets.FindAsync(id);
            if (pruebaSocket == null)
            {
                return NotFound();
            }
            return Ok(pruebaSocket);
        }

        // POST: api/pruebaSocket
        [HttpPost]
        public async Task<ActionResult<PruebaSocket>> CreatePruebaSocket(PruebaSocket nuevaPruebaSocket)
        {
            dbContext.PruebaSockets.Add(nuevaPruebaSocket);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPruebaSocket), new { id = nuevaPruebaSocket.IdPrueba }, nuevaPruebaSocket);
        }

        // PUT: api/pruebaSocket/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePruebaSocket(int id, PruebaSocket pruebaSocketActualizada)
        {
            var pruebaSocket = await dbContext.PruebaSockets.FindAsync(id);
            if (pruebaSocket == null)
            {
                return NotFound();
            }

            pruebaSocket.IdPaciente = pruebaSocketActualizada.IdPaciente;
            pruebaSocket.ModificacionGeneral = pruebaSocketActualizada.ModificacionGeneral;
            pruebaSocket.QuienLaHizo = pruebaSocketActualizada.QuienLaHizo;
            pruebaSocket.FechaPrueba = pruebaSocketActualizada.FechaPrueba;
            pruebaSocket.PracticaMarcha = pruebaSocketActualizada.PracticaMarcha;
            pruebaSocket.FechaMantenimientoPostEntrega = pruebaSocketActualizada.FechaMantenimientoPostEntrega;
            pruebaSocket.SocketFallo = pruebaSocketActualizada.SocketFallo;
            pruebaSocket.FechaFallo = pruebaSocketActualizada.FechaFallo;
            pruebaSocket.MaterialRellenoUsado = pruebaSocketActualizada.MaterialRellenoUsado;
            pruebaSocket.IdComponente = pruebaSocketActualizada.IdComponente;
            pruebaSocket.IdUsuario = pruebaSocketActualizada.IdUsuario;
            pruebaSocket.IdSocket = pruebaSocketActualizada.IdSocket;
            pruebaSocket.PracticaRecibida = pruebaSocketActualizada.PracticaRecibida;
            pruebaSocket.DuracionTerapia = pruebaSocketActualizada.DuracionTerapia;
            pruebaSocket.FechaPractica = pruebaSocketActualizada.FechaPractica;

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

