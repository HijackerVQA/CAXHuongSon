package com.caxhuongson;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Search
 */
@WebServlet("/search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Authentication auth = new Authentication(request.getCookies());
		if(auth.cookie != null && auth.acc.compareTo("admin") == 0) {
			RequestDispatcher rd = request.getRequestDispatcher("/views/admin-search.jsp");
			request.setAttribute("accountname", auth.cookie.getValue());
			rd.forward(request, response);
		}else if(auth.cookie != null) {
			RequestDispatcher rd = request.getRequestDispatcher("/views/search.jsp");
			request.setAttribute("accountname", auth.cookie.getValue());
			rd.forward(request, response);
		}else {
			response.sendRedirect(request.getContextPath() + "/login");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
