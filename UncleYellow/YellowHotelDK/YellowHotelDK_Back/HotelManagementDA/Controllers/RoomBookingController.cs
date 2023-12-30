using Microsoft.AspNetCore.Mvc;

namespace HotelManagementDA.Controllers
{
    public class RoomBookingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
