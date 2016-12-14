package com.controllerdropdown.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.controllerdropdown.dto.*;;
 
public class Access
{
public ArrayList<ControlDropDown> getControllers(Connection con) throws SQLException
{
ArrayList<ControlDropDown> ControllerList = new ArrayList<ControlDropDown>();
PreparedStatement stmt = con.prepareStatement("SELECT controllerlocation FROM controllerprofile");
ResultSet rs = stmt.executeQuery();
try
{
while(rs.next())
{
ControlDropDown ControllerObj = new ControlDropDown();
ControllerObj.setControllerName(rs.getString("controllerlocation"));
ControllerList.add(ControllerObj);
}
} catch (SQLException e)
{
e.printStackTrace();
}
return ControllerList;
 
}
}
