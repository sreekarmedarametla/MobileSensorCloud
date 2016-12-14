package com.controllerdropdown.model;

import java.sql.Connection;
import java.util.ArrayList;

import com.controllerdropdown.database.*;
import com.controllerdropdown.dto.*;
import com.sjsu.dbconnection.DatabaseConnection;

 
public class AccessManager
{
public ArrayList<ControlDropDown> getControllers() throws Exception
{
ArrayList<ControlDropDown> ControllerList = new ArrayList<ControlDropDown>();
DatabaseConnection db = new DatabaseConnection();
Connection con = db.getConnection();
Access access = new Access();
ControllerList = access.getControllers(con);
return ControllerList;
}
}
