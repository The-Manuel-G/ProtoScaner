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
    public class MantenimientoController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public MantenimientoController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/mantenimiento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MantenimientoDTO>>> GetMantenimientos()
        {
            var mantenimientos = await dbContext.Mantenimientos
                .Select(m => new MantenimientoDTO
                {
                    IdMantenimiento = m.IdMantenimiento,
                    IdPaciente = m.IdPaciente,
                    IdProtesis = m.IdProtesis,
                    FechaMantenimiento = m.FechaMantenimiento,
                    ImagenFallo1 = m.ImagenFallo1,
                    ImagenFallo2 = m.ImagenFallo2,
                    IdSocket = m.IdSocket,
                    NumSocketsFabricados = m.NumSocketsFabricados,
                    NuevasMedidas = m.NuevasMedidas,
                    IdComponentes = m.IdComponentes
                })
                .ToListAsync();

            return Ok(mantenimientos);
        }

        // GET: api/mantenimiento/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MantenimientoDTO>> GetMantenimiento(int id)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }

            var mantenimientoDTO = new MantenimientoDTO
            {
                IdMantenimiento = mantenimiento.IdMantenimiento,
                IdPaciente = mantenimiento.IdPaciente,
                IdProtesis = mantenimiento.IdProtesis,
                FechaMantenimiento = mantenimiento.FechaMantenimiento,
                ImagenFallo1 = mantenimiento.ImagenFallo1,
                ImagenFallo2 = mantenimiento.ImagenFallo2,
                IdSocket = mantenimiento.IdSocket,
                NumSocketsFabricados = mantenimiento.NumSocketsFabricados,
                NuevasMedidas = mantenimiento.NuevasMedidas,
                IdComponentes = mantenimiento.IdComponentes
            };

            return Ok(mantenimientoDTO);
        }

        // POST: api/mantenimiento
        [HttpPost]
        public async Task<ActionResult<MantenimientoDTO>> CreateMantenimiento(MantenimientoDTO nuevoMantenimientoDTO)
        {
            var nuevoMantenimiento = new Mantenimiento
            {
                IdPaciente = nuevoMantenimientoDTO.IdPaciente,
                IdProtesis = nuevoMantenimientoDTO.IdProtesis,
                FechaMantenimiento = nuevoMantenimientoDTO.FechaMantenimiento,
                ImagenFallo1 = nuevoMantenimientoDTO.ImagenFallo1,
                ImagenFallo2 = nuevoMantenimientoDTO.ImagenFallo2,
                IdSocket = nuevoMantenimientoDTO.IdSocket,
                NumSocketsFabricados = nuevoMantenimientoDTO.NumSocketsFabricados,
                NuevasMedidas = nuevoMantenimientoDTO.NuevasMedidas,
                IdComponentes = nuevoMantenimientoDTO.IdComponentes
            };

            dbContext.Mantenimientos.Add(nuevoMantenimiento);
            await dbContext.SaveChangesAsync();

            nuevoMantenimientoDTO.IdMantenimiento = nuevoMantenimiento.IdMantenimiento;

            return CreatedAtAction(nameof(GetMantenimiento), new { id = nuevoMantenimiento.IdMantenimiento }, nuevoMantenimientoDTO);
        }

        // PUT: api/mantenimiento/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMantenimiento(int id, MantenimientoDTO mantenimientoActualizadoDTO)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }

            mantenimiento.IdPaciente = mantenimientoActualizadoDTO.IdPaciente;
            mantenimiento.IdProtesis = mantenimientoActualizadoDTO.IdProtesis;
            mantenimiento.FechaMantenimiento = mantenimientoActualizadoDTO.FechaMantenimiento;
            mantenimiento.ImagenFallo1 = mantenimientoActualizadoDTO.ImagenFallo1;
            mantenimiento.ImagenFallo2 = mantenimientoActualizadoDTO.ImagenFallo2;
            mantenimiento.IdSocket = mantenimientoActualizadoDTO.IdSocket;
            mantenimiento.NumSocketsFabricados = mantenimientoActualizadoDTO.NumSocketsFabricados;
            mantenimiento.NuevasMedidas = mantenimientoActualizadoDTO.NuevasMedidas;
            mantenimiento.IdComponentes = mantenimientoActualizadoDTO.IdComponentes;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/mantenimiento/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMantenimiento(int id)
        {
            var mantenimiento = await dbContext.Mantenimientos.FindAsync(id);
            if (mantenimiento == null)
            {
                return NotFound();
            }

            dbContext.Mantenimientos.Remove(mantenimiento);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}


