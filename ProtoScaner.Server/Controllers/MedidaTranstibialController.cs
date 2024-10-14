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
    public class MedidaTranstibialController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTranstibialController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTranstibial
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTranstibialDTO>>> GetMedidasTranstibial()
        {
            var medidas = await dbContext.MedidaTranstibials
                .Select(m => new MedidaTranstibialDTO
                {
                    IdMedida = m.IdMedida,
                    IdPaciente = m.IdPaciente,
                    IdEscaneo = m.IdEscaneo,
                    FechaEscaneo = m.FechaEscaneo,
                    Protesista = m.Protesista,
                    IdLiner = m.IdLiner,
                    Insidencia = m.Insidencia,
                    LongitudTotalMunon = m.LongitudTotalMunon,
                    Circunferencia3cm = m.Circunferencia3cm,
                    Circunferencia6cm = m.Circunferencia6cm,
                    Circunferencia9cm = m.Circunferencia9cm,
                    Circunferencia12cm = m.Circunferencia12cm,
                    Circunferencia15cm = m.Circunferencia15cm,
                    Circunferencia21cm = m.Circunferencia21cm,
                    Circunferencia24cm = m.Circunferencia24cm,
                    Circunferencia27cm = m.Circunferencia27cm,
                    Circunferencia30cm = m.Circunferencia30cm,
                    MlSobreRodilla = m.MlSobreRodilla,
                    ApTension = m.ApTension,
                    MlSupracondilar = m.MlSupracondilar,
                    MlTendon = m.MlTendon,
                    Notas = m.Notas,
                    LongitudOsea = m.LongitudOsea,
                    LongitudPies = m.LongitudPies,
                    AlturaTacon = m.AlturaTacon
                })
                .ToListAsync();

            return Ok(medidas);
        }

        // GET: api/medidaTranstibial/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTranstibialDTO>> GetMedidaTranstibial(int id)
        {
            var medida = await dbContext.MedidaTranstibials.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            var medidaDTO = new MedidaTranstibialDTO
            {
                IdMedida = medida.IdMedida,
                IdPaciente = medida.IdPaciente,
                IdEscaneo = medida.IdEscaneo,
                FechaEscaneo = medida.FechaEscaneo,
                Protesista = medida.Protesista,
                IdLiner = medida.IdLiner,
                Insidencia = medida.Insidencia,
                LongitudTotalMunon = medida.LongitudTotalMunon,
                Circunferencia3cm = medida.Circunferencia3cm,
                Circunferencia6cm = medida.Circunferencia6cm,
                Circunferencia9cm = medida.Circunferencia9cm,
                Circunferencia12cm = medida.Circunferencia12cm,
                Circunferencia15cm = medida.Circunferencia15cm,
                Circunferencia21cm = medida.Circunferencia21cm,
                Circunferencia24cm = medida.Circunferencia24cm,
                Circunferencia27cm = medida.Circunferencia27cm,
                Circunferencia30cm = medida.Circunferencia30cm,
                MlSobreRodilla = medida.MlSobreRodilla,
                ApTension = medida.ApTension,
                MlSupracondilar = medida.MlSupracondilar,
                MlTendon = medida.MlTendon,
                Notas = medida.Notas,
                LongitudOsea = medida.LongitudOsea,
                LongitudPies = medida.LongitudPies,
                AlturaTacon = medida.AlturaTacon
            };

            return Ok(medidaDTO);
        }

        // POST: api/medidaTranstibial
        [HttpPost]
        public async Task<ActionResult<MedidaTranstibialDTO>> CreateMedidaTranstibial(MedidaTranstibialDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidaTranstibial
            {
                IdPaciente = nuevaMedidaDTO.IdPaciente,
                IdEscaneo = nuevaMedidaDTO.IdEscaneo,
                FechaEscaneo = nuevaMedidaDTO.FechaEscaneo,
                Protesista = nuevaMedidaDTO.Protesista,
                IdLiner = nuevaMedidaDTO.IdLiner,
                Insidencia = nuevaMedidaDTO.Insidencia,
                LongitudTotalMunon = nuevaMedidaDTO.LongitudTotalMunon,
                Circunferencia3cm = nuevaMedidaDTO.Circunferencia3cm,
                Circunferencia6cm = nuevaMedidaDTO.Circunferencia6cm,
                Circunferencia9cm = nuevaMedidaDTO.Circunferencia9cm,
                Circunferencia12cm = nuevaMedidaDTO.Circunferencia12cm,
                Circunferencia15cm = nuevaMedidaDTO.Circunferencia15cm,
                Circunferencia21cm = nuevaMedidaDTO.Circunferencia21cm,
                Circunferencia24cm = nuevaMedidaDTO.Circunferencia24cm,
                Circunferencia27cm = nuevaMedidaDTO.Circunferencia27cm,
                Circunferencia30cm = nuevaMedidaDTO.Circunferencia30cm,
                MlSobreRodilla = nuevaMedidaDTO.MlSobreRodilla,
                ApTension = nuevaMedidaDTO.ApTension,
                MlSupracondilar = nuevaMedidaDTO.MlSupracondilar,
                MlTendon = nuevaMedidaDTO.MlTendon,
                Notas = nuevaMedidaDTO.Notas,
                LongitudOsea = nuevaMedidaDTO.LongitudOsea,
                LongitudPies = nuevaMedidaDTO.LongitudPies,
                AlturaTacon = nuevaMedidaDTO.AlturaTacon
            };

            dbContext.MedidaTranstibials.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedida = nuevaMedida.IdMedida;

            return CreatedAtAction(nameof(GetMedidaTranstibial), new { id = nuevaMedida.IdMedida }, nuevaMedidaDTO);
        }

        // PUT: api/medidaTranstibial/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTranstibial(int id, MedidaTranstibialDTO medidaActualizadaDTO)
        {
            var medida = await dbContext.MedidaTranstibials.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdPaciente = medidaActualizadaDTO.IdPaciente;
            medida.IdEscaneo = medidaActualizadaDTO.IdEscaneo;
            medida.FechaEscaneo = medidaActualizadaDTO.FechaEscaneo;
            medida.Protesista = medidaActualizadaDTO.Protesista;
            medida.IdLiner = medidaActualizadaDTO.IdLiner;
            medida.Insidencia = medidaActualizadaDTO.Insidencia;
            medida.LongitudTotalMunon = medidaActualizadaDTO.LongitudTotalMunon;
            medida.Circunferencia3cm = medidaActualizadaDTO.Circunferencia3cm;
            medida.Circunferencia6cm = medidaActualizadaDTO.Circunferencia6cm;
            medida.Circunferencia9cm = medidaActualizadaDTO.Circunferencia9cm;
            medida.Circunferencia12cm = medidaActualizadaDTO.Circunferencia12cm;
            medida.Circunferencia15cm = medidaActualizadaDTO.Circunferencia15cm;
            medida.Circunferencia21cm = medidaActualizadaDTO.Circunferencia21cm;
            medida.Circunferencia24cm = medidaActualizadaDTO.Circunferencia24cm;
            medida.Circunferencia27cm = medidaActualizadaDTO.Circunferencia27cm;
            medida.Circunferencia30cm = medidaActualizadaDTO.Circunferencia30cm;
            medida.MlSobreRodilla = medidaActualizadaDTO.MlSobreRodilla;
            medida.ApTension = medidaActualizadaDTO.ApTension;
            medida.MlSupracondilar = medidaActualizadaDTO.MlSupracondilar;
            medida.MlTendon = medidaActualizadaDTO.MlTendon;
            medida.Notas = medidaActualizadaDTO.Notas;
            medida.LongitudOsea = medidaActualizadaDTO.LongitudOsea;
            medida.LongitudPies = medidaActualizadaDTO.LongitudPies;
            medida.AlturaTacon = medidaActualizadaDTO.AlturaTacon;

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


