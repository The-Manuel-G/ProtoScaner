using ProtoScaner.Server.Models;
using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Cadena de conexi�n usando el nombre correcto de "DefaultConnection"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ProtoScanner3DContext>(options =>
    options.UseSqlServer(connectionString)
);

// Configuraci�n de autenticaci�n JWT (actualmente no se usar� en el middleware)
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Configuraci�n de CORS para permitir que el frontend acceda al backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuraci�n de Swagger para la documentaci�n de la API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAll"); // Activar CORS

app.UseDefaultFiles();
app.UseStaticFiles();

// Configurar Swagger en todos los entornos (Development y Production)
app.UseSwagger();
app.UseSwaggerUI();

// Comentando autenticaci�n y autorizaci�n para evitar interferencias
// app.UseAuthentication(); // Comentar autenticaci�n temporalmente
// app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
