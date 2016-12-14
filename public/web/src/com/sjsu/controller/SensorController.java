package com.sjsu.controller;

import java.util.ArrayList;
import java.util.Iterator;

import com.google.gson.Gson;
import com.sjsu.sensor.Sensor;
import com.sjsu.sensor.SensorData;

public class SensorController {
	
	private ArrayList<Sensor> sensorArray = new ArrayList<Sensor>();
	private int controllerID;
	private String location;
	
	public ArrayList<Sensor> getSensorArray() {
		return sensorArray;
	}
	public void setSensorArray(ArrayList<Sensor> sensorArray) {
		this.sensorArray = sensorArray;
	}
	public int getControllerID() {
		return controllerID;
	}
	public void setControllerID(int controllerID) {
		this.controllerID = controllerID;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public SensorController(int controllerID, String location) {
		super();
		this.controllerID = controllerID;
		this.location = location;
	}
	public int addSensor(Sensor newSensor)
	{
		sensorArray.add(newSensor);
		return controllerID;
	}
	public void removeSensor(Sensor removeSensor)
	{
		Iterator<Sensor> sensorIterator = sensorArray.iterator();
		while(sensorIterator.hasNext())
		{
			Sensor sensor = sensorIterator.next();
			if(sensor.getSensorID() == removeSensor.getSensorID())
			{
				sensorIterator.remove();
			}
		}
	}
	public String getSensorData(int sensorID)
	{
		Iterator<Sensor> sensorIterator = sensorArray.iterator();
		while(sensorIterator.hasNext())
		{
			Sensor sensor = sensorIterator.next();
			if(sensor.getSensorID() == sensorID)
			{
				sensor.generateData();
				SensorData sensorData = sensor.getSensorData();
				Gson gson = new Gson();
				return gson.toJson(sensorData);
			}
		}
		return "No Data";
	}

}
