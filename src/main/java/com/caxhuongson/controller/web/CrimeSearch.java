package com.caxhuongson.controller.web;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/search")
public class CrimeSearch extends HttpServlet {
       
    public CrimeSearch() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String crime_list = request.getParameter("crime[]");
		//String pass = request.getParameter("pass");
		
		RequestDispatcher rd = request.getRequestDispatcher("/views/result.jsp");
		request.setAttribute("crime", crime_list);
		rd.forward(request, response);
	}

}
