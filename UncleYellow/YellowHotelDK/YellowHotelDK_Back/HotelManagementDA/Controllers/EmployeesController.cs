using hotelManagementDA.Common;
using HotelManagementDA.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace HotelManagementDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmployeesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT id, name, email, phoneNumber, address, workingDayStart, role FROM employees";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void Post(Employees tutorial)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[employees]([id],[name],[email],[phoneNumber],[address],[workingDayStart],[role]) VALUES('{id}','{tutorial.name}','{tutorial.email}','{tutorial.phoneNumber}','{tutorial.address}','{tutorial.workingDayStart}','{tutorial.role}')";

            QuerryExtension.ExecuteNonQuery(query);
        }

        [HttpPut]
        public JsonResult Put(Employees tutorial)
        {
            string query = $@"UPDATE employees
                SET name = '{tutorial.name}', email = '{tutorial.email}', phoneNumber = '{tutorial.phoneNumber}', address = '{tutorial.address}', workingDayStart = '{tutorial.workingDayStart}', role = '{tutorial.role}'
                WHERE id = '{tutorial.id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[employees] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAll()
        {
            string query = $@"DELETE FROM [dbo].[employees]  ";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            string query = $@"Select id, name, email, phoneNumber, address, workingDayStart, role from employees WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            Employees tutorial = new Employees()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                name = table.Rows[0]["name"].ToString(),
                email = table.Rows[0]["email"].ToString(),
                phoneNumber = table.Rows[0]["phoneNumber"].ToString(),
                address = table.Rows[0]["address"].ToString(),
                workingDayStart = DateTime.Parse(table.Rows[0]["workingDayStart"].ToString()),
                role = table.Rows[0]["role"].ToString(),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }

        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            string query = $@"Select id, name, email, phoneNumber, address, workingDayStart, role from employees letter name LIKE '%{keyword}%'";
            List<Employees> tutorials = new List<Employees>();

            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();
            foreach (DataRow row in table.Rows)
            {
                tutorials.Add(new Employees()
                {
                    id = Guid.Parse(table.Rows[0]["id"].ToString()),
                    name = table.Rows[0]["name"].ToString(),
                    email = table.Rows[0]["email"].ToString(),
                    phoneNumber = table.Rows[0]["phoneNumber"].ToString(),
                    address = table.Rows[0]["address"].ToString(),
                    workingDayStart = DateTime.Parse(table.Rows[0]["workingDayStart"].ToString()),
                    role = table.Rows[0]["role"].ToString(),
                });
            }
            return Ok(tutorials); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
    }
}
