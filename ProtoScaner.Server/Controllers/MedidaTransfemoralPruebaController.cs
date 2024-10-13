using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedidaTransfemoralPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTransfemoralPruebaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTransfemoralPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTransfemoralPrueba>>> GetMedidasTransfemoralPrueba()
        {
            return Ok(await dbContext.MedidaTransfemoralPruebas.ToListAsync());
        }

        // GET: api/medidaTransfemoralPrueba/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoralPrueba>> GetMedidaTransfemoralPrueba(int id)
        {
            var medida = await dbContext.MedidaTransfemoralPruebas.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }
            return Ok(medida);
        }

        // POST: api/medidaTransfemoralPrueba
        [HttpPost]
        public async Task<ActionResult<MedidaTransfemoralPrueba>> CreateMedidaTransfemoralPrueba(MedidaTransfemoralPrueba nuevaMedida)
        {
            dbContext.MedidaTransfemoralPruebas.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedidaTransfemoralPrueba), new { id = nuevaMedida.IdMedida }, nuevaMedida);
        }

        // PUT: api/medidaTransfemoralPrueba/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTransfemoralPrueba(int id, MedidaTransfemoralPrueba medidaActualizada)
        {
            var medida = await dbContext.MedidaTransfemoralPruebas.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdPaciente = medidaActualizada.IdPaciente;
            medida.IdPrueba = medidaActualizada.IdPrueba;
            medida.IdValor = medidaActualizada.IdValor;
            medida.FotoMunon = medidaActualizada.FotoMunon;
            medida.FechaEscaneo = medidaActualizada.FechaEscaneo;
            medida.DisenadorSocket = medidaActualizada.DisenadorSocket;
            medida.LongitudPie = medidaActualizada.LongitudPie;
            medida.AlturaTalon = medidaActualizada.AlturaTalon;
            medida.Medida1 = medidaActualizada.Medida1;
            medida.Medida2 = medidaActualizada.Medida2;
            medida.IdLiner = medidaActualizada.IdLiner;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/medidaTransfemoralPrueba/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedidaTransfemoralPrueba(int id)
        {
            var medida = await dbContext.MedidaTransfemoralPruebas.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            dbContext.MedidaTransfemoralPruebas.Remove(medida);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

