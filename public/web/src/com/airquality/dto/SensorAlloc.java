package com.airquality.dto;

public class SensorAlloc {

/* all basically getter and setter methods*/
	private String Instanceid;
	private String Userid;
	private String StreetName;

	
	 
	public SensorAlloc()
	{
	 
	}
	 
	public SensorAlloc(String Instanceid,String Userid, String StreetName)
	{
	super();
	this.Instanceid = Instanceid;
	this.Userid = Userid;
	this.StreetName=StreetName;
	
	}
	 
	public String getInsatnceid()
	{
	return Instanceid;
	}
	 
	public void setInstanceid(String Instanceid)
	{
	this.Instanceid = Instanceid;
	}
	 
	public String getStreetName()
	{
	return StreetName;                                                                                
	}
	 
	public void setStreetName(String StreetName)
	{
	this.StreetName = StreetName;
	}
	
	
	public String getUserid()
	{
	return Userid;
	}
	 
	public void setUserid(String Userid)
	{
	this.Userid = Userid;
	}
	
	
	
	 
	@Override
	public String toString()
	{
	return "Instances [Instanceid=" + Instanceid + ", Userid=" + Userid  +" , StreetName=" + StreetName + "]";
	}
	 
	}
	 
	
	
	

