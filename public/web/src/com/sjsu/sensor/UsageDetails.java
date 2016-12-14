package com.sjsu.sensor;

public class UsageDetails {
	public UsageDetails(int usageId, String instanceId, int sensorId, int userId, java.util.Date startDate,
			java.util.Date endDate) {
		this.usageId = usageId;
		this.instanceId = instanceId;
		this.sensorId = sensorId;
		this.userId = userId;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	private int usageId;
	private String instanceId;
	private int sensorId;
	private int userId;
	private java.util.Date startDate;
	private java.util.Date endDate;

	public int getUsageId() {
		return this.usageId;
	}

	public void setUsageId(int usageId) {
		this.usageId = usageId;
	}

	public String getInstanceId() {
		return this.instanceId;
	}

	public void setInstanceId(String instanceId) {
		this.instanceId = instanceId;
	}

	public int getSensorId() {
		return this.sensorId;
	}

	public void setSensorId(int sensorId) {
		this.sensorId = sensorId;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public java.util.Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(java.util.Date startDate) {
		this.startDate = startDate;
	}

	public java.util.Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(java.util.Date endDate) {
		this.endDate = endDate;
	}

	public String getString() {
		return "Usage Id = " + usageId + ", Instance Id = " + instanceId + ", SensorId = " + sensorId + ", UserId = "
				+ userId + ", StartDate = " + startDate + ", EndDate = " + endDate;
	}
}
