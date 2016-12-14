package com.sjsu.admin;

import java.io.IOException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
import com.sjsu.sensor.Sensor;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sjsu.constants.ConstantValues;

@Path("/sensormanagement")
public class SensorManagement {
	@POST
	@Path("/addNewSensor")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response addSensorRecord(String incomingdata) {
		try {
			
			JSONObject jsonobj = new JSONObject(incomingdata);
			System.out.println(jsonobj);
			String location = jsonobj.optString("sensor_location");
			 String sensorID = jsonobj.optString("sensorID");
			 String sensorSerial = jsonobj.optString("sensorSerial");
			 Connection connection = new DatabaseConnection().getConnection();
			 String sql = "INSERT INTO sensorprofile (sensorid, sensorlocation, sensorserialno) VALUES (?, ?, ?)";
				PreparedStatement stmt = connection
						.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(sensorID));
				stmt.setString(2, location);
				stmt.setString(3, sensorSerial);
				int rowsInserted = stmt.executeUpdate();
				if(rowsInserted==1){
					System.out.println("Sensor Created Successfully in database");
				}
				else{
					System.out.println("Something went wrong sensor could not be created in database");
				}
				connection.close();
				Client client = Client.create();
				String postUrl = ConstantValues.baseURL+"/SensorAPI/sensorapi/controllerservice/addsensor";
				WebResource webResource = client.resource(postUrl);
				        String inputData = "{\"sensorID\":"+sensorID+",\"location\":\""+location+"\",\"sensorState\":0}";
				        ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,inputData);
				        if(wsResponse.getStatus()!=201){
				            throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
				        }
				         
				        String result = wsResponse.getEntity(String.class);
				        System.out.println("Response from the Server: ");
				        System.out.println(result);
				        jsonobj.put("responseData", result);
				        JSONArray jsonarray = new JSONArray();
				        System.out.println(jsonarray.put(jsonobj).toString());
				        return Response.status(200).entity(jsonarray.put(jsonobj).toString()).build();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
	@POST
	@Path("/addNewController")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response addControllerRecord(String incomingdata) {
		try {
			JSONObject jsonobj = new JSONObject(incomingdata);
			System.out.println(jsonobj);
			String location = jsonobj.optString("controllerLocation");
			 String controllerID = jsonobj.optString("controllerID");
			 String controllerSerial = jsonobj.optString("controllerSerial");
			 String controllerLat = jsonobj.optString("controllerLat");
			 String controllerLng = jsonobj.optString("controllerLng");
			 Connection connection = new DatabaseConnection().getConnection();
			 String sql = "INSERT INTO controllerprofile (controllerid, controllerlocation, controllerserial,x,y) VALUES (?, ?, ?, ?, ?)";
				PreparedStatement stmt = connection
						.prepareStatement(sql);
				stmt.setInt(1, Integer.parseInt(controllerID));
				stmt.setString(2, location);
				stmt.setString(3, controllerSerial);
				stmt.setString(4, controllerLat);
				stmt.setString(5, controllerLng);
				int rowsInserted = stmt.executeUpdate();
				if(rowsInserted==1){
					System.out.println("Controller Created Successfully");
				}
				else{
					System.out.println("Something went wrong Controller could not be created");
				}
				connection.close();
				Client client = Client.create();
				String postUrl = ConstantValues.baseURL+"/SensorAPI/sensorapi/controllerservice/addNewController";
				WebResource webResource = client.resource(postUrl);
				String inputData = "{\"controllerID\":"+controllerID+",\"location\":"+"\""+location+"\""+"}";
				System.out.println(inputData);
			    ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,inputData);
			    if(wsResponse.getStatus()!=201){
			        throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
			    }
			     
			    String result = wsResponse.getEntity(String.class);
			    System.out.println("Response from the Server: ");
			    System.out.println(result);
			    jsonobj.put("responseData", result);
		        JSONArray jsonarray = new JSONArray();
		        System.out.println(jsonarray.put(jsonobj).toString());
		        return Response.status(200).entity(jsonarray.put(jsonobj).toString()).build();
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}
	@GET
	@Path("/getSensorNetwork")
	public Response getSensorNetwork() {
		Client client = Client.create();
		String postUrl = ConstantValues.baseURL+"/SensorAPI/sensorapi/controllerservice/showSensorNetwork";
		WebResource webResource = client.resource(postUrl);
		 ClientResponse wsResponse = webResource.type("application/json").get(ClientResponse.class);
		    if(wsResponse.getStatus()!=201){
		        throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
		    }
		     
		    String result = wsResponse.getEntity(String.class);
		    System.out.println("Response from the Server: ");
		    System.out.println(result);
		    return Response.status(200).entity(result).build();
		
	}
	@POST
	@Path("/toggleSensor")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public Response toggleSensor(String incomingdata) {
		
		Client client = Client.create();
		String postUrl = ConstantValues.baseURL+"/SensorAPI/sensorapi/controllerservice/togglesensor";
		WebResource webResource = client.resource(postUrl);
		//String inputData = "{\"controllerID\":"+controllerID+",\"location\":"+"\""+location+"\""+"}";
		System.out.println(incomingdata);
	    ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,incomingdata);
	    if(wsResponse.getStatus()!=201){
	        throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
	    }
	     
	    String result = wsResponse.getEntity(String.class);
	    System.out.println("Response from the Server: ");
	    System.out.println(result);
		
		return Response.status(200).entity(result).build();
		
	}
	@POST
	@Path("/pullSensorData")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public Response pullSensorData(String incomingdata) {
		
		Client client = Client.create();
		String postUrl = ConstantValues.baseURL+"/SensorAPI/sensorapi/controllerservice/getSensorData";
		WebResource webResource = client.resource(postUrl);
		//String inputData = "{\"controllerID\":"+controllerID+",\"location\":"+"\""+location+"\""+"}";
		System.out.println(incomingdata);
	    ClientResponse wsResponse = webResource.type("application/json").post(ClientResponse.class,incomingdata);
	    if(wsResponse.getStatus()!=201){
	        throw new RuntimeException("HTTP Error: "+ wsResponse.getStatus());
	    }
	     
	    String result = wsResponse.getEntity(String.class);
	    System.out.println("Response from the Server: ");
	    System.out.println("ComputeAPI"+result);
		
		return Response.status(200).entity(result).build();
		
	}
	@GET
	@Path("/getControllerLocations")
	public Response getControllerLocations() {
		try {
			System.out.println("I am here");
		Connection connection = new DatabaseConnection().getConnection();
		String sql = "select controllerlocation,x,y from controllerprofile";
		PreparedStatement stmt = connection.prepareStatement(sql);
		ResultSet rs;
		
			rs = stmt.executeQuery();
		
		StringBuilder locations = new StringBuilder();
		JSONArray jarr = new JSONArray();
		while(rs.next())
		{
			
			String location = rs.getString("controllerlocation");
			String x = rs.getString("x");
			String y = rs.getString("y");
			JSONObject jobj = new JSONObject();
			jobj.put("location", location);
			jobj.put("x", Double.parseDouble(x));
			jobj.put("y", Double.parseDouble(y));
			
			jarr.put(jobj);
			locations.append(location+",");
		}
		connection.close();
		
		locations.deleteCharAt( locations.length() -1 );
		System.out.println(locations);
		return Response.ok(new JSONObject().put("locationData", jarr)).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		return Response.status(500).entity("Could not fetch locations!!").build();
		
	}

}
