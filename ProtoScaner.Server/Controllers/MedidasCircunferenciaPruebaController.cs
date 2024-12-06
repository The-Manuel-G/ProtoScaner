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
    public class MedidasCircunferenciaPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidasCircunferenciaPruebaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidasCircunferenciaPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidasCircunferenciaPruebaDTO>>> GetMedidasCircunferenciaPruebas()
        {
            var medidas = await dbContext.MedidasCircunferenciaPruebas
                .Select(m => new MedidasCircunferenciaPruebaDTO
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

        // GET: api/medidasCircunferenciaPrueba/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidasCircunferenciaPruebaDTO>> GetMedidaCircunferenciaPrueba(int id)
        {
            var medidaCircunferenciaPrueba = await dbContext.MedidasCircunferenciaPruebas.FindAsync(id);
            if (medidaCircunferenciaPrueba == null)
            {
                return NotFound();
            }

            var medidaDTO = new MedidasCircunferenciaPruebaDTO
            {
                IdMedida = medidaCircunferenciaPrueba.IdMedida,
                IdValor = medidaCircunferenciaPrueba.IdValor,
                NumeroCircunferencia = medidaCircunferenciaPrueba.NumeroCircunferencia,
                ValorMmSinPresion = medidaCircunferenciaPrueba.ValorMmSinPresion,
                ValorMmConPresion = medidaCircunferenciaPrueba.ValorMmConPresion
            };

            return Ok(medidaDTO);
        }

        // POST: api/medidasCircunferenciaPrueba
        [HttpPost]
        public async Task<ActionResult<MedidasCircunferenciaPruebaDTO>> CreateMedidaCircunferenciaPrueba(MedidasCircunferenciaPruebaDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidasCircunferenciaPrueba
            {
                IdValor = nuevaMedidaDTO.IdValor,
                NumeroCircunferencia = nuevaMedidaDTO.NumeroCircunferencia,
                ValorMmSinPresion = nuevaMedidaDTO.ValorMmSinPresion,
                ValorMmConPresion = (decimal)nuevaMedidaDTO.ValorMmConPresion
            };

            dbContext.MedidasCircunferenciaPruebas.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedida = nuevaMedida.IdMedida;

            return CreatedAtAction(nameof(GetMedidaCircunferenciaPrueba), new { id = nuevaMedida.IdMedida }, nuevaMedidaDTO);
        }

        // PUT: api/medidasCircunferenciaPrueba/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaCircunferenciaPrueba(int id, MedidasCircunferenciaPruebaDTO medidaActualizadaDTO)
        {
            var medidaCircunferenciaPrueba = await dbContext.MedidasCircunferenciaPruebas.FindAsync(id);
            if (medidaCircunferenciaPrueba == null)
            {
                return NotFound();
            }

            medidaCircunferenciaPrueba.NumeroCircunferencia = medidaActualizadaDTO.NumeroCircunferencia;
            medidaCircunferenciaPrueba.ValorMmSinPresion = medidaActualizadaDTO.ValorMmSinPresion;
            medidaCircunferenciaPrueba.ValorMmConPresion = (decimal)medidaActualizadaDTO.ValorMmConPresion;


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


