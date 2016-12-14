package com.sjsu.sensor;

public class SensorData {
	
	private double no2;
	private double co;
	private double temperature;
	private double humidity;
	public double getNo2() {
		return no2;
	}
	public void setNo2(double no2) {
		this.no2 = no2;
	}
	public double getCo() {
		return co;
	}
	public void setCo(double co) {
		this.co = co;
	}
	public double getTemperature() {
		return temperature;
	}
	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}
	public double getHumidity() {
		return humidity;
	}
	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}
	public SensorData(double no2, double co, double temperature, double humidity) {
		super();
		this.no2 = no2;
		this.co = co;
		this.temperature = temperature;
		this.humidity = humidity;
	}
	public SensorData()
	{
		
	}
	public void generateData()
	{
		no2 = 0 + (Math.random()*500);
		co = 0 + (Math.random()*40);
		temperature = -10 + (Math.random()*100);
		humidity = 0 + (Math.random()*100);
	}

}
