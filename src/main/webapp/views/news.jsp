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
		<!--Header Page-->
		<%@ include file="/common/header.jsp"%>
		<!--Body Page-->
		<div id="main-pane" class="d-flex">
			<%@ include file="/common/menu.jsp"%>
			<div id="right-pane" class="col-lg-10 col-12">
				<h5 class="text-danger">Chức năng đang cập nhật, vui lòng chờ thông báo mới nhất.Coming soon...</h5>
			</div>
		</div>
	</div>
	<script>
		document.getElementById('news').className += " active";
	</script>
	<script src="vendor/common.js" type="text/javascript"></script>
</body>
</html>