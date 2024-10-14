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
    public class MedidaTransfemoralController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTransfemoralController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTransfemoral
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTransfemoralDTO>>> GetMedidasTransfemoral()
        {
            var medidas = await dbContext.MedidaTransfemorals
                .Select(m => new MedidaTransfemoralDTO
                {
                    IdMedidaT = m.IdMedidaT,
                    IdEscaneo = m.IdEscaneo,
                    IdValor = m.IdValor,
                    IdPaciente = m.IdPaciente,
                    FotoMunon = m.FotoMunon,
                    FechaEscaneo = m.FechaEscaneo,
                    DisenadorSocket = m.DisenadorSocket,
                    LongitudPie = m.LongitudPie,
                    AlturaTalon = m.AlturaTalon,
                    Medida1 = m.Medida1,
                    Medida2 = m.Medida2,
                    IdLiner = m.IdLiner
                })
                .ToListAsync();

            return Ok(medidas);
        }

        // GET: api/medidaTransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoralDTO>> GetMedidaTransfemoral(int id)
        {
            var medida = await dbContext.MedidaTransfemorals.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            var medidaDTO = new MedidaTransfemoralDTO
            {
                IdMedidaT = medida.IdMedidaT,
                IdEscaneo = medida.IdEscaneo,
                IdValor = medida.IdValor,
                IdPaciente = medida.IdPaciente,
                FotoMunon = medida.FotoMunon,
                FechaEscaneo = medida.FechaEscaneo,
                DisenadorSocket = medida.DisenadorSocket,
                LongitudPie = medida.LongitudPie,
                AlturaTalon = medida.AlturaTalon,
                Medida1 = medida.Medida1,
                Medida2 = medida.Medida2,
                IdLiner = medida.IdLiner
            };

            return Ok(medidaDTO);
        }

        // POST: api/medidaTransfemoral
        [HttpPost]
        public async Task<ActionResult<MedidaTransfemoralDTO>> CreateMedidaTransfemoral(MedidaTransfemoralDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidaTransfemoral
            {
                IdEscaneo = nuevaMedidaDTO.IdEscaneo,
                IdValor = nuevaMedidaDTO.IdValor,
                IdPaciente = nuevaMedidaDTO.IdPaciente,
                FotoMunon = nuevaMedidaDTO.FotoMunon,
                FechaEscaneo = nuevaMedidaDTO.FechaEscaneo,
                DisenadorSocket = nuevaMedidaDTO.DisenadorSocket,
                LongitudPie = nuevaMedidaDTO.LongitudPie,
                AlturaTalon = nuevaMedidaDTO.AlturaTalon,
                Medida1 = nuevaMedidaDTO.Medida1,
                Medida2 = nuevaMedidaDTO.Medida2,
                IdLiner = nuevaMedidaDTO.IdLiner
            };

            dbContext.MedidaTransfemorals.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedidaT = nuevaMedida.IdMedidaT;

            return CreatedAtAction(nameof(GetMedidaTransfemoral), new { id = nuevaMedida.IdMedidaT }, nuevaMedidaDTO);
        }

        // PUT: api/medidaTransfemoral/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTransfemoral(int id, MedidaTransfemoralDTO medidaActualizadaDTO)
        {
            var medida = await dbContext.MedidaTransfemorals.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdEscaneo = medidaActualizadaDTO.IdEscaneo;
            medida.IdValor = medidaActualizadaDTO.IdValor;
            medida.IdPaciente = medidaActualizadaDTO.IdPaciente;
            medida.FotoMunon = medidaActualizadaDTO.FotoMunon;
            medida.FechaEscaneo = medidaActualizadaDTO.FechaEscaneo;
            medida.DisenadorSocket = medidaActualizadaDTO.DisenadorSocket;
            medida.LongitudPie = medidaActualizadaDTO.LongitudPie;
            medida.AlturaTalon = medidaActualizadaDTO.AlturaTalon;
            medida.Medida1 = medidaActualizadaDTO.Medida1;
            medida.Medida2 = medidaActualizadaDTO.Medida2;
            medida.IdLiner = medidaActualizadaDTO.IdLiner;

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


