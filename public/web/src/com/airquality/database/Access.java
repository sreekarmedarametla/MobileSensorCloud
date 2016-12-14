package com.airquality.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
 
import com.airquality.dto.*;;
 
public class Access
{
public ArrayList<SensorAlloc> getSensors(Connection con) throws SQLException
{
ArrayList<SensorAlloc> InstanceList = new ArrayList<SensorAlloc>();
PreparedStatement stmt = con.prepareStatement("SELECT * FROM sensorallocation");
ResultSet rs = stmt.executeQuery();
try
{
while(rs.next())
{
SensorAlloc InstanceObj = new SensorAlloc();
InstanceObj.setInstanceid(rs.getString("Instanceid"));
InstanceObj.setUserid(rs.getString("Userid"));


InstanceObj.setStreetName(rs.getString("StreetName"));

InstanceList.add(InstanceObj);
}
} catch (SQLException e)
{
e.printStackTrace();
}
return InstanceList;
 
}
}
