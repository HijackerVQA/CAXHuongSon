<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Công an xã Hương Sơn</title>
<%@ include file="common/header.jsp" %>
</head>
<body>
<div class="container-xl">
		<!--Header Page-->
		<div class="header bg-success d-flex">
			<div id="btn-drop" class="m-auto"><span class="m-auto glyphicon glyphicon-menu-hamburger rounded border p-1 border-dark"></span></div>
			<div class="col-xl-1 col-2 d-flex align-items-center"><a class="m-auto" href="/trangchu"><img src="pic.png" class="img-fluid"></a></div>
			<div class="col-xl-3 col-8 d-flex align-items-center">
				<div>
					<p class="font-time text-white m-0 d-flex justify-content-center">CÔNG AN HUYỆN MỸ ĐỨC</p>
					<p class="font-time text-white m-0 font-weight-bold d-flex justify-content-center">CÔNG AN XÃ HƯƠNG SƠN</p>
				</div>
			</div>
			<div class="col-xl-7 col-1"></div>
		</div>
		<!--Body Page-->
		<div id="main-pane" class="d-flex">
			<div id="left-pane" class="col-lg-2 bg-success col-12">
				<nav class="navbar">
					<ul class="navbar-nav w-100">
						<li class="nav-item">
							<a class="nav-link text-white font-time" href="#"><span class="glyphicon glyphicon-info-sign"></span> TIN TỨC</a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-white font-time border-top" href="#"><span class="glyphicon glyphicon-book"></span> CÔNG VĂN</a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-white font-time border-top active" href="#"><span class="glyphicon glyphicon-search"></span> TRA CỨU TA,TS</a>
						</li>
					</ul>
				</nav>
			</div>
			<div id="right-pane" class="col-lg-10 col-12">
				<h3 class="d-flex justify-content-center font-weight-bold font-time">TRA CỨU TA,TS</h3>
				<form action="search" method="post">
					<div class="row">
						<div class="col-xl-3">
							<input type="text" name="fullname" class="form-control" placeholder="Họ tên">
						</div>
						<div class="col-xl-3">
							<div class="form-group">
								<div class="input-group date" id="datetimepicker">
									<input type="text" class="form-control" placeholder="dd/mm/yyyy" />
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</div>
						</div>
						<div class="col-xl-6">
							<select class="crime-list w-100" name="crime[]" multiple="multiple">
								<!--Ajax request to database-->
								<option>Cố ý gây thương tích</option>
								<option>Tàng trữ trái phép chất ma túy</option>
							</select>
						</div>
						<div class="invisible">
							<!--Ajax request to database-->
								<input class="form-check-input" type="checkbox" name="01"/>
							</div>
					</div>
					<div class="d-flex justify-content-center col-12 mt-4">
						<input type="submit" class="btn btn-success" value="Tìm kiếm">
					</div>
				</form>
			</div>
		</div>
	</div>
	<%@ include file="common/footer.jsp" %>
	<script type="text/javascript">
		$(document).ready(function() {
			$('.crime-list').select2({
				placeholder: "Tội danh"
			});
		});
		$('#datepicker').datepicker({
			format: 'dd/mm/yyyy'
		});
	</script>
</body>
</html>