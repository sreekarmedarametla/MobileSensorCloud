package com.instancedetails.dto;

public class InstanceAlloc {

/* all basically getter and setter methods*/
	private String Instanceid;
	private String Sensorid;
	private String ControllerName;
	private String SensorStatus;
	private String Photo;
	private int Noofinstancesavailable;

	
	 
	public InstanceAlloc()
	{
	 
	}
	 
	public InstanceAlloc(String Instanceid,String Sensorid, String ControllerName,String SensorStatus,String Photo,int Noofinstancesavailable)
	{
	super();
	this.Instanceid =Instanceid;
	this.Sensorid = Sensorid;
	this.ControllerName=ControllerName;
	this.SensorStatus=SensorStatus;
	this.Photo=Photo;
	this.Noofinstancesavailable=Noofinstancesavailable;
	}
	 
	public String getInstanceid()
	{
	return Instanceid;
	}
	 
	public void setInstanceid(String Instanceid)
	{
	this.Instanceid = Instanceid;
	}
	 
	public String getSensorid()
	{
	return Sensorid;                                                                                
	}
	 
	public void setSensorid(String Sensorid)
	{
	this.Sensorid = Sensorid;
	}
	
	public String getControllerName()
	{
	return ControllerName;
	}
	 
	public void setControllerName(String ControllerName)
	{
	this.ControllerName = ControllerName;
	}
	
	public String getSensorStatus()
	{
	return SensorStatus;
	}
	
	public void setSensorStatus(String SensorStatus)
	{
	this.SensorStatus = SensorStatus;
	}
	
	public String getPhoto()
	{
	return Photo;
	}
	
	public void setPhoto(String Photo)
	{
	this.Photo = Photo;
	}
	
	public int getNoofinstancesavailable()
	{
	return Noofinstancesavailable;
	}
	public void setNoofinstancesavailable(int Noofinstancesavailable)
	{
	this.Noofinstancesavailable = Noofinstancesavailable; 
	}
	
	
	
	
	 
	@Override
	public String toString()
	{
	return "Instances [Instanceid=" + Instanceid + ", Sensorid=" + Sensorid  +" , ControllerName=" + ControllerName + ", SensorStatus= "
			+SensorStatus +" ,Photo="+ Photo +", Noofinstancesavailable=" + Noofinstancesavailable +"]" ;
	}
	 
	}
	 
	
	
	

