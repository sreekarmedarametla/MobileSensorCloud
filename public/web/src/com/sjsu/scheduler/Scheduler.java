package com.sjsu.scheduler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.sjsu.dbconnection.DatabaseConnection;

@Path("/scheduler")
public class Scheduler {
	@POST
	@Path("/getAllocatedSensors")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getallocatedSensors(String incomingdata)
	{
		System.out.println(incomingdata);
		incomingdata = incomingdata.replace("\"", "");
		System.out.println("HelloScheduler");
		try
		{
			Connection connection = new DatabaseConnection().getConnection();
			String sql = "select distinct instancedetails.SensorId from instancedetails,sensorallocation where instancedetails.Instanceid=sensorallocation.Instanceid and sensorallocation.UserId=?";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setInt(1, Integer.parseInt(incomingdata));
			ResultSet rs;
				rs = stmt.executeQuery();
			StringBuilder sensorids = new StringBuilder();
			while(rs.next())
			{
				
				String sensor = rs.getString("sensorid");
				sensorids.append(sensor+",");
			}
			sensorids.deleteCharAt( sensorids.length() -1 );
			System.out.println(sensorids);
			return Response.ok(sensorids).build();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	@POST
	@Path("/submitschedule")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public Response submitschedule(String incomingdata)
	{
		try {
			JSONObject jsonobj = new JSONObject(incomingdata);
			System.out.println(jsonobj);
			String allocatedSensor = jsonobj.optString("allocated_sensors");
			 String datetime = jsonobj.optString("datetime");
			 DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm", Locale.ENGLISH);
			 Date date = format.parse(datetime);
			 System.out.println(date);
			 String userid = jsonobj.optString("userid");
			 System.out.println(allocatedSensor+"  "+date.toString()+"  "+userid);
			 Connection connection = new DatabaseConnection().getConnection();
			 String sql = "INSERT INTO Scheduler (sensorid, Time,userid) VALUES (?, ?,?)";
				PreparedStatement stmt = connection
						.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(allocatedSensor));
				stmt.setTimestamp(2, new java.sql.Timestamp(date.getTime()));
				stmt.setInt(3, Integer.parseInt(userid));
				int rowsInserted = stmt.executeUpdate();
				if(rowsInserted==1){
					System.out.println("Scheduled Successfully in database");
					jsonobj.put("responseData", "Data Collection Scheduled Successfully");
			        JSONArray jsonarray = new JSONArray();
			        System.out.println(jsonarray.put(jsonobj).toString());
			        return Response.status(200).entity(jsonarray.put(jsonobj).toString()).build();
				}
				else{
					System.out.println("Something went wrong schedule could not be created in database");
				}
				connection.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	@POST
	@Path("/getUserSchedule")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getUserSchedule(String incomingdata)
	{
		System.out.println(incomingdata);
		incomingdata = incomingdata.replace("\"", "");
		System.out.println("HelloScheduler");
		try
		{
			Connection connection = new DatabaseConnection().getConnection();
			String sql = "select Time,Sensorid from Scheduler where userid =? and DoneFlag=0;";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setInt(1, Integer.parseInt(incomingdata));
			ResultSet rs;
				rs = stmt.executeQuery();
				JSONArray jarray = new JSONArray();
			while(rs.next())
			{
				JSONObject jobj = new JSONObject();
				jobj.put("time", rs.getString("Time"));
				jobj.put("sensorid", rs.getInt("Sensorid"));
				jarray.put(jobj);
				
			}
			
			System.out.println(jarray.toString());
			return Response.status(200).entity(jarray).build();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
		
	}

}
