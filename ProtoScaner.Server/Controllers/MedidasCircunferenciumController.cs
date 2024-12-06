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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidasCircunferenciumDTO>>> GetMedidasCircunferenciums()
        {
            var medidas = await dbContext.MedidasCircunferencia
                .Select(m => new MedidasCircunferenciumDTO
                {
                    IdMedida = m.IdMedida,
                    IdValor = m.IdValor ?? 0, // Valor predeterminado para null
                    NumeroCircunferencia = m.NumeroCircunferencia ?? 0, // Valor predeterminado para null
                    ValorMmSinPresion = m.ValorMmSinPresion,
                    ValorMmConPresion = m.ValorMmConPresion
                })
                .ToListAsync();

            return Ok(medidas);
        }

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
                IdValor = medidaCircunferencium.IdValor ?? 0, // Valor predeterminado para null
                NumeroCircunferencia = medidaCircunferencium.NumeroCircunferencia ?? 0, // Valor predeterminado para null
                ValorMmSinPresion = medidaCircunferencium.ValorMmSinPresion,
                ValorMmConPresion = medidaCircunferencium.ValorMmConPresion
            };

            return Ok(medidaDTO);
        }

        [HttpPost]
        public async Task<ActionResult<MedidasCircunferenciumDTO>> CreateMedidaCircunferencium(MedidasCircunferenciumDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidasCircunferencium
            {
                IdValor = nuevaMedidaDTO.IdValor,
                NumeroCircunferencia = nuevaMedidaDTO.NumeroCircunferencia,
                ValorMmSinPresion = nuevaMedidaDTO.ValorMmSinPresion ?? 0, // Manejar valores null
                ValorMmConPresion = nuevaMedidaDTO.ValorMmConPresion ?? 0  // Manejar valores null
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

            medidaCircunferencium.IdValor = medidaActualizadaDTO.IdValor;
            medidaCircunferencium.NumeroCircunferencia = medidaActualizadaDTO.NumeroCircunferencia;
            medidaCircunferencium.ValorMmSinPresion = medidaActualizadaDTO.ValorMmSinPresion ?? 0;
            medidaCircunferencium.ValorMmConPresion = medidaActualizadaDTO.ValorMmConPresion ?? 0;

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
