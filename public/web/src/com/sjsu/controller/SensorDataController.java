package com.sjsu.controller;

import java.sql.Connection;
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
import org.json.JSONArray;
import org.json.JSONException;

import com.sjsu.dbconnection.DatabaseConnection;

@Path("/sensordatacontroller")
public class SensorDataController {

	public SensorDataController() {
	}

	@POST
	@Path("/getsensordataforuser")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetSensorDataForUser(String requestData) throws JSONException {

		try {
			System.out.println("UserId:" + requestData);
			JSONObject jsonObject = new JSONObject(requestData);
			int userId = Integer.parseInt(jsonObject.optString("userid"));
			// Get all the allocations
			System.out.println("User Id: " + userId);
			return Response.status(200).entity(GetSensorData(userId).toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private JSONArray GetSensorData(int userId) {
		Statement stmt = null;
		Connection conn = null;
		// String query = "SELECT * FROM `usersensorallocation` usa,
		// `sensordata` sd WHERE usa.sensorid = sd.sensorid and usa.userid = "
		// + userId;
		String query = "SELECT * FROM `instancedetails` insd, `sensorallocation` sa, `sensordata` sd WHERE sa.instanceid = insd.instanceid and sd.sensorid = insd.sensorid and insd.sensorstatus = 'Active' and sa.userid = "
				+ userId;

		System.out.println("Query: " + query);
		JSONArray myArray = new JSONArray();

		try {
			conn = new DatabaseConnection().getConnection();
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				JSONObject jObj = new JSONObject();
				jObj.put("instanceid", rs.getString("instanceid"));
				jObj.put("sensorid", rs.getInt("sensorid"));
				jObj.put("controllername", rs.getString("controllername"));
				jObj.put("sensorstatus", rs.getString("sensorstatus"));
				jObj.put("photo", rs.getString("photo"));
				jObj.put("userid", rs.getInt("userid"));
				jObj.put("streetname", rs.getString("streetname"));
				jObj.put("sensordataid", rs.getInt("sensordataid"));
				jObj.put("createddate", rs.getDate("createddate"));
				jObj.put("no2", rs.getString("no2"));
				jObj.put("co", rs.getString("co"));
				jObj.put("temp", rs.getString("temp"));
				jObj.put("humidity", rs.getString("humidity"));
				myArray.put(jObj);
			}
			// System.out.println(myArray.toString());
			return myArray;
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
}
