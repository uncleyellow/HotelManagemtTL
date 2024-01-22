using Microsoft.AspNetCore.Mvc;

namespace HotelManagementDA.Model
{
    public class billDetail : Controller
    {
        public Guid id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? phoneNumber { get; set; }
        public DateTime checkInDate { get; set; }
        public DateTime checkOutDate { get; set; }
        public string? kindOfRoom { get; set; }
        public string? roomNumber { get; set; }
        public string? totalPrice { get; set; }
        public string? description { get; set; }
        public string? status { get; set; }
    }
}
