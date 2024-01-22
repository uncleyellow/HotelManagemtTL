namespace HotelManagementDA.Model
{
    public class Employees
    {
        public Guid id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? phoneNumber { get; set; }
        public string? address { get; set; }
        public DateTime? workingDayStart { get; set; }
        public string? role { get; set; }
    }
}
