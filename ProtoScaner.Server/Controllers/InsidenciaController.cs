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
    public class InsidenciaController : ControllerBase
    {
        private readonly ProtoScanner3DContext dbContext;

        public InsidenciaController(ProtoScanner3DContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/insidencias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InsidenciaDTO>>> GetInsidencias()
        {
            var insidencias = await dbContext.Insidencias
                .Select(i => new InsidenciaDTO
                {
                    IdInsidencias = i.IdInsidencias,
                    IdEntregas = i.IdEntregas,
                    IdPaciente = i.IdPaciente,
                    IdProtesis = i.IdProtesis,
                    IdUsuario = i.IdUsuario,
                    Componentes = i.Componentes,
                    Fecha = i.Fecha,
                    Descripcion = i.Descripcion
                })
                .ToListAsync();

            return Ok(insidencias);
        }

        // GET: api/insidencias/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<InsidenciaDTO>> GetInsidencia(int id)
        {
            var insidencia = await dbContext.Insidencias.FindAsync(id);
            if (insidencia == null)
            {
                return NotFound();
            }

            var insidenciaDTO = new InsidenciaDTO
            {
                IdInsidencias = insidencia.IdInsidencias,
                IdEntregas = insidencia.IdEntregas,
                IdPaciente = insidencia.IdPaciente,
                IdProtesis = insidencia.IdProtesis,
                IdUsuario = insidencia.IdUsuario,
                Componentes = insidencia.Componentes,
                Fecha = insidencia.Fecha,
                Descripcion = insidencia.Descripcion
            };

            return Ok(insidenciaDTO);
        }

        // POST: api/insidencias
        [HttpPost]
        public async Task<ActionResult<InsidenciaDTO>> CreateInsidencia(InsidenciaDTO nuevaInsidenciaDTO)
        {
            var nuevaInsidencia = new Insidencia
            {
                IdEntregas = nuevaInsidenciaDTO.IdEntregas,
                IdPaciente = nuevaInsidenciaDTO.IdPaciente,
                IdProtesis = nuevaInsidenciaDTO.IdProtesis,
                IdUsuario = nuevaInsidenciaDTO.IdUsuario,
                Componentes = nuevaInsidenciaDTO.Componentes,
                Fecha = nuevaInsidenciaDTO.Fecha,
                Descripcion = nuevaInsidenciaDTO.Descripcion
            };

            dbContext.Insidencias.Add(nuevaInsidencia);
            await dbContext.SaveChangesAsync();

            nuevaInsidenciaDTO.IdInsidencias = nuevaInsidencia.IdInsidencias;

            return CreatedAtAction(nameof(GetInsidencia), new { id = nuevaInsidencia.IdInsidencias }, nuevaInsidenciaDTO);
        }

        // PUT: api/insidencias/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateInsidencia(int id, InsidenciaDTO insidenciaActualizadaDTO)
        {
            var insidencia = await dbContext.Insidencias.FindAsync(id);
            if (insidencia == null)
            {
                return NotFound();
            }

            insidencia.IdEntregas = insidenciaActualizadaDTO.IdEntregas;
            insidencia.IdPaciente = insidenciaActualizadaDTO.IdPaciente;
            insidencia.IdProtesis = insidenciaActualizadaDTO.IdProtesis;
            insidencia.IdUsuario = insidenciaActualizadaDTO.IdUsuario;
            insidencia.Componentes = insidenciaActualizadaDTO.Componentes;
            insidencia.Fecha = insidenciaActualizadaDTO.Fecha;
            insidencia.Descripcion = insidenciaActualizadaDTO.Descripcion;

            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/insidencias/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInsidencia(int id)
        {
            var insidencia = await dbContext.Insidencias.FindAsync(id);
            if (insidencia == null)
            {
                return NotFound();
            }

            dbContext.Insidencias.Remove(insidencia);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

