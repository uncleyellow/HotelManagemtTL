using hotelManagementDA.Common;
using HotelManagementDA.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Metrics;

namespace HotelManagementDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LetterController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LetterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT id, name, email, description, sentDate FROM letter";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void Post(Letter tutorial)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[letter]([id],[name],[email],[description],[sentDate]) VALUES('{id}','{tutorial.name}','{tutorial.email}','{tutorial.description}','{tutorial.sentDate}')";

            QuerryExtension.ExecuteNonQuery(query);
        }

        [HttpPut]
        public JsonResult Put(Letter tutorial)
        {
            string query = $@"UPDATE letter
                SET name = '{tutorial.name}', email = '{tutorial.email}', description = '{tutorial.description}', description = '{tutorial.sentDate}'
                WHERE id = '{tutorial.id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[letter] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAll()
        {
            string query = $@"DELETE FROM [dbo].[letter]  ";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            string query = $@"Select id, name, email, description, sentDate from letter WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            Letter tutorial = new Letter()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                name = table.Rows[0]["name"].ToString(),
                email = table.Rows[0]["email"].ToString(),
                description = table.Rows[0]["description"].ToString(),
                sentDate = DateTime.Parse(table.Rows[0]["sentDate"].ToString()),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }

        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            string query = $@"Select id, name, email, description from Tutorial letter name LIKE '%{keyword}%'";
            List<Letter> tutorials = new List<Letter>();

            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();
            foreach (DataRow row in table.Rows)
            {
                tutorials.Add(new Letter()
                {
                    id = Guid.Parse(table.Rows[0]["id"].ToString()),
                    name = table.Rows[0]["userName"].ToString(),
                    email = table.Rows[0]["passWord"].ToString(),
                    description = table.Rows[0]["role"].ToString(),
                    sentDate = DateTime.Parse(table.Rows[0]["sentDate"].ToString()),
                });
            }
            return Ok(tutorials); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
    }
}
