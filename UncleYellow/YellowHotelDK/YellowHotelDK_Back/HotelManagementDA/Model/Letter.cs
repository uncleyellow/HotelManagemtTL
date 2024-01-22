using Microsoft.AspNetCore.Mvc;

namespace HotelManagementDA.Model
{
    public class Letter
    {
        public Guid id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? description { get; set; }
        public DateTime? sentDate { get; set; }
    }
}