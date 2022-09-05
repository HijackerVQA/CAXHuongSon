package com.caxhuongson.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;

import com.caxhuongson.connection.DBConnection;

@WebServlet(asyncSupported = true, urlPatterns = { "/api-addresslist" })
public class AddressList extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = new DBConnection();
		ResultSet rs = null;
		
		JSONArray addresslist = new JSONArray();
		
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT * FROM addresses");
			while (rs.next()) {
				addresslist.add(rs.getString("address"));
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(addresslist.toJSONString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
