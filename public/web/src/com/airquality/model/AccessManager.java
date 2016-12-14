package com.airquality.model;

import java.sql.Connection;
import java.util.ArrayList;

import com.airquality.database.*;
import com.airquality.dto.*;
import com.sjsu.dbconnection.DatabaseConnection;

 
public class AccessManager
{
public ArrayList<SensorAlloc> getSensors() throws Exception
{
ArrayList<SensorAlloc> InstanceList = new ArrayList<SensorAlloc>();
DatabaseConnection db = new DatabaseConnection();
Connection con = db.getConnection();
Access access = new Access();
InstanceList = access.getSensors(con);
return InstanceList;
}
}
