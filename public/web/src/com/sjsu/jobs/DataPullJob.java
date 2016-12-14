package com.sjsu.jobs;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.codehaus.jettison.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.google.gson.Gson;
import com.sjsu.dbconnection.DatabaseConnection;
import com.sjsu.sensor.SensorData;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

public class DataPullJob implements Job {

	@Override
	public void execute(JobExecutionContext context)
		throws JobExecutionException {
		try {
			System.out.println("Data Pull Job is runing");
			Connection conn = new DatabaseConnection().getConnection();
			String sql = "select SensorProfile.SensorID,SensorProfile.SensorLocation from instancedetails,SensorProfile where instancedetails.sensorid=SensorProfile.sensorid and instancedetails.SensorStatus = 'Active' group by SensorProfile.SensorID,SensorProfile.SensorLocation";
			PreparedStatement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			while(rs.next())
			{
				JSONObject jobj = new JSONObject();
				jobj.put("sensorID", rs.getString(1));
				jobj.put("location", rs.getString(2));
				System.out.println(jobj.toString());
				Client client = Client.create();
				String postUrl = "http://localhost:8090/SensorAPI/sensorapi/controllerservice/getSensorData";
				WebResource webResource = client.resource(postUrl);
		        ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,jobj.toString());
		        if(wsResponse.getStatus()!=201){
		            throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
		        }
		         
		        String result = wsResponse.getEntity(String.class);
		        System.out.println("Response from the Server: "+result);
		        Gson gson = new Gson();
		        SensorData sensorData = gson.fromJson(result,SensorData.class);
		        String insertDataSql = "Insert into sensordata(createddate,no2,co,temp,humidity,sensorid) values(sysdate(),?,?,?,?,?)";
		        PreparedStatement insertSensorDatastmt = conn.prepareStatement(insertDataSql);
		        insertSensorDatastmt.setString(1, sensorData.getNo2()+"");
		        insertSensorDatastmt.setString(2, sensorData.getCo()+"");
		        insertSensorDatastmt.setString(3, sensorData.getTemperature()+"");
		        insertSensorDatastmt.setString(4, sensorData.getHumidity()+"");
		        insertSensorDatastmt.setString(5, rs.getString(1));
		        int rowsInserted = insertSensorDatastmt.executeUpdate();
		    	if(rowsInserted==1){
		    		System.out.println("Data saved successfully");
		    	}
		    	else{
		    		System.out.println("Something went wrong data could not be saved");
		    	}
			}
			conn.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}