using hotelManagementDA.Common;
using HotelManagementDA.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace HotelManagementDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomBookingController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public RoomBookingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult GetRoomBooking()
        {
            string query = "SELECT id, name, email, phoneNumber, checkInDate, checkOutDate, kindOfRoom, roomNumber, price, description, status FROM roomBooking";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void PostRoomBooking(RoomBooking tutorial)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[roomBooking]([id],[name],[email],[phoneNumber],[checkInDate],[checkOutDate],[kindOfRoom],[roomNumber],[price],[description],[status]) VALUES('{id}','{tutorial.name}','{tutorial.email}','{tutorial.phoneNumber}','{tutorial.checkInDate}','{tutorial.checkOutDate}','{tutorial.kindOfRoom}','{tutorial.roomNumber}','{tutorial.price}','{tutorial.description}','{tutorial.status}')";

            QuerryExtension.ExecuteNonQuery(query);
        }

        [HttpPut("{id}")]
        public JsonResult Put(RoomBooking tutorial,Guid id)
        {
            string query = $@"UPDATE roomBooking
                SET name = '{tutorial.name}', email = '{tutorial.email}', phoneNumber = '{tutorial.phoneNumber}',checkInDate = '{tutorial.checkInDate}',checkOutDate = '{tutorial.checkOutDate}',kindOfRoom = '{tutorial.kindOfRoom}',roomNumber = '{tutorial.roomNumber}',price = '{tutorial.price}',description = '{tutorial.description}',status = '{tutorial.status}'
                WHERE id = '{id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult DeleteRoomBooking(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[roomBooking] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAllRoomBooking()
        {
            string query = $@"DELETE FROM [dbo].[roomBooking]  ";
            QuerryExtension.ExecuteQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetByIdRoomBooking(Guid id)
        {
            string query = $@"Select id, name, email, phoneNumber, checkInDate,checkOutDate, kindOfRoom, roomNumber, description, status, price from roomBooking WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            RoomBooking tutorial = new RoomBooking()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                name = table.Rows[0]["name"].ToString(),
                email = table.Rows[0]["email"].ToString(),
                phoneNumber = table.Rows[0]["phoneNumber"].ToString(),
                checkInDate = DateTime.Parse(table.Rows[0]["checkInDate"].ToString()),
                checkOutDate = DateTime.Parse(table.Rows[0]["checkOutDate"].ToString()),
                kindOfRoom = table.Rows[0]["kindOfRoom"].ToString(),
                roomNumber = table.Rows[0]["roomNumber"].ToString(),
                description = table.Rows[0]["description"].ToString(),
                status = table.Rows[0]["status"].ToString(),
                price = table.Rows[0]["price"].ToString(),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }

        [HttpGet("search")]
        public IActionResult Search(string keyword)
        {
            string query = $@"Select id, name, email, phoneNumber, checkInDate,checkOutDate, kindOfRoom, roomNumber, price,description, status, price from roomBooking WHERE name LIKE '%{keyword}%'";
            List<RoomBooking> tutorials = new List<RoomBooking>();

            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();
            foreach (DataRow row in table.Rows)
            {
                tutorials.Add(new RoomBooking()
                {
                    id = Guid.Parse(table.Rows[0]["id"].ToString()),
                    name = table.Rows[0]["name"].ToString(),
                    email = table.Rows[0]["email"].ToString(),
                    phoneNumber = table.Rows[0]["phoneNumber"].ToString(),
                    checkInDate = DateTime.Parse(table.Rows[0]["checkInDate"].ToString()),
                    checkOutDate = DateTime.Parse(table.Rows[0]["checkOutDate"].ToString()),
                    kindOfRoom = table.Rows[0]["kindOfRoom"].ToString(),
                    roomNumber = table.Rows[0]["roomNumber"].ToString(),
                    price = table.Rows[0]["price"].ToString(),
                    description = table.Rows[0]["description"].ToString(),
                    status = table.Rows[0]["status"].ToString(),
                });
            }
            return Ok(tutorials); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
        [HttpGet("searchByPhone")]
        public IActionResult SearchByPhone(string keyword)
        {
            string query = $@"Select id, name, email, phoneNumber, checkInDate,checkOutDate, kindOfRoom, roomNumber, price,description, status, price from roomBooking WHERE phoneNumber LIKE '%{keyword}%'";
            List<RoomBooking> tutorials = new List<RoomBooking>();

            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();
            foreach (DataRow row in table.Rows)
            {
                tutorials.Add(new RoomBooking()
                {
                    id = Guid.Parse(table.Rows[0]["id"].ToString()),
                    name = table.Rows[0]["name"].ToString(),
                    email = table.Rows[0]["email"].ToString(),
                    phoneNumber = table.Rows[0]["phoneNumber"].ToString(),
                    checkInDate = DateTime.Parse(table.Rows[0]["checkInDate"].ToString()),
                    checkOutDate = DateTime.Parse(table.Rows[0]["checkOutDate"].ToString()),
                    kindOfRoom = table.Rows[0]["kindOfRoom"].ToString(),
                    roomNumber = table.Rows[0]["roomNumber"].ToString(),
                    price = table.Rows[0]["price"].ToString(),
                    description = table.Rows[0]["description"].ToString(),
                    status = table.Rows[0]["status"].ToString(),
                });
            }
            return Ok(tutorials); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
    }
}

