package com.caxhuongson.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	public Connection DBCrimesConnect() {
		Connection connection = null;
	      try {
	    	  
	        Class.forName("org.postgresql.Driver");
	        connection = DriverManager.getConnection("jdbc:postgresql://ec2-54-158-247-210.compute-1.amazonaws.com:5432/d9p5n0bms0nctd","ewjbenxkjuibef",
            		"e331f644ad0fb89509acd018ed087a2adf03f572e824f2f273d3fd4c785e1c5b");
	      } catch (Exception e) {
	         e.printStackTrace();
	      }
		return connection;
	}

}
