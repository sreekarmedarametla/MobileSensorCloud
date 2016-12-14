package com.sjsu.sensor;

public class Sensor {
	
	private int sensorID;
	//private double temp;
	private String location;
	private int sensorState; // '0' off '1' on 
	private SensorData sensorData;
	
	public SensorData getSensorData() {
		return sensorData;
	}
	public void setSensorData(SensorData sensorData) {
		this.sensorData = sensorData;
	}
	public Sensor(){
		this.sensorData = new SensorData();
		
	}
	public Sensor(int sensorID, SensorData sensorData, String location, int sensorState) {
		super();
		this.sensorID = sensorID;
		//this.temp = temp;
		this.location = location;
		this.sensorState = sensorState;
		this.sensorData = sensorData;
	}
	public Sensor(int sensorID, String location) {
		super();
		this.sensorID = sensorID;
		this.location = location;
		this.sensorState = 0;
		this.sensorData = new SensorData();
	}
	public int getSensorState() {
		return sensorState;
	}
	public void setSensorState(int sensorState) {
		this.sensorState = sensorState;
	}
	public int getSensorID() {
		return sensorID;
	}
	public void setSensorID(int sensorID) {
		this.sensorID = sensorID;
	}
	/*public double getTemp() {
		return temp;
	}
	public void setTemp(double temp) {
		this.temp = temp;
	}*/
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public void generateData()
	{
		//this.temp = Math.random()*100;
		sensorData.generateData();
	}

}
