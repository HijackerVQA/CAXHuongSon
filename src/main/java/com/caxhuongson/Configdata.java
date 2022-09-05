package com.caxhuongson;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet("/configdata")
public class Configdata extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Authentication auth = new Authentication(request.getCookies());
		if(auth.cookie != null && auth.acc.compareTo("admin") == 0) {
			RequestDispatcher rd = request.getRequestDispatcher("/views/configdata.jsp");
			request.setAttribute("accountname", auth.cookie.getValue());
			rd.forward(request, response);
		}else {
			request.setAttribute("message", "2");
			request.getRequestDispatcher("/login").forward(request, response);
		}
	}

}
