using Microsoft.AspNetCore.Mvc;

namespace HotelManagementDA.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
