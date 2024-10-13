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
    public class MedidaTransfemoralPruebaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MedidaTransfemoralPruebaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/medidaTransfemoralPrueba
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedidaTransfemoralPruebaDTO>>> GetMedidasTransfemoralPrueba()
        {
            var medidas = await dbContext.MedidaTransfemoralPruebas
                .Select(m => new MedidaTransfemoralPruebaDTO
                {
                    IdMedida = m.IdMedida,
                    IdPaciente = m.IdPaciente,
                    IdPrueba = m.IdPrueba,
                    IdValor = m.IdValor,
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

        // GET: api/medidaTransfemoralPrueba/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoralPruebaDTO>> GetMedidaTransfemoralPrueba(int id)
        {
            var medida = await dbContext.MedidaTransfemoralPruebas.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            var medidaDTO = new MedidaTransfemoralPruebaDTO
            {
                IdMedida = medida.IdMedida,
                IdPaciente = medida.IdPaciente,
                IdPrueba = medida.IdPrueba,
                IdValor = medida.IdValor,
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

        // POST: api/medidaTransfemoralPrueba
        [HttpPost]
        public async Task<ActionResult<MedidaTransfemoralPruebaDTO>> CreateMedidaTransfemoralPrueba(MedidaTransfemoralPruebaDTO nuevaMedidaDTO)
        {
            var nuevaMedida = new MedidaTransfemoralPrueba
            {
                IdPaciente = nuevaMedidaDTO.IdPaciente,
                IdPrueba = nuevaMedidaDTO.IdPrueba,
                IdValor = nuevaMedidaDTO.IdValor,
                FotoMunon = nuevaMedidaDTO.FotoMunon,
                FechaEscaneo = nuevaMedidaDTO.FechaEscaneo,
                DisenadorSocket = nuevaMedidaDTO.DisenadorSocket,
                LongitudPie = nuevaMedidaDTO.LongitudPie,
                AlturaTalon = nuevaMedidaDTO.AlturaTalon,
                Medida1 = nuevaMedidaDTO.Medida1,
                Medida2 = nuevaMedidaDTO.Medida2,
                IdLiner = nuevaMedidaDTO.IdLiner
            };

            dbContext.MedidaTransfemoralPruebas.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedida = nuevaMedida.IdMedida;

            return CreatedAtAction(nameof(GetMedidaTransfemoralPrueba), new { id = nuevaMedida.IdMedida }, nuevaMedidaDTO);
        }

        // PUT: api/medidaTransfemoralPrueba/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMedidaTransfemoralPrueba(int id, MedidaTransfemoralPruebaDTO medidaActualizadaDTO)
        {
            var medida = await dbContext.MedidaTransfemoralPruebas.FindAsync(id);
            if (medida == null)
            {
                return NotFound();
            }

            medida.IdPaciente = medidaActualizadaDTO.IdPaciente;
            medida.IdPrueba = medidaActualizadaDTO.IdPrueba;
            medida.IdValor = medidaActualizadaDTO.IdValor;
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


