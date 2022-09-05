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
import org.json.simple.JSONObject;

import com.caxhuongson.connection.DBConnection;

@WebServlet("/api-exportsuspectdata")
public class ExportSuspectData extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public ExportSuspectData() {
        super();
        // TODO Auto-generated constructor stub
    }
	@SuppressWarnings("unchecked")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		ResultSet rs;
		JSONObject JSONsuspect = new JSONObject();
		JSONArray JSONcrimes = new JSONArray();
		JSONArray JSONpenalties = new JSONArray();
		JSONArray JSONfamily = new JSONArray();
		String suspectid = request.getParameter("suspectid");
		// This is an Object to access crimes database or any database else
		DBConnection connection = new DBConnection();
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			rs = st.executeQuery("SELECT * FROM suspects WHERE id=\'" + suspectid + "\'");
			while(rs.next()) {
				JSONsuspect.put("fullname", rs.getString("fullname"));
				JSONsuspect.put("dob", rs.getString("dob") == null ? "" : rs.getString("dob"));
				JSONsuspect.put("address", rs.getString("address") == null ? "" : rs.getString("address"));
				JSONsuspect.put("phonenumber", rs.getString("phonenumber") == null ? "" : rs.getString("phonenumber"));
				JSONsuspect.put("photo", rs.getString("photo") == null ? "pic/profile.png" : "data:image/jpg;base64," + rs.getString("photo"));
				JSONsuspect.put("status", rs.getString("status"));
				JSONsuspect.put("identifier", rs.getString("identifier") == null ? "" : rs.getString("identifier"));
			}
			rs = st.executeQuery("SELECT * FROM crimedata WHERE suspectid=\'" + suspectid + "\'");
			while(rs.next()) {
				JSONObject crime = new JSONObject();
				crime.put("crimetype", rs.getString("crimetype"));
				crime.put("crimename", rs.getString("crimename"));
				crime.put("agency", rs.getString("agency") == null ? "" : rs.getString("agency"));
				crime.put("decision", rs.getString("decision") == null ? "" : rs.getString("decision"));
				crime.put("daycatch", rs.getString("daycatch") == null ? "" : rs.getString("daycatch"));
				crime.put("dayout", rs.getString("dayout") == null ? "" : rs.getString("dayout"));
				crime.put("placeofjail", rs.getString("placeofjail") == null ? "" : rs.getString("placeofjail"));
				crime.put("timeinjail", rs.getString("timeinjail") == null ? "" : rs.getString("timeinjail"));
				crime.put("note", rs.getString("note") == null ? "" : rs.getString("note"));
				JSONcrimes.add(crime);
			}
			rs = st.executeQuery("SELECT * FROM penaltydata WHERE suspectid=\'" + suspectid + "\'");
			while(rs.next()) {
				JSONObject penalty = new JSONObject();
				penalty.put("penaltytype", rs.getString("penaltytype") == null ? "" : rs.getString("penaltytype"));
				penalty.put("penaltyname", rs.getString("penaltyname"));
				penalty.put("agency", rs.getString("agency") == null ? "" : rs.getString("agency"));
				penalty.put("decision", rs.getString("decision") == null ? "" : rs.getString("decision"));
				penalty.put("note", rs.getString("note") == null ? "" : rs.getString("note"));
				JSONpenalties.add(penalty);
			}
			rs = st.executeQuery("SELECT * FROM family WHERE suspectid=\'" + suspectid + "\'");
			while(rs.next()) {
				JSONObject family = new JSONObject();
				family.put("relationship", rs.getString("relationship"));
				family.put("fullname", rs.getString("fullname"));
				family.put("dob", rs.getString("dob") == null ? "" : rs.getString("dob"));
				family.put("address", rs.getString("address") == null ? "" : rs.getString("address"));
				family.put("history", rs.getString("history") == null ? "" : rs.getString("history"));
				family.put("note", rs.getString("note") == null ? "" : rs.getString("note"));
				JSONfamily.add(family);
			}
			JSONsuspect.put("crimes", JSONcrimes);
			JSONsuspect.put("penalties", JSONpenalties);
			JSONsuspect.put("family", JSONfamily);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(JSONsuspect.toJSONString());
	}

}
