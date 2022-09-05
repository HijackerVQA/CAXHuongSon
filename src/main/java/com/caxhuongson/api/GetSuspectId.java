package com.caxhuongson.api;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.caxhuongson.connection.DBConnection;

@WebServlet("/api-getsuspectid")
public class GetSuspectId extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ResultSet rs = null, rs_2 = null;
		String res = null;
		DBConnection connection = new DBConnection();
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			Statement st_2 = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT COUNT(id) FROM suspects");
			rs.next();
			rs_2 = st_2.executeQuery("SELECT COUNT(id) FROM suspects WHERE id = 'SP" + String.valueOf(rs.getInt(1) + 1) + "'");
			rs_2.next();
			if(rs_2.getInt(1) == 0) {
				res = "SP" + String.valueOf(rs.getInt(1) + 1);
			}else{
				ArrayList<String> list = new ArrayList<String>();
				rs_2 = st.executeQuery("SELECT id FROM suspects");
				while(rs_2.next()) {
					list.add(rs_2.getString(1));
				}
				for(int i = 1; i <= rs.getInt(1); i++) {
					if(list.indexOf("SP"+ String.valueOf(i)) == -1) {
						res = "SP"+ String.valueOf(i);
						break;
					}
				}
			}
			response.getWriter().write(res);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
