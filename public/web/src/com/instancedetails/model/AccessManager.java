package com.instancedetails.model;

import java.sql.Connection;
import java.util.ArrayList;

import com.instancedetails.database.*;
import com.instancedetails.dto.*;
import com.sjsu.dbconnection.DatabaseConnection;

 
public class AccessManager
{
public ArrayList<InstanceAlloc> getInstancedetails(String x) throws Exception
{
ArrayList<InstanceAlloc> InstanceList = new ArrayList<InstanceAlloc>();
DatabaseConnection db = new DatabaseConnection();
Connection con = db.getConnection();
Access access = new Access();
InstanceList = access.getInstancedetails(con,x);
return InstanceList;
}
}
