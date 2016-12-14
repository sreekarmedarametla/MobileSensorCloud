package com.sjsu.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
	public Connection getConnection() throws Exception {
		try {
			String connectionURL = "jdbc:mysql://localhost:3306/sensorcloud";
			Connection connection = null;
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL,
					"airqualityd", "airquality");
			return connection;
		} catch (Exception e) {
			throw e;
		}
	}


}
