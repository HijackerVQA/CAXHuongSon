package com.caxhuongson.api;

import java.io.IOException;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.caxhuongson.connection.DBConnection;

@SuppressWarnings("serial")
@WebServlet("/api-suspects")
public class Suspects extends HttpServlet {
	@SuppressWarnings({ "unchecked" })
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ResultSet rs;
		JSONArray JSONresult = new JSONArray();
		// This is an Object to access crimes database or any database else
		DBConnection connection = new DBConnection();
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			String query = "SELECT * FROM suspects WHERE ";
			String wquery = "", crimequery = "", penaltyquery = "";
			String[] addresses = request.getParameterValues("addresslist");
			if(addresses == null)	addresses = new String[]{""};
			if(Integer.parseInt(request.getParameter("searchtype")) == 0) {
				query += "fullname like '%" + request.getParameter("fullname") + "%' and (dob is null or dob like '%" + request.getParameter("dob") +
						"%') and (fathername like '%" + request.getParameter("fathername") + "%' or fathername is null) and (mothername like '%" + request.getParameter("mothername") +
						"%' or mothername is null) and (address is null";
				for(int i = 0; i < addresses.length; i++)
					query += " or address like '%" + addresses[i] + "%'";
			rs = st.executeQuery(query + ")");
			while(rs.next()) {
				JSONObject JSONsuspect = new JSONObject();
				JSONsuspect.put("id", rs.getString("id"));
				JSONsuspect.put("fullname", rs.getString("fullname"));
				JSONsuspect.put("dob", rs.getString("dob"));
				JSONsuspect.put("address", rs.getString("address") == null ? "" : rs.getString("address"));
				JSONsuspect.put("fathername", rs.getString("fathername") == null ? "" : rs.getString("fathername"));
				JSONsuspect.put("mothername", rs.getString("mothername") == null ? "" : rs.getString("mothername"));
				JSONsuspect.put("status", rs.getString("status"));
				JSONsuspect.put("photo", rs.getString("photo") == null ? "pic/profile.png" : "data:image/jpg;base64," + rs.getString("photo"));
				JSONresult.add(JSONsuspect);
			}}else {
				for(int i = 0; i < addresses.length; i++)
					if(i==0) wquery += "WHERE fullname like '%" + request.getParameter("fullname") + "%' " +
							"and fathername like '%" + request.getParameter("fathername") + "%' " +
							"and mothername like '%" + request.getParameter("mothername") + "%' " +
							"and (address like '%" + addresses[i] + "%'";
					else wquery += " or address like '%" + addresses[i] + "%'";
				
				crimequery = "SELECT UNIQUE id,fullname,dob,address,fathername,mothername,status,photo FROM suspects INNER JOIN crimedata ON id = crimedata.suspectid AND " +
						"(crimename like '%" + request.getParameter("crimeinfo") + "%' OR crimedata.agency like '%" + request.getParameter("crimeinfo") +
						"%' OR crimedata.decision like '%" + request.getParameter("crimeinfo") + "%' OR daycatch like '%" + request.getParameter("crimeinfo") +
						"%' OR dayout like '%" + request.getParameter("crimeinfo") + "%' OR placeofjail like '%" + request.getParameter("crimeinfo") +
						"%' OR timeinjail like '%" + request.getParameter("crimeinfo") + "%' OR crimedata.note like '%" + request.getParameter("crimeinfo") + "%') " +
						wquery +")";
				
				penaltyquery = "SELECT UNIQUE id,fullname,dob,address,fathername,mothername,status,photo FROM suspects INNER JOIN penaltydata ON id = penaltydata.suspectid AND " +
						"(penaltyname like '%" + request.getParameter("penaltyinfo") + "%' OR penaltydata.decision like '%" + request.getParameter("penaltyinfo") +
						"%' OR penaltydata.agency like '%" + request.getParameter("penaltyinfo") + "%' OR penaltytype like '%" + request.getParameter("penaltyinfo") +
						"%' OR penaltydata.note like '%" + request.getParameter("penaltyinfo") + "%') " + wquery + ")";
				
				boolean crimecheck = Boolean.parseBoolean(request.getParameter("crimecheck"));
				boolean penaltycheck = Boolean.parseBoolean(request.getParameter("penaltycheck"));
				
				if(crimecheck && penaltycheck)	rs = st.executeQuery(crimequery + " UNION " + penaltyquery);
				else if(crimecheck)	rs = st.executeQuery(crimequery);
				else rs = st.executeQuery(penaltyquery);
				
				String fromdate = request.getParameter("fromdate");
				String todate = request.getParameter("todate");
				
				while(rs.next()) {
					if(checkDOB(fromdate, todate, rs.getString("dob"))) {
						JSONObject JSONsuspect = new JSONObject();
						JSONsuspect.put("id", rs.getString("id"));
						JSONsuspect.put("fullname", rs.getString("fullname"));
						JSONsuspect.put("dob", rs.getString("dob"));
						JSONsuspect.put("address", rs.getString("address"));
						JSONsuspect.put("fathername", rs.getString("fathername") == null ? "" : rs.getString("fathername"));
						JSONsuspect.put("mothername", rs.getString("mothername") == null ? "" : rs.getString("mothername"));
						JSONsuspect.put("status", rs.getString("status"));
						JSONsuspect.put("photo", rs.getString("photo") == null ? "pic/profile.png" : "data:image/jpg;base64," + rs.getString("photo"));
						JSONresult.add(JSONsuspect);
					}
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(JSONresult.toJSONString());
	}
	static boolean checkDOB(String fromdate, String todate, String dob) {
		Date SQLdob = Date.valueOf(toSQLDateFormat(dob,0));
		Date SQLfromdate;
		if(fromdate.compareTo("") == 0)
			SQLfromdate = Date.valueOf("1900-01-01");
		else
			SQLfromdate = Date.valueOf(toSQLDateFormat(fromdate,0));
		Date SQLtodate;
		if(todate.compareTo("") == 0)
			SQLtodate = new Date(System.currentTimeMillis());
		else
			SQLtodate = Date.valueOf(toSQLDateFormat(todate,1));
		if(SQLdob.compareTo(SQLfromdate) >= 0 && SQLdob.compareTo(SQLtodate) <= 0)
			return true;
		else
			return false;
	}
	static String toSQLDateFormat(String date, int offset) {
		if(date.length() == 4 && offset == 0)
			return date + "-01-01";
		else if(date.length() == 4 && offset == 1)
			return date + "-12-31";
		else
			return date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = new DBConnection();
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			String photo = "null";
			if(request.getParameter("photo").compareTo("null") != 0)	photo = "'" + request.getParameter("photo").replace(' ', '+') + "'";
			st.executeUpdate("INSERT INTO suspects VALUES('" + request.getParameter("suspectid") + "','" + request.getParameter("fullname") + "','" +
					request.getParameter("dob") + "','" + request.getParameter("address") + "','" + request.getParameter("fathername") + "','" +
					request.getParameter("mothername") + "'," + request.getParameter("status") + ",'" + request.getParameter("identifier") + "'," +
					photo + ",'" + request.getParameter("phonenumber") + "')");
			for(int i = 0; request.getParameterValues("crimename") != null && i < request.getParameterValues("crimename").length; i++) {
				st.executeUpdate("INSERT INTO crimedata VALUES('" + request.getParameter("suspectid") + "','" + request.getParameterValues("crimetype")[i] + "','" +
					request.getParameterValues("crimename")[i] + "','" + request.getParameterValues("crimeagency")[i] + "','" + request.getParameterValues("crimedecision")[i] + "','" +
					request.getParameterValues("daycatch")[i] + "','" + request.getParameterValues("dayout")[i] + "','" + request.getParameterValues("placeofjail")[i] + "','" +
					request.getParameterValues("timeinjail")[i] + "','" + request.getParameterValues("crimenote")[i] + "')");
			}
			for(int i = 0; request.getParameterValues("penaltyname") != null && i < request.getParameterValues("penaltyname").length; i++) {
				st.executeUpdate("INSERT INTO penaltydata VALUES('" + request.getParameter("suspectid") + "','" + request.getParameterValues("penaltyname")[i] + "','" +
					request.getParameterValues("penaltydecision")[i] + "','" + request.getParameterValues("penaltyagency")[i] + "','" + request.getParameterValues("penaltytype")[i] + "','" +
					request.getParameterValues("penaltynote")[i] + "')");
			}
			for(int i = 0; request.getParameterValues("familiername") != null && i < request.getParameterValues("familiername").length; i++) {
				st.executeUpdate("INSERT INTO family VALUES('" + request.getParameter("suspectid") + "','" + request.getParameterValues("familiername")[i] + "','" +
					request.getParameterValues("familierdob")[i] + "','" + request.getParameterValues("familieraddress")[i] + "','" + request.getParameterValues("history")[i] + "','" +
					request.getParameterValues("relationship")[i] + "','" + request.getParameterValues("familiernote")[i] + "')");
			}
			response.getWriter().write(request.getParameter("suspectid"));
		} catch (SQLException e) {
			response.getWriter().write(0);
			e.printStackTrace();
		}
	}
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DBConnection connection = new DBConnection();
		try {
			Statement st = connection.DBCrimesConnect().createStatement();
			st.executeUpdate("DELETE FROM suspects WHERE id='" + request.getParameter("suspectid") + "'");
			st.executeUpdate("DELETE FROM crimedata WHERE suspectid='" + request.getParameter("suspectid") + "'");
			st.executeUpdate("DELETE FROM penaltydata WHERE suspectid='" + request.getParameter("suspectid") + "'");
			st.executeUpdate("DELETE FROM family WHERE suspectid='" + request.getParameter("suspectid") + "'");
			response.getWriter().write(request.getParameter("suspectid"));
		} catch (SQLException e) {
			response.getWriter().write(0);
			e.printStackTrace();
		}
		
	}
}