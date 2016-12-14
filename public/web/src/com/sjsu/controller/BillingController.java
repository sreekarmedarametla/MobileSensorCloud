package com.sjsu.controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

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
import com.sjsu.sensor.UsageDetails;

@Path("/billingcontroller")
public class BillingController {

	public BillingController() {
	}

	@POST
	@Path("/getbillingdetails")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetBillingDetails(String requestData) throws JSONException {
		try {
			System.out.println("Input data:" + requestData);
			JSONObject jsonObject = new JSONObject(requestData);
			int userId = Integer.parseInt(jsonObject.optString("userid"));
			int month = Integer.parseInt(jsonObject.optString("month"));
			int year = Integer.parseInt(jsonObject.optString("year"));

			JSONArray jsonArray = GetBillingData(userId, month, year);

			return Response.status(200).entity(jsonArray.toString()).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private JSONArray GetBillingData(int userId, int month, int year) {
		Statement stmt = null;
		Connection conn = null;

		String querySensorList = "SELECT indet.sensorid FROM `instancedetails` indet, `sensorallocation` sa WHERE indet.`instanceid` = sa.`instanceid` and sa.UserId ="
				+ userId;
		String queryUsage = "SELECT us.*, ins.sensorid, sa.userid FROM `usage` us, `instancedetails` ins, `sensorallocation` sa WHERE us.instanceid = ins.instanceid and sa.instanceid=ins.instanceid and sa.userid = "
				+ userId;
		// + " AND MONTH(StartTime) = "
		// + month + " and YEAR(StartTime) = " + year + " and sa.userid = " +
		// userId;

		System.out.println("querySensorList: " + querySensorList);
		System.out.println("queryUsage: " + queryUsage);

		ArrayList<Integer> sensorList = new ArrayList<Integer>();
		ArrayList<UsageDetails> usageList = new ArrayList<UsageDetails>();

		JSONArray myArray = new JSONArray();

		try {
			conn = new DatabaseConnection().getConnection();
			stmt = conn.createStatement();

			ResultSet rsSensorList = stmt.executeQuery(querySensorList);
			while (rsSensorList.next()) {
				sensorList.add(rsSensorList.getInt("sensorid"));
			}
			ResultSet rsUsage = stmt.executeQuery(queryUsage);
			while (rsUsage.next()) {
				UsageDetails usage = new UsageDetails(rsUsage.getInt("id"), rsUsage.getString("instanceId"),
						rsUsage.getInt("sensorId"), rsUsage.getInt("userId"), rsUsage.getTimestamp("starttime"),
						rsUsage.getTimestamp("endtime"));
				usageList.add(usage);
			}

			UsageDetails usageObj = null;
			int sensorId = -1;
			double sensorDurationInHrs = 0;
			String instanceId = "";
			for (int i = 0; i < sensorList.size(); i++) {
				sensorId = sensorList.get(i);
				System.out.println("SensorId: " + sensorId);
				sensorDurationInHrs = 0;
				for (int j = 0; j < usageList.size(); j++) {
					usageObj = usageList.get(j);
					if (usageObj.getSensorId() == sensorId) {
						instanceId = usageObj.getInstanceId();
						if (usageObj.getEndDate() != null) {
							// in milliseconds
							double diff = usageObj.getEndDate().getTime() - usageObj.getStartDate().getTime();
							sensorDurationInHrs += diff / 3600000;
							System.out.println("Duration:" + diff / 3600000 + usageObj.getString());
						} else {
							// Get current date
							java.util.Date date = new java.util.Date();
							double diff = date.getTime() - usageObj.getStartDate().getTime();
							sensorDurationInHrs += diff / 3600000;
							System.out.println("Duration:" + diff / 3600000 + usageObj.getString());
						}
					}
				}
				double rate = 0.15;

				JSONObject jObj = new JSONObject();
				jObj.put("instanceid", instanceId);
				jObj.put("sensorid", sensorId);
				jObj.put("hrsused", Math.round(sensorDurationInHrs * 100D) / 100D);
				jObj.put("rate", rate);
				jObj.put("amount", Math.round((rate * sensorDurationInHrs) * 100D) / 100D);
				myArray.put(jObj);
				// add sensorid, sensorduration => to a list
			}
			System.out.println(myArray.toString());
			return myArray;

		} catch (

		Exception e)

		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally

		{
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
