using Microsoft.EntityFrameworkCore;

namespace Vehicle_Management.Models
{
    public class VehicleDbcontext:DbContext
    {
        public VehicleDbcontext(DbContextOptions<VehicleDbcontext> options) : base(options)
        {

        }

        public DbSet<Vehicle> Vehicles { get; set; }

    }
}
