package com.instancedetails.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.instancedetails.dto.*;;
 
public class Access
{
public ArrayList<InstanceAlloc> getInstancedetails(Connection con,String y) throws SQLException
{
	
	
	
ArrayList<InstanceAlloc> InstanceList = new ArrayList<InstanceAlloc>();
PreparedStatement stmt = con.prepareStatement("SELECT * FROM instancedetails where Instanceid=?");
stmt.setString(1,y);

ResultSet rs = stmt.executeQuery();
try
{
while(rs.next())
{
InstanceAlloc InstanceObj = new InstanceAlloc();
InstanceObj.setInstanceid(rs.getString("Instanceid"));
InstanceObj.setSensorid(rs.getString("Sensorid"));
InstanceObj.setControllerName(rs.getString("ControllerName"));
InstanceObj.setSensorStatus(rs.getString("SensorStatus"));
InstanceObj.setPhoto(rs.getString("Photo"));
InstanceObj.setNoofinstancesavailable(rs.getInt("Noofinstancesavailable"));
InstanceList.add(InstanceObj);
}
} catch (SQLException e)
{
e.printStackTrace();
}
return InstanceList;
 
}
}
