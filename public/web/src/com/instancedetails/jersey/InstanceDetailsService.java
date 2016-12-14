package com.instancedetails.jersey;
/* this is basically the rest service path to be accessed by http*/
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
 
import com.google.gson.Gson;
import com.instancedetails.dto.*;
import com.instancedetails.model.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response; 
@Path("/InstanceDetailService")
public class InstanceDetailsService
{
	@GET
	@Path("{instid}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	public Response Instancedetails(@PathParam("instid") String instid) {
		System.out.println("I'm here");
		System.out.println("Follwing will print string");
		System.out.println(instid);
		String instancedetailslist = null;
     	String instanceid = instid;
		String instancedetails = null;
		ArrayList<InstanceAlloc> InstanceDetailList = new ArrayList<InstanceAlloc>();
		try {
			InstanceDetailList = new AccessManager().getInstancedetails(instanceid);
			Gson gson = new Gson();
			instancedetailslist = gson.toJson(InstanceDetailList);
		} catch (Exception e) {
		e.printStackTrace();
		}
		System.out.println(instancedetailslist);
		return Response.ok().entity(instancedetailslist).build();
	}
}
