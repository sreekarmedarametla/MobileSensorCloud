package com.controllerdropdown.jersey;
/* this is basically the rest service path to be accessed by http*/
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
 
import com.google.gson.Gson;
import com.controllerdropdown.dto.*;
import com.controllerdropdown.model.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response; 
@Path("/ControlDropDownService")
public class ControlDropDownService
{
 @GET
@Path("/contollerdropdownlist")
 @Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
public Response Controllers()
{
String controllers = null;
ArrayList<ControlDropDown> ControllerList = new ArrayList<ControlDropDown>();
try
{
ControllerList = new AccessManager().getControllers();
Gson gson = new Gson();
controllers = gson.toJson(ControllerList);
} catch (Exception e)
{
e.printStackTrace();
}
return Response.ok().entity(controllers).build();
}
}
