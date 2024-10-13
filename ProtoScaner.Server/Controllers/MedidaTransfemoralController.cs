using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedidaTransfemoralController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTransfemoralController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTransfemoral
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTransfemoral>>> GetMedidasTransfemoral()
        {
            return Ok(await dbContext.MedidaTransfemorals.ToListAsync());
        }

        // GET: api/medidaTransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoral>> GetMedidaTransfemoral(int id)
        {
            var medida = await dbContext.MedidaTransfemorals.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }
            return Ok(medida);
        }

        // POST: api/medidaTransfemoral
        [HttpPost]
        public async Task<ActionResult<MedidaTransfemoral>> CreateMedidaTransfemoral(MedidaTransfemoral nuevaMedida)
        {
            dbContext.MedidaTransfemorals.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedidaTransfemoral), new { id = nuevaMedida.IdMedidaT }, nuevaMedida);
        }

        // PUT: api/medidaTransfemoral/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTransfemoral(int id, MedidaTransfemoral medidaActualizada)
        {
            var medida = await dbContext.MedidaTransfemorals.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdEscaneo = medidaActualizada.IdEscaneo;
            medida.IdValor = medidaActualizada.IdValor;
            medida.IdPaciente = medidaActualizada.IdPaciente;
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

        // DELETE: api/medidaTransfemoral/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedidaTransfemoral(int id)
        {
            var medida = await dbContext.MedidaTransfemorals.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            dbContext.MedidaTransfemorals.Remove(medida);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

