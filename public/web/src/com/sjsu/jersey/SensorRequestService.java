package com.sjsu.jersey;
/* this is basically the rest service path to be accessed by http*/
import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.google.gson.Gson;
import com.sjsu.dto.*;
import com.sjsu.model.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response; 
import javax.ws.rs.POST;
import javax.ws.rs.Consumes;
@Path("/SensorRequestService")
public class SensorRequestService
{
	@POST
	@Path("/submitsensorrequest")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public Response Instancedetails(String incomingdata) {
		
		System.out.println(incomingdata);
		String instancedetailslist = null;
     	String incomingrequest = incomingdata;
		
		
	try {
		 new AccessManager().setUserRequest(incomingrequest);
			
		} catch (Exception e) {
		e.printStackTrace();
		}
		
		return Response.ok().build();
	}
}
