using Microsoft.Data.SqlClient;
using System.Data;

namespace hotelManagementDA.Common
{
    public static class QuerryExtension
    {
        public static DataTable ExecuteQuery(string query)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            string connectionString = configuration.GetConnectionString("hotelManagement");

            DataTable table = new DataTable();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        table.Load(reader);
                    }
                }

                connection.Close();
            }

            return table;
        }

        public static void ExecuteNonQuery(string query)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            string connectionString = configuration.GetConnectionString("hotelManagement");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.ExecuteNonQuery();
                }

                connection.Close();
            }
        }

        public static void ExecuteNonQueryDK(string query, object parameters)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            string connectionString = configuration.GetConnectionString("hotelManagement");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Add parameters  
                    if (parameters != null)
                    {
                        foreach (var p in parameters.GetType().GetProperties())
                        {
                            command.Parameters.AddWithValue("@" + p.Name, p.GetValue(parameters));
                        }
                    }

                    command.ExecuteNonQuery();
                }

                connection.Close();
            }
        }
    }
}
