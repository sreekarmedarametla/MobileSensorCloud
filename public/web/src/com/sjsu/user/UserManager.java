package com.sjsu.user;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONObject;
import org.json.JSONException;

import com.sjsu.dbconnection.DatabaseConnection;

@Path("/usermanager")
public class UserManager {

	public UserManager() {
	}

	@POST
	@Path("/adduser")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response AddUser(String requestData) throws JSONException {
		try {
			System.out.println("UserManager:" + requestData);
			JSONObject jsonObject = new JSONObject(requestData);
			SaveUser(jsonObject.optString("FirstName"), jsonObject.optString("LastName"),
					jsonObject.optString("UserName"), Integer.parseInt(jsonObject.optString("UserType")),
					jsonObject.optString("Address"), jsonObject.optString("EMail"), jsonObject.optString("Password"),
					Date.valueOf(jsonObject.optString("DOB")), jsonObject.optString("Country"),
					jsonObject.optString("Gender"));

			return Response.status(200).entity(jsonObject.toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private void SaveUser(String FirstName, String LastName, String UserName, int UserTypeID, String Address,
			String EMail, String Password, Date DOB, String Country, String Gender) {
		Connection conn = null;
		try {

			// STEP 2: Register JDBC driver
			Class.forName("com.mysql.jdbc.Driver");
			// STEP 3: Open a connection
			System.out.println("Connecting to a selected database...");
			conn = new DatabaseConnection().getConnection();
			System.out.println("Connected database successfully...");

			// STEP 4: Execute a query
			System.out.println("Inserting records into the table...");

			// String sql = "INSERT INTO User ('UserName', 'UserTypeId',
			// 'Address', 'Email', 'Password', 'DOB', 'Country', 'Gender')
			// VALUES (UserName, UserTypeID, Address, Email, Password, DOB,
			// Country, Gender)";
			String sql = "INSERT INTO sensorcloud.user " + "VALUES (null,?,?,?,?,?,?,?,?,?,?)";

			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, FirstName);
			stmt.setString(2, LastName);
			stmt.setString(3, UserName);
			stmt.setInt(4, UserTypeID);
			stmt.setString(5, Address);
			stmt.setString(6, EMail);
			stmt.setString(7, Password);
			stmt.setDate(8, DOB);
			stmt.setString(9, Country);
			stmt.setString(10, Gender);

			int rowsInserted = stmt.executeUpdate();
			// int rowsInserted = 0;
			System.out.println(stmt.toString());
			stmt.executeUpdate(sql);

			System.out.println("Inserted records into the table...");
			if (rowsInserted == 1) {
				System.out.println("User added successfully!!");
			} else {
				System.out.println("Something went wrong while saving the data. Please try again.");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					/* ignored */}
			}
		}
		// return "Success";
	}
}
