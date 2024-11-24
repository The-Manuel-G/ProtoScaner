using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
                .Include(m => m.MedidasCircunferencia)
                .Select(m => new MedidaTransfemoralDTO
                {
                    IdMedidaT = m.IdMedidaT,
                    IdEscaneo = m.IdEscaneo,
                    IdValor = m.IdValor ?? 0, // Handling nullable IdValor with default value
                    IdPaciente = m.IdPaciente,
                    FotoMunon = m.FotoMunon != null ? Convert.ToBase64String(m.FotoMunon) : null,
                    FechaEscaneo = m.FechaEscaneo.ToDateTime(new TimeOnly()),
                    DisenadorSocket = m.DisenadorSocket,
                    LongitudPie = ParseDoubleOrDefault(m.LongitudPie),
                    AlturaTalon = ParseDoubleOrDefault(m.AlturaTalon),
                    Medida1 = ParseDoubleOrDefault(m.Medida1),
                    Medida2 = ParseDoubleOrDefault(m.Medida2),
                    IdLiner = m.IdLiner ?? 0, // Handling nullable IdLiner with default value
                    Circunferencias = m.MedidasCircunferencia.Select(c => new MedidasCircunferenciumDTO
                    {
                        IdMedida = c.IdMedida,
                        IdValor = c.IdValor,
                        NumeroCircunferencia = c.NumeroCircunferencia,
                        ValorMmSinPresion = c.ValorMmSinPresion,
                        ValorMmConPresion = c.ValorMmConPresion
                    }).ToList()
                })
                .ToListAsync();

            return Ok(medidas);
        }

        // GET: api/medidaTransfemoral/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedidaTransfemoralDTO>> GetMedidaTransfemoralById(int id)
        {
            var medida = await dbContext.MedidaTransfemorals
                .Include(m => m.MedidasCircunferencia)
                .Where(m => m.IdMedidaT == id)
                .Select(m => new MedidaTransfemoralDTO
                {
                    IdMedidaT = m.IdMedidaT,
                    IdEscaneo = m.IdEscaneo,
                    IdValor = m.IdValor ?? 0, // Handling nullable IdValor with default value
                    IdPaciente = m.IdPaciente,
                    FotoMunon = m.FotoMunon != null ? Convert.ToBase64String(m.FotoMunon) : null,
                    FechaEscaneo = m.FechaEscaneo.ToDateTime(new TimeOnly()),
                    DisenadorSocket = m.DisenadorSocket,
                    LongitudPie = ParseDoubleOrDefault(m.LongitudPie),
                    AlturaTalon = ParseDoubleOrDefault(m.AlturaTalon),
                    Medida1 = ParseDoubleOrDefault(m.Medida1),
                    Medida2 = ParseDoubleOrDefault(m.Medida2),
                    IdLiner = m.IdLiner ?? 0, // Handling nullable IdLiner with default value
                    Circunferencias = m.MedidasCircunferencia.Select(c => new MedidasCircunferenciumDTO
                    {
                        IdMedida = c.IdMedida,
                        IdValor = c.IdValor,
                        NumeroCircunferencia = c.NumeroCircunferencia,
                        ValorMmSinPresion = c.ValorMmSinPresion,
                        ValorMmConPresion = c.ValorMmConPresion
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (medida == null)
            {
                return NotFound();
            }

            return Ok(medida);
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
                FotoMunon = !string.IsNullOrEmpty(nuevaMedidaDTO.FotoMunon) ? Convert.FromBase64String(nuevaMedidaDTO.FotoMunon) : null,
                FechaEscaneo = DateOnly.FromDateTime(nuevaMedidaDTO.FechaEscaneo),
                DisenadorSocket = nuevaMedidaDTO.DisenadorSocket,
                LongitudPie = nuevaMedidaDTO.LongitudPie.ToString(),
                AlturaTalon = nuevaMedidaDTO.AlturaTalon.ToString(),
                Medida1 = nuevaMedidaDTO.Medida1.ToString(),
                Medida2 = nuevaMedidaDTO.Medida2.ToString(),
                IdLiner = nuevaMedidaDTO.IdLiner,
                MedidasCircunferencia = nuevaMedidaDTO.Circunferencias.Select(c => new MedidasCircunferencium
                {
                    IdValor = c.IdValor,
                    NumeroCircunferencia = c.NumeroCircunferencia,
                    ValorMmSinPresion = (decimal)c.ValorMmSinPresion,
                    ValorMmConPresion = (decimal)c.ValorMmConPresion
                }).ToList()
            };

            dbContext.MedidaTransfemorals.Add(nuevaMedida);
            await dbContext.SaveChangesAsync();

            nuevaMedidaDTO.IdMedidaT = nuevaMedida.IdMedidaT;

            return CreatedAtAction(nameof(GetMedidaTransfemoralById), new { id = nuevaMedida.IdMedidaT }, nuevaMedidaDTO);
        }

        // Helper method for parsing double with a fallback to zero
        private static double ParseDoubleOrDefault(string? value)
        {
            return double.TryParse(value, out var result) ? result : 0.0;
        }
    }
}
