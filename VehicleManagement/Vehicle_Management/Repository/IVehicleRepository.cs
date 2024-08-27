using System.Numerics;
using System;
using Vehicle_Management.Models;
using static Azure.Core.HttpHeader;

namespace Vehicle_Management.Repository
{
    public interface IVehicleRepository
    {
        public Task<List<Vehicle>> GetAllDetails();//GET
        public Task<List<Vehicle>> Getbyname(string name);//GET BY NAME
        public Task<Vehicle> AddVehicles(string image ,string vehiclename, DateTime year,string model,string version,string vinnumber,string notes, string attachment);              //POST
        public Task<Vehicle> UpdateVehicles(int id, string image, string vehiclename, DateTime year, string model, string version, string vinnumber, string notes, string attachment);//PUT
        public void DeleteVehicles(int id);//DELETE
    }
}
