[ApiController]
[Route("api/[controller]")]
public class InventarioController : ControllerBase
{
	private readonly AppDbContext _context;

	public InventarioController(AppDbContext context)
	{
		_context = context;
	}

	// Agregar una entrada de inventario
	[HttpPost("EntradaInventario")]
	public async Task<IActionResult> EntradaInventario(int componentId, int cantidad, string descripcion)
	{
		var inventario = await _context.InventarioComponentes.FirstOrDefaultAsync(i => i.ComponentID == componentId);

		if (inventario == null)
		{
			return NotFound("Componente no encontrado en el inventario.");
		}

		// Registrar el movimiento de entrada
		var movimiento = new MovimientoInventario
		{
			ComponentID = componentId,
			TipoMovimiento = "Entrada",
			Cantidad = cantidad,
			Descripcion = descripcion
		};
		_context.MovimientosInventario.Add(movimiento);

		// Actualizar el stock en inventario
		inventario.StockActual += cantidad;
		await _context.SaveChangesAsync();

		return Ok(new { mensaje = "Stock actualizado con éxito.", inventario });
	}

	// Agregar una salida de inventario
	[HttpPost("SalidaInventario")]
	public async Task<IActionResult> SalidaInventario(int componentId, int cantidad, string descripcion)
	{
		var inventario = await _context.InventarioComponentes.FirstOrDefaultAsync(i => i.ComponentID == componentId);

		if (inventario == null)
		{
			return NotFound("Componente no encontrado en el inventario.");
		}

		if (inventario.StockActual < cantidad)
		{
			return BadRequest("Stock insuficiente para realizar la operación.");
		}

		// Registrar el movimiento de salida
		var movimiento = new MovimientoInventario
		{
			ComponentID = componentId,
			TipoMovimiento = "Salida",
			Cantidad = cantidad,
			Descripcion = descripcion
		};
		_context.MovimientosInventario.Add(movimiento);

		// Actualizar el stock en inventario
		inventario.StockActual -= cantidad;

		// Verificar si el stock está por debajo del punto de reorden
		if (inventario.StockActual <= inventario.PuntoReorden)
		{
			return Ok(new { mensaje = "Advertencia: el stock está por debajo del punto de reorden.", inventario });
		}

		await _context.SaveChangesAsync();
		return Ok(new { mensaje = "Stock actualizado con éxito.", inventario });
	}


	[HttpPost("AsignarMultiplesComponentesAProtesis")]
	public async Task<IActionResult> AsignarMultiplesComponentesAProtesis(int protesisId, List<ProtesisComponenteDto> componentes)
	{
		var errores = new List<string>();

		// Verificar el stock para cada componente en la lista
		foreach (var componenteDto in componentes)
		{
			var inventario = await _context.InventarioComponentes
				.FirstOrDefaultAsync(i => i.ComponentID == componenteDto.ComponentID);

			if (inventario == null)
			{
				errores.Add($"Componente con ID {componenteDto.ComponentID} no encontrado en el inventario.");
				continue;
			}

			if (inventario.StockActual < componenteDto.Cantidad)
			{
				errores.Add($"Stock insuficiente para el componente con ID {componenteDto.ComponentID}. Stock actual: {inventario.StockActual}, requerido: {componenteDto.Cantidad}.");
			}
		}

		// Si hay errores, retornar sin realizar la asignación
		if (errores.Any())
		{
			return BadRequest(new { mensaje = "Errores en la asignación de componentes", errores });
		}

		// Realizar la asignación si todos los componentes tienen suficiente stock
		foreach (var componenteDto in componentes)
		{
			// Asignar el componente a la prótesis
			var protesisComponente = new ProtesisComponente
			{
				ProtesisID = protesisId,
				ComponentID = componenteDto.ComponentID,
				Cantidad = componenteDto.Cantidad
			};
			_context.ProtesisComponentes.Add(protesisComponente);

			// Reducir el stock en inventario y registrar el movimiento
			var inventario = await _context.InventarioComponentes.FirstOrDefaultAsync(i => i.ComponentID == componenteDto.ComponentID);
			inventario.StockActual -= componenteDto.Cantidad;

			var movimiento = new MovimientoInventario
			{
				ComponentID = componenteDto.ComponentID,
				TipoMovimiento = "Salida",
				Cantidad = componenteDto.Cantidad,
				Descripcion = $"Asignación a prótesis {protesisId}"
			};
			_context.MovimientosInventario.Add(movimiento);
		}

		await _context.SaveChangesAsync();

		return Ok(new { mensaje = "Componentes asignados a la prótesis y stock actualizado." });
	}

	// Asignar un componente a una prótesis
	[HttpPost("AsignarComponenteProtesis")]
	public async Task<IActionResult> AsignarComponenteProtesis(int protesisId, int componentId, int cantidad)
	{
		var inventario = await _context.InventarioComponentes.FirstOrDefaultAsync(i => i.ComponentID == componentId);

		if (inventario == null || inventario.StockActual < cantidad)
		{
			return BadRequest("Stock insuficiente para asignar a la prótesis.");
		}

		// Crear una nueva relación entre prótesis y componente
		var protesisComponente = new ProtesisComponente
		{
			ProtesisID = protesisId,
			ComponentID = componentId,
			Cantidad = cantidad
		};
		_context.ProtesisComponentes.Add(protesisComponente);

		// Reducir stock en inventario y registrar el movimiento de salida
		inventario.StockActual -= cantidad;

		var movimiento = new MovimientoInventario
		{
			ComponentID = componentId,
			TipoMovimiento = "Salida",
			Cantidad = cantidad,
			Descripcion = $"Asignación a prótesis {protesisId}"
		};
		_context.MovimientosInventario.Add(movimiento);

		await _context.SaveChangesAsync();

		return Ok(new { mensaje = "Componente asignado a la prótesis y stock actualizado.", inventario });
	}

	// Obtener el stock actual de un componente
	[HttpGet("ObtenerStock/{componentId}")]
	public async Task<IActionResult> ObtenerStock(int componentId)
	{
		var inventario = await _context.InventarioComponentes
			.Where(i => i.ComponentID == componentId)
			.Select(i => new { i.StockActual, i.PuntoReorden })
			.FirstOrDefaultAsync();

		if (inventario == null)
		{
			return NotFound("Componente no encontrado en el inventario.");
		}

		return Ok(inventario);
	}
}
