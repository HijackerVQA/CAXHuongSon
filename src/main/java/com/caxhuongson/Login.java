package com.caxhuongson;

import java.io.IOException;
import java.security.SecureRandom;
import java.sql.Date;
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

import com.caxhuongson.api.SubmitAccount;
import com.caxhuongson.connection.DBConnection;

/**
 * Servlet implementation class Login
 */
@WebServlet("/login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie cookie = new Authentication(request.getCookies()).cookie;
		if(cookie != null) {
			cookie.setMaxAge(0);response.addCookie(cookie);
		}
		DBConnection connection = new DBConnection();
		ResultSet rs = null;
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT test FROM accounts WHERE account = 'test' ");
			rs.next();
			Date theday = Date.valueOf(rs.getString(1));
			if(theday.toString().compareTo(new Date(System.currentTimeMillis()).toString()) != 0) {
				String thepass = generateRandomPassword(8);
				st.executeUpdate("UPDATE accounts SET test = '" + thepass + "' WHERE account = 'admin'");
				st.executeUpdate("UPDATE accounts SET password = '" + new SubmitAccount().enCodePass(thepass) + "' WHERE account = 'test'");
				st.executeUpdate("UPDATE accounts SET test = '" + new Date(System.currentTimeMillis()).toString() + "' WHERE account = 'test'");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		request.getRequestDispatcher("/views/login.jsp").forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	public static String generateRandomPassword(int len)
    {
        // ASCII range – alphanumeric (0-9, a-z, A-Z)
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
 
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
 
        // each iteration of the loop randomly chooses a character from the given
        // ASCII range and appends it to the `StringBuilder` instance
 
        for (int i = 0; i < len; i++)
        {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }
 
        return sb.toString();
    }
}
