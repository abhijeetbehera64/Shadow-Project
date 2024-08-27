using Microsoft.EntityFrameworkCore;
using Vehicle_Management.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Vehicle_Management.Repository
{ 
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VehicleDbcontext _context;
        public VehicleRepository(VehicleDbcontext db) 
        {
            _context = db;
        }
        public async Task<List<Vehicle>> GetAllDetails()
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            try
            {
                vehicles = await _context.Vehicles.ToListAsync();
                return vehicles;
            }
            catch (Exception ex) 
            {
                return vehicles;
            }
        }
        public async Task<List<Vehicle>> Getbyname(string name)
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            try
            { 
                vehicles= await _context.Vehicles.Where(x=>x.vehiclename==name).ToListAsync();
                return vehicles;
            }
            catch (Exception ex)
            {
                return vehicles;
            }
        }
        public async Task<Vehicle> AddVehicles(string image, string vehiclename, DateTime year, string model, string version, string vinnumber, string notes, string attachment)
        {
            try
            {
                var vehicle = new Vehicle();
                vehicle.imagepath = image;
                vehicle.vehiclename = vehiclename;
                vehicle.year = year;
                vehicle.model = model;
                vehicle.version = version;
                vehicle.vinnumber = vinnumber;
                vehicle.notes = notes;
                vehicle.attachmentpath = attachment;


                await _context.Vehicles.AddAsync(vehicle);
                _context.SaveChanges();
                return vehicle;
            }
            catch
            {
                return null;
            }
        }

        public async void DeleteVehicles(int id)
        {
            try
            {
                var delete = (from a in _context.Vehicles
                              where a.id == id
                              select a).ExecuteDelete();
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);
            }
        }

        

        public async Task<Vehicle> UpdateVehicles(int id,string image, string vehiclename, DateTime year, string model, string version, string vinnumber, string notes, string attachment)
        {
            Vehicle vehicle = new Vehicle();
            try
            {
                vehicle = await _context.Vehicles.Where(x => x.id == id).SingleOrDefaultAsync();
                if (vehicle != null)
                {
                    vehicle.imagepath = image;
                    vehicle.vehiclename = vehiclename;
                    vehicle.year = year;
                    vehicle.model = model;
                    vehicle.version = version;
                    vehicle.vinnumber = vinnumber;
                    vehicle.notes = notes;
                    vehicle.attachmentpath = attachment;
                }
                await _context.SaveChangesAsync();
                return vehicle;
                
            }
            catch(Exception ex) 
            {
                return vehicle;
            }
        }
    }
}
