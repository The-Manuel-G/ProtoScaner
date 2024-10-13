using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProtoScaner.Server.Models;

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
        public async Task<ActionResult<IEnumerable<Insidencia>>> GetInsidencias()
        {
            return Ok(await dbContext.Insidencias.ToListAsync());
        }

        // GET: api/insidencias/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Insidencia>> GetInsidencia(int id)
        {
            var insidencia = await dbContext.Insidencias.FindAsync(id);
            if (insidencia == null)
            {
                return NotFound();
            }
            return Ok(insidencia);
        }

        // POST: api/insidencias
        [HttpPost]
        public async Task<ActionResult<Insidencia>> CreateInsidencia(Insidencia nuevaInsidencia)
        {
            dbContext.Insidencias.Add(nuevaInsidencia);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInsidencia), new { id = nuevaInsidencia.IdInsidencias }, nuevaInsidencia);
        }

        // PUT: api/insidencias/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateInsidencia(int id, Insidencia insidenciaActualizada)
        {
            var insidencia = await dbContext.Insidencias.FindAsync(id);
            if (insidencia == null)
            {
                return NotFound();
            }

            insidencia.IdEntregas = insidenciaActualizada.IdEntregas;
            insidencia.IdPaciente = insidenciaActualizada.IdPaciente;
            insidencia.IdProtesis = insidenciaActualizada.IdProtesis;
            insidencia.IdUsuario = insidenciaActualizada.IdUsuario;
            insidencia.Componentes = insidenciaActualizada.Componentes;
            insidencia.Fecha = insidenciaActualizada.Fecha;
            insidencia.Descripcion = insidenciaActualizada.Descripcion;

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

