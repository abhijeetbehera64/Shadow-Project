using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Vehicle_Management.Models;
using Vehicle_Management.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Vehicle_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepository;
        public VehicleController(IVehicleRepository vehicleRepository, IWebHostEnvironment hostEnvironment)
        {
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            var vehicle = new List<Vehicle>();
            try
            {
                vehicle = await _vehicleRepository.GetAllDetails();
                return vehicle;
            }
            catch (Exception ex)
            {
                return vehicle;
            }
        }

        [HttpGet("VehicleDetails")]
        public async Task<ActionResult> GetByName(string name)
        {
            var getname = new List<Vehicle>();
            try
            {
                getname = await _vehicleRepository.Getbyname(name);
                if (getname.Count <= 0)
                {
                    return NotFound();
                }
                return Ok(getname);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // POST api/<VehicleController>
        [HttpPost]
        public async Task<ActionResult> Post(IFormFile image, [FromForm] string vehiclename, [FromForm] DateTime year, [FromForm] string model, [FromForm] string version, [FromForm] string vinnumber, [FromForm] string notes, IFormFile attachments)
        {
            try
            {
                var imagepath = await SaveImage(image);
                var attachmentpath = await SaveAttachement(attachments);
                var newvehicle = await _vehicleRepository.AddVehicles(imagepath, vehiclename, year, model, version, vinnumber, notes, attachmentpath);
                if (newvehicle == null)
                {
                    return NotFound();
                }
                return Ok(newvehicle);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        // PUT api/<VehicleController>/5
        [HttpPut]
        public async Task<object> Put(IFormFile image, [FromForm] int id,[FromForm] string vehiclename, [FromForm] DateTime year, [FromForm] string model, [FromForm] string version, [FromForm] string vinnumber, [FromForm] string notes, IFormFile attachments)
        {
            var updateDetails = new Vehicle();
            try
            {
                //_vehicleRepository.UpdateVehicles(name, newvehicle);
                var imagepath = await SaveImage(image);
                var attachmentpath = await SaveAttachement(attachments);
                updateDetails = await _vehicleRepository.UpdateVehicles(id,imagepath, vehiclename, year, model, version, vinnumber, notes, attachmentpath);
                return updateDetails;
            }
            catch 
            {
                return updateDetails;
            }
        }



        // DELETE api/<VehicleController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            try
            {
                _vehicleRepository.DeleteVehicles(id);
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex.Message);
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imagefile)
        {
            string imagename=new string(Path.GetFileNameWithoutExtension(imagefile.FileName).Take(10).ToArray()).Replace(' ','-');
            imagename = imagename + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imagefile.FileName);
            var imagepath = Path.Combine("D:\\Polaris\\VehicleManagement\\public", imagename);
            var newimagepath = Path.Combine("/", imagename);
            using (var fileStream=new FileStream(imagepath,FileMode.Create))
            {
                await imagefile.CopyToAsync(fileStream);
            }
            return newimagepath;
        }

        [NonAction]
        public async Task<string> SaveAttachement(IFormFile attachmentfile)
        {
            string attachmentname = new string(Path.GetFileNameWithoutExtension(attachmentfile.FileName).Take(10).ToArray()).Replace(' ', '-');
            attachmentname = attachmentname + DateTime.Now.ToString("xyz") + Path.GetExtension(attachmentfile.FileName);
            var attachmentpath = Path.Combine("D:\\Polaris\\VehicleManagement\\public",attachmentname);
            var newfilepath=Path.Combine("/",attachmentname);
            using (var fileStream = new FileStream(attachmentpath, FileMode.Create))
            {
                await attachmentfile.CopyToAsync(fileStream);
            }
            return newfilepath;
        }
    }
}
