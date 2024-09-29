using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Cadena de conexion

var connectionString = builder.Configuration.GetConnectionString("connection");
builder.Services.AddDbContext<AppDbContext>(opcions =>
opcions.UseSqlServer(connectionString)
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
