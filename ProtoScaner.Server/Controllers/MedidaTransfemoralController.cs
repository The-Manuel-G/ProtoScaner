using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;
using ProtoScaner.Server.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                .Include(m => m.MedidasCircunferencia)
                .Select(m => MapToDTO(m))
                .ToListAsync();

            return Ok(medidas);
        }

        // GET: api/medidaTransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoralDTO>> GetMedidaTransfemoralById(int id)
        {
            var medida = await dbContext.MedidaTransfemorals
                .Include(m => m.MedidasCircunferencia)
                .FirstOrDefaultAsync(m => m.IdMedidaT == id);

            if (medida == null)
            {
                return NotFound($"No se encontró la medida transfemoral con ID {id}");
            }

            return Ok(MapToDTO(medida));
        }

        // POST: api/medidaTransfemoral
        [HttpPost]
        public async Task<ActionResult<MedidaTransfemoralDTO>> CreateMedidaTransfemoral(MedidaTransfemoralDTO nuevaMedidaDTO)
        {
            if (nuevaMedidaDTO == null)
            {
                return BadRequest("Los datos de la medida no pueden estar vacíos.");
            }

            var nuevaMedida = new MedidaTransfemoral
            {
                IdEscaneo = nuevaMedidaDTO.IdEscaneo,
                IdValor = nuevaMedidaDTO.IdValor,
                IdPaciente = nuevaMedidaDTO.IdPaciente,
                FotoMunon = !string.IsNullOrEmpty(nuevaMedidaDTO.FotoMunon) ? Convert.FromBase64String(nuevaMedidaDTO.FotoMunon) : null,
                FechaEscaneo = nuevaMedidaDTO.FechaEscaneo != default ? DateOnly.FromDateTime(nuevaMedidaDTO.FechaEscaneo) : null,
                DisenadorSocket = nuevaMedidaDTO.DisenadorSocket,
                LongitudPie = nuevaMedidaDTO.LongitudPie?.ToString(),
                AlturaTalon = nuevaMedidaDTO.AlturaTalon?.ToString(),
                Medida1 = nuevaMedidaDTO.Medida1?.ToString(),
                Medida2 = nuevaMedidaDTO.Medida2?.ToString(),
                IdLiner = nuevaMedidaDTO.IdLiner,
                MedidasCircunferencia = nuevaMedidaDTO.Circunferencias.Select(c => new MedidasCircunferencium
                {
                    IdValor = c.IdValor  ,
                    NumeroCircunferencia = c.NumeroCircunferencia,
                    ValorMmSinPresion = c.ValorMmSinPresion ?? 0,
                    ValorMmConPresion = c.ValorMmConPresion ?? 0
                }).ToList()
            };

            dbContext.MedidaTransfemorals.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedidaT = nuevaMedida.IdMedidaT;

            return CreatedAtAction(nameof(GetMedidaTransfemoralById), new { id = nuevaMedida.IdMedidaT }, nuevaMedidaDTO);
        }

        private static MedidaTransfemoralDTO MapToDTO(MedidaTransfemoral medida)
        {
            return new MedidaTransfemoralDTO
            {
                IdMedidaT = medida.IdMedidaT,
                IdEscaneo = medida.IdEscaneo,
                IdValor = medida.IdValor,
                IdPaciente = medida.IdPaciente,
                FotoMunon = medida.FotoMunon != null ? Convert.ToBase64String(medida.FotoMunon) : null,
                FechaEscaneo = medida.FechaEscaneo?.ToDateTime(new TimeOnly()) ?? DateTime.MinValue,
                DisenadorSocket = medida.DisenadorSocket,
                LongitudPie = TryParseDecimal(medida.LongitudPie),
                AlturaTalon = TryParseDecimal(medida.AlturaTalon),
                Medida1 = TryParseDecimal(medida.Medida1),
                Medida2 = TryParseDecimal(medida.Medida2),
                IdLiner = medida.IdLiner ?? 0,
                Circunferencias = medida.MedidasCircunferencia.Select(c => new MedidasCircunferenciumDTO
                {
                    IdMedida = c.IdMedida,
                    IdValor = c.IdValor ?? 0, // Proporciona un valor predeterminado si es null
                    NumeroCircunferencia = (int)c.NumeroCircunferencia,
                    ValorMmSinPresion = c.ValorMmSinPresion,
                    ValorMmConPresion = c.ValorMmConPresion
                }).ToList()
            };
        }


        private static decimal? TryParseDecimal(string? value)
        {
            return decimal.TryParse(value, out var result) ? result : (decimal?)null;
        }
    }
}
