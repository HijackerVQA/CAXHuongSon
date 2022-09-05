package com.caxhuongson.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.caxhuongson.connection.DBConnection;

@WebServlet("/api-gettestpass")
public class GetTestPass extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = new DBConnection();
		ResultSet rs = null;
		String pass = null;
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT test FROM accounts WHERE account = 'admin'");
			rs.next();
			pass = rs.getString(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.getWriter().write(pass);
	}

}
