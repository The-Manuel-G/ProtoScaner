using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedidaTranstibialController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTranstibialController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTranstibial
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTranstibial>>> GetMedidasTranstibial()
        {
            return Ok(await dbContext.MedidaTranstibials.ToListAsync());
        }

        // GET: api/medidaTranstibial/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTranstibial>> GetMedidaTranstibial(int id)
        {
            var medida = await dbContext.MedidaTranstibials.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }
            return Ok(medida);
        }

        // POST: api/medidaTranstibial
        [HttpPost]
        public async Task<ActionResult<MedidaTranstibial>> CreateMedidaTranstibial(MedidaTranstibial nuevaMedida)
        {
            dbContext.MedidaTranstibials.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedidaTranstibial), new { id = nuevaMedida.IdMedida }, nuevaMedida);
        }

        // PUT: api/medidaTranstibial/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTranstibial(int id, MedidaTranstibial medidaActualizada)
        {
            var medida = await dbContext.MedidaTranstibials.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdPaciente = medidaActualizada.IdPaciente;
            medida.IdEscaneo = medidaActualizada.IdEscaneo;
            medida.FechaEscaneo = medidaActualizada.FechaEscaneo;
            medida.Protesista = medidaActualizada.Protesista;
            medida.IdLiner = medidaActualizada.IdLiner;
            medida.Insidencia = medidaActualizada.Insidencia;
            medida.LongitudTotalMunon = medidaActualizada.LongitudTotalMunon;
            medida.Circunferencia3cm = medidaActualizada.Circunferencia3cm;
            medida.Circunferencia6cm = medidaActualizada.Circunferencia6cm;
            medida.Circunferencia9cm = medidaActualizada.Circunferencia9cm;
            medida.Circunferencia12cm = medidaActualizada.Circunferencia12cm;
            medida.Circunferencia15cm = medidaActualizada.Circunferencia15cm;
            medida.Circunferencia21cm = medidaActualizada.Circunferencia21cm;
            medida.Circunferencia24cm = medidaActualizada.Circunferencia24cm;
            medida.Circunferencia27cm = medidaActualizada.Circunferencia27cm;
            medida.Circunferencia30cm = medidaActualizada.Circunferencia30cm;
            medida.MlSobreRodilla = medidaActualizada.MlSobreRodilla;
            medida.ApTension = medidaActualizada.ApTension;
            medida.MlSupracondilar = medidaActualizada.MlSupracondilar;
            medida.MlTendon = medidaActualizada.MlTendon;
            medida.Notas = medidaActualizada.Notas;
            medida.LongitudOsea = medidaActualizada.LongitudOsea;
            medida.LongitudPies = medidaActualizada.LongitudPies;
            medida.AlturaTacon = medidaActualizada.AlturaTacon;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/medidaTranstibial/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedidaTranstibial(int id)
        {
            var medida = await dbContext.MedidaTranstibials.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            dbContext.MedidaTranstibials.Remove(medida);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

