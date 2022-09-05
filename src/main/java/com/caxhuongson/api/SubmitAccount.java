package com.caxhuongson.api;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.caxhuongson.connection.DBConnection;

@WebServlet("/submitaccount")
public class SubmitAccount extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String acc = request.getParameter("account");
		String pass = request.getParameter("password");
		DBConnection connection = new DBConnection();
		ResultSet rs = null;
		
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT password FROM accounts WHERE account=\'" + acc + "\'");
			if(rs.next()) {
			 do{
				if(enCodePass(pass).compareTo(rs.getString("password")) == 0) {
					Cookie cookie = new Cookie("account",acc);
					cookie.setMaxAge(60*10);
					response.addCookie(cookie);
					response.sendRedirect(request.getContextPath() + "/search");
				}else {
					request.setAttribute("message", "1");
					request.getRequestDispatcher("/login").forward(request, response);
				}
			}while(rs.next());}else {
				request.setAttribute("message", "1");
				request.getRequestDispatcher("/login").forward(request, response);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String enCodePass(String inp) {
		MessageDigest md;
		byte[] data = null;
		try {
			md = MessageDigest.getInstance("MD5");
			md.update(inp.getBytes());
			data= md.digest();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StringBuffer sb = new StringBuffer();
			for (int i = 0; i < data.length; i++) {
				sb.append(Integer.toString((data[i] & 0xff) + 0x100, 16).substring(1));
			}
		return sb.toString();
	}
}
