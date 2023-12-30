using hotelManagementDA.Common;
using HotelManagementDA.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace HotelManagementDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT id, userName, passWord, role FROM Users";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void Post(Users tutorial)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[Users]([id],[userName],[passWord],[role]) VALUES('{id}','{tutorial.userName}','{tutorial.passWord}','{tutorial.role}')";

            QuerryExtension.ExecuteNonQuery(query);
        }

        [HttpPut]
        public JsonResult Put(Users tutorial)
        {
            string query = $@"UPDATE Tutorial
                SET userName = '{tutorial.userName}', passWord = '{tutorial.passWord}', role = '{tutorial.role}'
                WHERE id = '{tutorial.id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[Users] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAll()
        {
            string query = $@"DELETE FROM [dbo].[Users]  ";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            string query = $@"Select id, userName, passWord, role from Users WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            Users tutorial = new Users()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                userName = table.Rows[0]["userName"].ToString(),
                passWord = table.Rows[0]["passWord"].ToString(),
                role = table.Rows[0]["role"].ToString(),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }

        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            string query = $@"Select id, userName, passWord, role from Tutorial WHERE userName LIKE '%{keyword}%'";
            List<Users> tutorials = new List<Users>();

            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();
            foreach (DataRow row in table.Rows)
            {
                tutorials.Add(new Users()
                {
                    id = Guid.Parse(table.Rows[0]["id"].ToString()),
                    userName = table.Rows[0]["userName"].ToString(),
                    passWord = table.Rows[0]["passWord"].ToString(),
                    role = table.Rows[0]["role"].ToString(),
                });
            }
            return Ok(tutorials); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
    }
}
