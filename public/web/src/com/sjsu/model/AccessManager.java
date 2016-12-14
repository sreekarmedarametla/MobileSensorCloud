package com.sjsu.model;

import java.sql.Connection;
import java.util.ArrayList;

import com.sjsu.database.*;
import com.sjsu.dbconnection.DatabaseConnection;
import com.sjsu.dto.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response; 
 
public class AccessManager
{
public Response setUserRequest(String x) throws Exception
{

DatabaseConnection db = new DatabaseConnection();
Connection con = db.getConnection();
Access access = new Access();
access.setUserRequest(con,x);
con.close();
return Response.ok().build() ;
}
}
