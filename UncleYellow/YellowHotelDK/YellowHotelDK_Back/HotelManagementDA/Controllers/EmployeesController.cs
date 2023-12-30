using Microsoft.AspNetCore.Mvc;

namespace HotelManagementDA.Controllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
