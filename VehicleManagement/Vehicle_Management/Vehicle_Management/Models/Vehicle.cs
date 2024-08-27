using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vehicle_Management.Models
{
    public class Vehicle
    {
        public int id { get; set; }
        public string imagepath { get; set; }

        public string vehiclename { get; set; }

        public DateTime year { get; set; }

        public string model { get; set; }

        public string version { get; set; }

        public string vinnumber { get; set; }

        public string notes { get; set; }

        public string attachmentpath { get; set; }
    }
}
