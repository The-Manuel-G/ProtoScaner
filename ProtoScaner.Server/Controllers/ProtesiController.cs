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
    public class ProtesiController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public ProtesiController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/protesi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProtesiDTO>>> GetProtesis()
        {
            var protesis = await dbContext.Proteses
                .Select(p => new ProtesiDTO
                {
                    IdProtesis = p.IdProtesis,
                    CodigoPaciente = p.CodigoPaciente,
                    LinerTipo = p.LinerTipo,
                    LinerTamano = p.LinerTamano,
                    Protesista = p.Protesista,
                    FechaEntrega = p.FechaEntrega,
                    Material = p.Material
                })
                .ToListAsync();

            return Ok(protesis);
        }

        // GET: api/protesi/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProtesiDTO>> GetProtesi(int id)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }

            var protesiDTO = new ProtesiDTO
            {
                IdProtesis = protesi.IdProtesis,
                CodigoPaciente = protesi.CodigoPaciente,
                LinerTipo = protesi.LinerTipo,
                LinerTamano = protesi.LinerTamano,
                Protesista = protesi.Protesista,
                FechaEntrega = protesi.FechaEntrega,
                Material = protesi.Material
            };

            return Ok(protesiDTO);
        }

        // POST: api/protesi
        [HttpPost]
        public async Task<ActionResult<ProtesiDTO>> CreateProtesi(ProtesiDTO nuevaProtesiDTO)
        {
            var nuevaProtesi = new Protesi
            {
                CodigoPaciente = nuevaProtesiDTO.CodigoPaciente,
                LinerTipo = nuevaProtesiDTO.LinerTipo,
                LinerTamano = nuevaProtesiDTO.LinerTamano,
                Protesista = nuevaProtesiDTO.Protesista,
                FechaEntrega = nuevaProtesiDTO.FechaEntrega,
                Material = nuevaProtesiDTO.Material
            };

            dbContext.Proteses.Add(nuevaProtesi);
            await dbContext.SaveChangesAsync();

            nuevaProtesiDTO.IdProtesis = nuevaProtesi.IdProtesis;

            return CreatedAtAction(nameof(GetProtesi), new { id = nuevaProtesi.IdProtesis }, nuevaProtesiDTO);
        }

        // PUT: api/protesi/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProtesi(int id, ProtesiDTO protesiActualizadaDTO)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }

            protesi.CodigoPaciente = protesiActualizadaDTO.CodigoPaciente;
            protesi.LinerTipo = protesiActualizadaDTO.LinerTipo;
            protesi.LinerTamano = protesiActualizadaDTO.LinerTamano;
            protesi.Protesista = protesiActualizadaDTO.Protesista;
            protesi.FechaEntrega = protesiActualizadaDTO.FechaEntrega;
            protesi.Material = protesiActualizadaDTO.Material;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/protesi/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProtesi(int id)
        {
            var protesi = await dbContext.Proteses.FindAsync(id);
            if (protesi == null)
            {
                return NotFound();
            }

            dbContext.Proteses.Remove(protesi);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


