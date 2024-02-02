using hotelManagementDA.Common;
using HotelManagementDA.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace HotelManagementDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class kindOfRoomController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public kindOfRoomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT id, name, totalRoom, emptyRoom, rentedRoom FROM kindOfRoom";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void Post(kindOfRoom tutorial)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[kindOfRoom]([id],[name],[totalRoom],[emptyRoom],[rentedRoom]) VALUES('{id}','{tutorial.name}','{tutorial.totalRoom}','{tutorial.emptyRoom}','{tutorial.rentedRoom}')";

            QuerryExtension.ExecuteNonQuery(query);
        }

        [HttpPut]
        public JsonResult Put(kindOfRoom tutorial)
        {
            string query = $@"UPDATE kindOfRoom
                SET name = '{tutorial.name}', totalRoom = '{tutorial.totalRoom}', emptyRoom = '{tutorial.emptyRoom}',rentedRoom = '{tutorial.rentedRoom}'
                WHERE id = '{tutorial.id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[kindOfRoom] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAll()
        {
            string query = $@"DELETE FROM [dbo].[kindOfRoom]  ";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            string query = $@"Select id, name, totalRoom, emptyRoom, rentedRoom from kindOfRoom WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            kindOfRoom tutorial = new kindOfRoom()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                name = table.Rows[0]["name"].ToString(),
                totalRoom = table.Rows[0]["totalRoom"].ToString(),
                emptyRoom = table.Rows[0]["emptyRoom"].ToString(),
                rentedRoom = table.Rows[0]["rentedRoom"].ToString(),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
    }
}
