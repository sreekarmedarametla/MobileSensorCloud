package com.sjsu.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

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

@Path("/sensorinstancecontroller")
public class SensorInstanceController {

	public SensorInstanceController() {
	}

	@POST
	@Path("/getusersensorallocationdetails")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetUserSensorAllocationDetails(String requestData) throws JSONException {
		try {
			System.out.println("UserId:" + requestData);
			JSONObject jsonObject = new JSONObject(requestData);
			int userId = Integer.parseInt(jsonObject.optString("userid"));
			// Get all the allocations
			System.out.println("User Id: " + userId);
			return Response.status(200).entity(GetSensorAllocationData(userId).toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private JSONArray GetSensorAllocationData(int userId) {
		Statement stmt = null;
		Connection conn = null;
		String query = "SELECT indet.*, sa.UserId, sa.StreetName FROM `instancedetails` indet, `sensorallocation` sa WHERE indet.`instanceid` = sa.`instanceid` and sa.UserId ="
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

	@POST
	@Path("/activateinstance")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public void ActivateInstance(String requestData) throws JSONException {
		System.out.println("Activate Instance");
		Connection conn = null;
		try {
			JSONObject jsonObject = new JSONObject(requestData);
			String instanceId = jsonObject.optString("instanceid");
			conn = new DatabaseConnection().getConnection();

			String queryUpdateInstanceDetails = "UPDATE `instancedetails` SET `SensorStatus`='Active' WHERE Instanceid = '"
					+ instanceId + "'";
			System.out.println("Query 1: " + queryUpdateInstanceDetails);
			PreparedStatement stmt1 = conn.prepareStatement(queryUpdateInstanceDetails);
			/* int rowsUpdated = */stmt1.executeUpdate();

			String queryInsertUsage = "INSERT INTO `usage`(`Id`, `InstanceId`, `StartTime`, `EndTime`) VALUES (null,?,?,?)";
			System.out.println("Query 2: " + queryInsertUsage);
			PreparedStatement stmt2 = conn.prepareStatement(queryInsertUsage);
			stmt2.setString(1, instanceId);
			stmt2.setTimestamp(2, new Timestamp(new java.util.Date().getTime()));
			stmt2.setDate(3, null);
			/* int rowsInserted = */stmt2.executeUpdate();

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
	}

	@POST
	@Path("/deactivateinstance")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public void DeactivateInstance(String requestData) throws JSONException {
		System.out.println("Deactivate Instance");
		Connection conn = null;
		try {
			JSONObject jsonObject = new JSONObject(requestData);
			String instanceId = jsonObject.optString("instanceid");
			conn = new DatabaseConnection().getConnection();

			String queryUpdateInstanceDetails = "UPDATE `instancedetails` SET `SensorStatus`='Inactive' WHERE Instanceid = '"
					+ instanceId + "'";
			System.out.println("Query 1: " + queryUpdateInstanceDetails);
			PreparedStatement stmt1 = conn.prepareStatement(queryUpdateInstanceDetails);
			/* int rowsUpdated = */stmt1.executeUpdate();

			String queryUpdateUsage = "UPDATE `usage` SET `EndTime`='" + new Timestamp(new java.util.Date().getTime())
					+ "' WHERE `InstanceId`='" + instanceId + "' and `EndTime` is null";
			PreparedStatement stmt2 = conn.prepareStatement(queryUpdateUsage);
			System.out.println("Query 2: " + stmt2);
			/* int rowsUpdatedInUsage = */stmt2.executeUpdate();

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
	}

}
