package com.sjsu.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.ws.rs.core.Response;

import org.json.JSONException;

import com.sjsu.dto.*;
 
public class Access
{
	 public static int number=100;
public Response setUserRequest(Connection con,String y) throws SQLException
{
	
	
	try {
		
		try {
			JSONArray jsonArray = new JSONArray(y);
 
			int count = jsonArray.length(); // get totalCount of all jsonObjects
			for(int i=0 ; i< count; i++){   // iterate through jsonArray 
				JSONObject jsonObject = jsonArray.getJSONObject(i);  // get jsonObject @ i position 
				
				System.out.println(jsonObject);
				 String id=jsonObject.optString("id");
				 String numberofsensors = jsonObject.optString("numberofsensors");
				 String location = jsonObject.optString("location");
				 String date = jsonObject.optString("date");
				String userid=jsonObject.optString("Userid");
				 String s=new String(location);
                 String s1=new String();
                 String s2=new String();
                 String instanceid=new String();
					 int wordCount = 0;

					    boolean word = false;
					    int endOfLine = s.length() - 1;

					    for (int j = 0; j < s.length(); j++) {
					        // if the char is a letter, word = true.
					        if (Character.isLetter(s.charAt(j)) && j != endOfLine) {
					            word = true;
					            // if char isn't a letter and there have been letters before,
					            // counter goes up.
					        } else if (!Character.isLetter(s.charAt(j)) && word) {
					            wordCount++;
					            word = false;
					            s2=s.substring(j+1,j+1+3);
					            
					            // last word of String; if it doesn't end with a non letter, it
					            // wouldn't count without this.
					        } else if (Character.isLetter(s.charAt(j)) && j == endOfLine) {
					            wordCount++;
					        }
					    }
					    
					    if (wordCount==1)
					    {
					     s1=s.substring(0,2);
					    
					    }
					    else 
					    {
					    	s1=Character.toString(s.charAt(0));
					    }
					   String no =""+number;
					    instanceid=s1+s2+no;
					    ++number;
					    
					    
					
				 
				 
				String sql = "INSERT INTO sensorallocation (Instanceid,Userid,StreetName) VALUES (?, ?, ?)";
				PreparedStatement stmt = con.prepareStatement(sql);
				
			    stmt.setString(1,instanceid);
				stmt.setString(2,userid);
				stmt.setString(3, location);
				/*stmt.setString(2, date);*/
				int rowsInserted = stmt.executeUpdate();
				if(rowsInserted==1){
				System.out.println("User Request Created Successfully in database");
				}
				else{
				System.out.println("Something went wrong User Request couldnot be processed");
				}
				String sql2 = "select sensorid from sensorprofile where sensorlocation = ? limit 1";
				PreparedStatement stmt2 = con.prepareStatement(sql2);
				stmt2.setString(1,location);
				ResultSet rs2 = stmt2.executeQuery();
				int sensoridd =22;
				while(rs2.next()){
					sensoridd = rs2.getInt("sensorid");
				}
				System.out.println("Sensor id is"+sensoridd);
				String sql1 = "insert into instancedetails (Instanceid,sensorid,controllername,sensorstatus,photo) values (?,?,?,?,?)";
				PreparedStatement stmt1 = con.prepareStatement(sql1);
				stmt1.setString(1,instanceid);
				stmt1.setInt(2,sensoridd);
				stmt1.setString(3, location);
				stmt1.setString(4, "Inactive");
				stmt1.setString(5, "Julian Street");
				int rowsInserted1 = stmt1.executeUpdate();
				if(rowsInserted1==1){
				System.out.println("User Request Created Successfully in database");
				}
				else{
				System.out.println("Something went wrong User Request couldnot be processed");
				}

				
				
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}

		 
}
	finally {}
	return Response.ok().build();        
	}
}
