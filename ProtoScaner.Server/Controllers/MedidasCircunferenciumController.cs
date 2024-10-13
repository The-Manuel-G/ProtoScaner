using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedidasCircunferenciumController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidasCircunferenciumController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidasCircunferencium
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidasCircunferencium>>> GetMedidasCircunferenciums()
        {
            return Ok(await dbContext.MedidasCircunferencia.ToListAsync());
        }

        // GET: api/medidasCircunferencium/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidasCircunferencium>> GetMedidaCircunferencium(int id)
        {
            var medidaCircunferencium = await dbContext.MedidasCircunferencia.FindAsync(id);
            if (medidaCircunferencium == null)
            {
                return NotFound();
            }
            return Ok(medidaCircunferencium);
        }

        // POST: api/medidasCircunferencium
        [HttpPost]
        public async Task<ActionResult<MedidasCircunferencium>> CreateMedidaCircunferencium(MedidasCircunferencium nuevaMedidaCircunferencium)
        {
            dbContext.MedidasCircunferencia.Add(nuevaMedidaCircunferencium);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedidaCircunferencium), new { id = nuevaMedidaCircunferencium.IdMedida }, nuevaMedidaCircunferencium);
        }

        // PUT: api/medidasCircunferencium/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaCircunferencium(int id, MedidasCircunferencium medidaCircunferenciumActualizada)
        {
            var medidaCircunferencium = await dbContext.MedidasCircunferencia.FindAsync(id);
            if (medidaCircunferencium == null)
            {
                return NotFound();
            }

            medidaCircunferencium.NumeroCircunferencia = medidaCircunferenciumActualizada.NumeroCircunferencia;
            medidaCircunferencium.ValorMm = medidaCircunferenciumActualizada.ValorMm;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/medidasCircunferencium/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedidaCircunferencium(int id)
        {
            var medidaCircunferencium = await dbContext.MedidasCircunferencia.FindAsync(id);
            if (medidaCircunferencium == null)
            {
                return NotFound();
            }

            dbContext.MedidasCircunferencia.Remove(medidaCircunferencium);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

