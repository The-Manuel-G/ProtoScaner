using Microsoft.EntityFrameworkCore;
using ProtoScaner.Server.Models;

namespace ProtoScaner.Server.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opcions)
            : base(opcions)
        {
        }

        public DbSet<Rol> Rol { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
