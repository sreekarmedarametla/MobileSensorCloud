package com.sjsu.controller;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONObject;
import org.json.JSONException;

import com.sjsu.dbconnection.DatabaseConnection;

@Path("/usercontroller")
public class UserController {

	public UserController() {
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
					Integer.parseInt(jsonObject.optString("UserType")), jsonObject.optString("Address"),
					jsonObject.optString("EMail"), jsonObject.optString("Password"),
					Date.valueOf(jsonObject.optString("DOB")), jsonObject.optString("Country"),
					jsonObject.optString("Gender"));

			return Response.status(200).entity(jsonObject.toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@POST
	@Path("/getuserdetails")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetUserDetails(String requestData) throws JSONException {
		try {
			System.out.println("Email and Password:" + requestData);
			JSONObject jsonRequestObject = new JSONObject(requestData);
			String email = jsonRequestObject.optString("email");
			String password = jsonRequestObject.optString("password");
			// Get all the allocations
			// System.out.println("User Id: " + userId);
			return Response.status(200).entity(GetUserData(email, password).toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private JSONObject GetUserData(String email, String password) {
		Statement stmt = null;
		Connection conn = null;
		String query = "SELECT * FROM `User` WHERE `email` = '" + email + "' and password = '" + password + "'";
		System.out.println("Query: " + query);
		JSONObject jObj = new JSONObject();

		try {
			conn = new DatabaseConnection().getConnection();
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			int userid =0;
			while (rs.next()) {
				userid = rs.getInt("UserID");
				jObj.put("UserID", rs.getInt("UserID"));
				jObj.put("FirstName", rs.getString("FirstName"));
				jObj.put("LastName", rs.getString("LastName"));
				jObj.put("UserTypeID", rs.getInt("UserTypeID"));
				jObj.put("Address", rs.getString("Address"));
				jObj.put("Email", rs.getString("Email"));
				jObj.put("Password", rs.getString("Password"));
				jObj.put("DOB", rs.getString("DOB"));
				jObj.put("Country", rs.getString("Country"));
				jObj.put("Gender", rs.getString("Gender"));
			}
			String queryupdate ="update User set status='Active' where UserID ="+userid;
			Statement st = conn.createStatement();
			st.executeUpdate(queryupdate);
			
			String queryinsert ="Insert into loginmetrics(userid,logintime) VALUES (? , sysdate())";
			PreparedStatement stinsert = conn.prepareStatement(queryinsert);
			stinsert.setInt(1, userid);
			stinsert.executeUpdate();
			System.out.println(jObj.toString());
			return jObj;
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
		return null;
	}

	private void SaveUser(String FirstName, String LastName, int UserTypeID, String Address, String EMail,
			String Password, Date DOB, String Country, String Gender) {
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

			String sql = "INSERT INTO User " + "VALUES (null,?,?,?,?,?,?,?,?,?)";

			PreparedStatement stmt = conn.prepareStatement(sql);
			stmt.setString(1, FirstName);
			stmt.setString(2, LastName);
			stmt.setInt(3, UserTypeID);
			stmt.setString(4, Address);
			stmt.setString(5, EMail);
			stmt.setString(6, Password);
			stmt.setDate(7, DOB);
			stmt.setString(8, Country);
			stmt.setString(9, Gender);

			int rowsInserted = stmt.executeUpdate();
			// int rowsInserted = 0;
			System.out.println(stmt.toString());
			// stmt.executeUpdate(sql);

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
