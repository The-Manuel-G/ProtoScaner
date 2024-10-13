using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedidasCircunferenciaPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidasCircunferenciaPruebaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidasCircunferenciaPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidasCircunferenciaPrueba>>> GetMedidasCircunferenciaPruebas()
        {
            return Ok(await dbContext.MedidasCircunferenciaPruebas.ToListAsync());
        }

        // GET: api/medidasCircunferenciaPrueba/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidasCircunferenciaPrueba>> GetMedidaCircunferenciaPrueba(int id)
        {
            var medidaCircunferenciaPrueba = await dbContext.MedidasCircunferenciaPruebas.FindAsync(id);
            if (medidaCircunferenciaPrueba == null)
            {
                return NotFound();
            }
            return Ok(medidaCircunferenciaPrueba);
        }

        // POST: api/medidasCircunferenciaPrueba
        [HttpPost]
        public async Task<ActionResult<MedidasCircunferenciaPrueba>> CreateMedidaCircunferenciaPrueba(MedidasCircunferenciaPrueba nuevaMedidaCircunferenciaPrueba)
        {
            dbContext.MedidasCircunferenciaPruebas.Add(nuevaMedidaCircunferenciaPrueba);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedidaCircunferenciaPrueba), new { id = nuevaMedidaCircunferenciaPrueba.IdMedida }, nuevaMedidaCircunferenciaPrueba);
        }

        // PUT: api/medidasCircunferenciaPrueba/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaCircunferenciaPrueba(int id, MedidasCircunferenciaPrueba medidaCircunferenciaPruebaActualizada)
        {
            var medidaCircunferenciaPrueba = await dbContext.MedidasCircunferenciaPruebas.FindAsync(id);
            if (medidaCircunferenciaPrueba == null)
            {
                return NotFound();
            }

            medidaCircunferenciaPrueba.NumeroCircunferencia = medidaCircunferenciaPruebaActualizada.NumeroCircunferencia;
            medidaCircunferenciaPrueba.ValorMm = medidaCircunferenciaPruebaActualizada.ValorMm;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/medidasCircunferenciaPrueba/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedidaCircunferenciaPrueba(int id)
        {
            var medidaCircunferenciaPrueba = await dbContext.MedidasCircunferenciaPruebas.FindAsync(id);
            if (medidaCircunferenciaPrueba == null)
            {
                return NotFound();
            }

            dbContext.MedidasCircunferenciaPruebas.Remove(medidaCircunferenciaPrueba);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

