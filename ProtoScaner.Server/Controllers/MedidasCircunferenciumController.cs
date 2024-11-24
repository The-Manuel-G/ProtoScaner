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
    public class MedidasCircunferenciumController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidasCircunferenciumController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidasCircunferencium
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidasCircunferenciumDTO>>> GetMedidasCircunferenciums()
        {
            var medidas = await dbContext.MedidasCircunferencia
                .Select(m => new MedidasCircunferenciumDTO
                {
                    IdMedida = m.IdMedida,
                    IdValor = m.IdValor,
                    NumeroCircunferencia = m.NumeroCircunferencia,
                    ValorMmSinPresion = m.ValorMmSinPresion,
                    ValorMmConPresion = m.ValorMmConPresion
                })
                .ToListAsync();

            return Ok(medidas);
        }

        // GET: api/medidasCircunferencium/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidasCircunferenciumDTO>> GetMedidaCircunferencium(int id)
        {
            var medidaCircunferencium = await dbContext.MedidasCircunferencia.FindAsync(id);
            if (medidaCircunferencium == null)
            {
                return NotFound();
            }

            var medidaDTO = new MedidasCircunferenciumDTO
            {
                IdMedida = medidaCircunferencium.IdMedida,
                IdValor = medidaCircunferencium.IdValor,
                NumeroCircunferencia = medidaCircunferencium.NumeroCircunferencia,
                ValorMmSinPresion = medidaCircunferencium.ValorMmSinPresion,
                ValorMmConPresion = medidaCircunferencium.ValorMmConPresion
            };

            return Ok(medidaDTO);
        }

        // POST: api/medidasCircunferencium
        [HttpPost]
        public async Task<ActionResult<MedidasCircunferenciumDTO>> CreateMedidaCircunferencium(MedidasCircunferenciumDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidasCircunferencium
            {
                IdValor = nuevaMedidaDTO.IdValor,
                NumeroCircunferencia = nuevaMedidaDTO.NumeroCircunferencia,
                ValorMmSinPresion = (decimal)nuevaMedidaDTO.ValorMmSinPresion,
                ValorMmConPresion = (decimal)nuevaMedidaDTO.ValorMmConPresion
            };

            dbContext.MedidasCircunferencia.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedida = nuevaMedida.IdMedida;

            return CreatedAtAction(nameof(GetMedidaCircunferencium), new { id = nuevaMedida.IdMedida }, nuevaMedidaDTO);
        }

        // PUT: api/medidasCircunferencium/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaCircunferencium(int id, MedidasCircunferenciumDTO medidaActualizadaDTO)
        {
            var medidaCircunferencium = await dbContext.MedidasCircunferencia.FindAsync(id);
            if (medidaCircunferencium == null)
            {
                return NotFound();
            }

            medidaCircunferencium.NumeroCircunferencia = medidaActualizadaDTO.NumeroCircunferencia;
            medidaCircunferencium.ValorMmSinPresion = (decimal)medidaActualizadaDTO.ValorMmSinPresion;
            medidaCircunferencium.ValorMmConPresion = (decimal)medidaActualizadaDTO.ValorMmConPresion;

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


