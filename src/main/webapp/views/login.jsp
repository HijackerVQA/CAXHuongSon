<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>Công an xã Hương Sơn</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/common-lib.jsp"%>
<link rel="stylesheet" href="vendor/common.css">
</head>
<body>
	<div class="container-fluid">
		<div class="header bg-success d-flex">
			<div class="col-xl-1 col-2 d-flex align-items-center">
				<a class="m-auto" href="/trangchu"><img src="pic/pic.png" class="img-fluid"></a>
			</div>
			<div class="col-xl-3 col-10 d-flex align-items-center">
				<div>
					<p class="text-white m-0 d-flex justify-content-center">CÔNG AN HUYỆN MỸ ĐỨC</p>
					<p class="text-white m-0 font-weight-bold d-flex justify-content-center">CÔNG AN XÃ HƯƠNG SƠN</p>
				</div>
			</div>
			<div class="col-xl-8"></div>
		</div>
		<!--Body Page-->
		<div id="main-pane" class="d-flex align-items-center justify-content-center">
			<div class="col-xl-4">
				<div class="form-group border border-success rounded p-4">
					<h5 class="d-flex justify-content-center m-4 font-weight-bold text-success">ĐĂNG NHẬP TÀI KHOẢN</h5>
					<% if(request.getAttribute("message") != null && request.getAttribute("message").toString().compareTo("1") == 0) 
							out.print("<div class=\"alert alert-danger\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
							"Tài khoản, mật khẩu không chính xác. Vui lòng đăng nhập lại!</div>" +
							"<div class=\"alert alert-warning\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
							"Tài khoản 'test' sẽ được thay đổi mật khẩu ngẫu nhiên sau 1 ngày. Vui lòng liên hệ admin để lấy mk!!!</div>");
						else if(request.getAttribute("message") != null && request.getAttribute("message").toString().compareTo("2") == 0) 
							out.print("<div class=\"alert alert-danger\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
							"Vui lòng đăng nhập lại vào tài khoản admin!</div>");
					%>
					<form action="submitaccount" class="needs-validation" method="post" novalidate>
						<div class="form-group">
							<input name="account" type="text" class="form-control" placeholder="Tài khoản" id="account" required>
							<div class="valid-feedback"></div>
							<div class="invalid-feedback">Không được để trống trường này!</div>
						</div>
						<div class="form-group">
							<input name="password" type="password" class="form-control" placeholder="Mật khẩu" id="password" required>
							<div class="valid-feedback"></div>
							<div class="invalid-feedback">Không được để trống trường này!</div>
						</div>
						<button type="submit" class="btn btn-success  mt-2 w-100">Xác nhận</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="vendor/login.js"></script>
</body>
</html>