package com.sjsu.admin;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.sjsu.dbconnection.DatabaseConnection;

@Path("/usagemetrics")
public class UsageMetrics {
	@GET
	@Path("/getData")
	public Response getData() {
		try{
			Connection conn = new DatabaseConnection().getConnection();
			String queryUsers ="select count(*),DATE_FORMAT(logintime,'%m/%d') from loginmetrics where (logintime > DATE_SUB(sysdate(), INTERVAL 7 DAY)) group by DATE_FORMAT(logintime,'%m/%d') order by DATE_FORMAT(logintime,'%m/%d')";
			PreparedStatement stusers = conn.prepareStatement(queryUsers);
			ResultSet rs = stusers.executeQuery();
			JSONObject jobj = new JSONObject();
			JSONObject jobjuser = new JSONObject();
			JSONArray jdays = new JSONArray();
			JSONArray jcount = new JSONArray();
			while(rs.next())
			{
				
				
				jdays.put(rs.getString(2));
				jcount.put(rs.getInt(1));
			}
			jobjuser.put("userdays", jdays);
			jobjuser.put("usercounts", jcount);
			jobj.put("user", jobjuser);
			
			String qtotalUsers = "Select count(*) from User";
			PreparedStatement ptotalUsers = conn.prepareStatement(qtotalUsers);
			ResultSet rstotalUsers = ptotalUsers.executeQuery();
			while(rstotalUsers.next())
			{
				jobj.put("totalusers", rstotalUsers.getInt(1));
			}
			String totalSchedule ="Select count(*) from Scheduler";
			PreparedStatement ptotalSchedule = conn.prepareStatement(totalSchedule);
			ResultSet rstotalSchedule = ptotalSchedule.executeQuery();
			while(rstotalSchedule.next())
			{
				jobj.put("totalschedule", rstotalSchedule.getInt(1));
			}
			String totalSensorInstances ="Select count(*) from sensorallocation";
			PreparedStatement ptotalSensorInstances = conn.prepareStatement(totalSensorInstances);
			ResultSet rstotalSensorInstances = ptotalSensorInstances.executeQuery();
			while(rstotalSensorInstances.next())
			{
				jobj.put("totalsensor", rstotalSensorInstances.getInt(1));
			}
			String totalSensorData ="Select count(*) from sensordata";
			PreparedStatement ptotalSensorData = conn.prepareStatement(totalSensorData);
			ResultSet rstotalSensorData = ptotalSensorData.executeQuery();
			while(rstotalSensorData.next())
			{
				jobj.put("totalsensordata", rstotalSensorData.getInt(1));
			}
			
			
			return Response.status(200).entity(jobj).build();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}

}
