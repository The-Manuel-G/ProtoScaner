using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProtoScaner.Server.Context;
using ProtoScaner.Server.DTOs;
using ProtoScaner.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProtoScaner.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            // Buscar al usuario en la base de datos por correo electrónico
            var user = await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == loginDto.Email && u.Activo == true);

            if (user == null)
            {
                return Unauthorized("Usuario no encontrado o inactivo.");
            }

            // Verificar la contraseña comparando el hash almacenado
            if (!VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                return Unauthorized("Contraseña incorrecta.");
            }

            // Generar el token JWT si las credenciales son válidas
            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string GenerateJwtToken(Usuario user)
        {
            // Crear los claims que identifican al usuario en el token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.IdUsuario.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Name, user.NombreUsuario),
                new Claim(ClaimTypes.Role, user.IdRol.ToString() ?? "User")
            };

            // Configuración de la clave de firma del token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Configuración del token
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            // Convertir el hash almacenado a bytes
            var hashBytes = Convert.FromBase64String(storedHash);

            // Crear el HMACSHA512 para calcular el hash de la contraseña ingresada
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Comparar el hash calculado con el hash almacenado en la base de datos
            return computedHash.SequenceEqual(hashBytes);
        }
    }
}
