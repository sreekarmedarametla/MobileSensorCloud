package com.airquality.jersey;
/* this is basically the rest service path to be accessed by http*/
import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
 
import com.google.gson.Gson;
 
import com.airquality.model.*;
 
import com.airquality.dto.*;
import javax.ws.rs.core.Response; 
@Path("/SensorService")
public class SensorService
{
 @GET
@Path("/sensorinfo")
@Produces("application/json")
public Response Sensor()
{
String sensors = null;
ArrayList<SensorAlloc> SensorList = new ArrayList<SensorAlloc>();
try
{
SensorList = new AccessManager().getSensors();
Gson gson = new Gson();
sensors = gson.toJson(SensorList);
} catch (Exception e)
{
e.printStackTrace();
}

return Response.status(201).entity(sensors).build();
}
}
