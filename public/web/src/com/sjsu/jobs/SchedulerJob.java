package com.sjsu.jobs;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.google.gson.Gson;
import com.sjsu.dbconnection.DatabaseConnection;
import com.sjsu.sensor.SensorData;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

public class SchedulerJob implements Job{
	@Override
	public void execute(JobExecutionContext context)
		throws JobExecutionException {
		try {
			System.out.println("User Schedule Job running");
			Connection conn = new DatabaseConnection().getConnection();
			String sql = "select schedulerid,sensorid from Scheduler where doneflag = 0 and time < sysdate()";
			PreparedStatement stmt = conn.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			ArrayList<String> scheduleId = new ArrayList<String>();
			while(rs.next())
			{
				String sensorID = rs.getString("sensorID");
				scheduleId.add(rs.getString("schedulerid"));
				//System.out.println("Sensor ID-->"+sensorID);
				String getLocationSql = "select sensorlocation from sensorprofile where sensorid = ?";
				PreparedStatement getLocationstmt = conn.prepareStatement(getLocationSql);
				getLocationstmt.setInt(1, Integer.parseInt(sensorID));
				ResultSet resultlocation = getLocationstmt.executeQuery();
				while(resultlocation.next())
				{
					String sensorLocation = resultlocation.getString("sensorlocation");
					String getDataJson = "{\"sensorID\":"+sensorID+",\"location\":\""+sensorLocation+"\"}";
					System.out.println(getDataJson);
					Client client = Client.create();
					String postUrl = "http://localhost:8090/SensorAPI/sensorapi/controllerservice/getSensorData";
					WebResource webResource = client.resource(postUrl);
			        ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,getDataJson);
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
			        insertSensorDatastmt.setString(5, sensorID);
			        int rowsInserted = insertSensorDatastmt.executeUpdate();
			    	if(rowsInserted==1){
			    		System.out.println("Data saved successfully");
			    	}
			    	else{
			    		System.out.println("Something went wrong data could not be saved");
			    	}
				}
				
			}
			StringBuilder builder = new StringBuilder();

			/*for( int i = 0 ; i < scheduleId.size(); i++ ) {
			    builder.append("?,");
			}*/
			for( String o : scheduleId ) {
				 builder.append(o+",");
			}
			if(scheduleId.size()!=0)
			{
				String updateDoneFlagSQL = "update Scheduler set doneflag = 1 where schedulerid IN (" 
				               + builder.deleteCharAt( builder.length() -1 ).toString()+")";
				System.out.println(updateDoneFlagSQL);
				PreparedStatement updateDoneFlagStmt = conn.prepareStatement(updateDoneFlagSQL);
				/*int index = 1;
				for( String o : scheduleId ) {
					updateDoneFlagStmt.setInt(index++, Integer.parseInt(o)); // or whatever it applies 
				}*/
				int rowsUpdated = updateDoneFlagStmt.executeUpdate(updateDoneFlagSQL);
				System.out.println("Number of rows update -->"+ rowsUpdated);
			}
			else{
				System.out.println("Nothing scheduled!!");
			}
			conn.close();
		}
		catch(Exception e){
			
		}
	}

}
