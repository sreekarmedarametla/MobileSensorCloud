package com.controllerdropdown.dto;

public class ControlDropDown {

/* all basically getter and setter methods*/
	private String ControllerName;
	
	public ControlDropDown()
	{
	 
	}
	 
	public ControlDropDown(String ControlllerName)
	{
	super();
	this.ControllerName = ControllerName;
	
	}
	 
	public String getControllerName()
	{
	return ControllerName;
	}
	 
	public void setControllerName(String ControllerName)
	{
	this.ControllerName = ControllerName;
	}

	 
	@Override
	public String toString()
	{
	return "Controllers [ControllerName=" + ControllerName  + "]";
	}
	 
	}
	 
	
	
	

