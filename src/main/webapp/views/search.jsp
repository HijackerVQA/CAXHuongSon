<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>Công an xã Hương Sơn</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/common-lib.jsp"%>
<link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />

<!--Select 2 library-->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"	rel="stylesheet" />

<link rel="stylesheet" href="vendor/common.css">
<link rel="stylesheet" href="vendor/search.css">
</head>
<body>
	<div class="container-fluid">
		<!--Header Page-->
		<%@ include file="/common/header.jsp"%>
		<!--Body Page-->
		<div id="main-pane" class="d-flex">
			<%@ include file="/common/menu.jsp"%>
			<div id="right-pane" class="col-lg-10 col-12">
				<h3 class="d-flex justify-content-center font-weight-bold">TRA CỨU TA,TS</h3>
				<div class="row">
					<div id="fullnamefield" class="form-group col-xl-4">
						<input id="fullname" type="text" class="form-control"	placeholder="Họ tên">
					</div>
					<div id="dobfield" class="form-group col-xl-4">
						<input id="dob" class="form-control" type="text" placeholder="Ngày sinh" />
					</div>
					<div id="addresslistfield" class="form-group col-xl-4">
						<select id ="addresslist" class="form-control" multiple="multiple">
							<!--Ajax request to database to get addresses-->
						</select>
					</div>
				</div>
				<div id="row3" class="row">
					<div class="form-group col-xl-6">
						<input name="fromdate" id="fromdate" class="form-control" type="text" placeholder="Ngày sinh từ" />
					</div>
					<div class="form-group col-xl-6">
						<input name="todate" id="todate" class="form-control" type="text" placeholder="Ngày sinh đến" />
					</div>
				</div>
				<div id="row1" class="row">
					<div class="form-group form-check col-xl-3 p-0">
						<label class="form-check-label ml-5">
							<input id="crimeinfocheck" class="form-check-input" type="checkbox" checked> Tìm theo lịch sử PPHS
						</label>
					</div>
					<div class="form-group col-xl-9">
						<input name="crimeinfo" id="crimeinfo" type="text" class="form-control" placeholder="Thông tin về PPHS (tên tội danh, trại giam,...)">
					</div>
				</div>
				<div id="row2" class="row">
					<div class="form-group form-check col-xl-3 p-0">
						<label class="form-check-label ml-5">
							<input id="penaltyinfocheck" class="form-check-input" type="checkbox" checked> Tìm theo lịch sử VPPL khác
						</label>
					</div>
					<div class="form-group col-xl-9">
						<input name="penaltyinfo" id="penaltyinfo" type="text" class="form-control" placeholder="Thông tin về VPPL khác (tên hành vi, cơ quan ra quyết định,...)">
					</div>
				</div>
				<div id="row4" class="row">
					<div class="form-group col-xl-6">
						<input name="fathername" id="fathername" class="form-control" type="text" placeholder="Họ tên bố"/>
					</div>
					<div class="form-group col-xl-6">
						<input name="mothername" id="mothername" class="form-control" type="text" placeholder="Họ tên mẹ"/>
					</div>
				</div>
				<div id="btn-land" class="d-flex justify-content-center col-12">
					<button id="btnsearch" class="btn btn-success d-flex align-items-center" onclick="requestsuspect(0)"><i class="material-icons">search</i>Tìm kiếm</button>
					<button id="btnadvance" class="btn btn-outline-success ml-1" onclick="showOrHide()">...Tìm kiếm nâng cao</button>
				</div>
				<div id="profiledata" class="mt-3">
					<h6 id="sequence"></h6>
					<div class="card-columns">
						<!--Ajax request to database to get suspects-->
					</div>
				</div>
			</div>
			
			<!-- The Modal -->
	<div class="modal fade" id="ProfileModal">
		<div class="modal-dialog modal-lg">
				
				<div class="modal-content">
				<!-- Modal Header -->
				<div class="modal-header">
					<h3 id="suspect-status"></h3>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<!-- Modal body -->
				<div class="modal-body">
					<div class="card">
						<img id="suspect-photo" class="profile-pic card-img-overlay p-0">
						<div class="card-body p-1">
							<p class="mb-4">Họ tên : <b id="suspect-fullname"></b></p>
							<p class="mb-4">Ngày sinh : <b id="suspect-dob"></b></p>
							<p class="mb-4">Địa chỉ : <b id="suspect-address"></b></p>
							<p class="mb-4">Số ĐDCN/CCCD: <b id="suspect-identifier"></b></p>
							<p class="mb-4">Số điện thoại : <b id="suspect-phonenumber"></b></p>
						</div>
					</div>
						<h4 class="text-danger">Lịch sử phạm pháp hình sự</h4>
						<div class="table-responsive">
						<table class="table table-striped table-bordered">
							<thead>
								<tr class="table-danger">
									<td><b>STT</b></td>
									<td><b>Hình phạt</b></td>
									<td><b>Tội danh</b></td>
									<td><b>Số Bản án/Ngày ra bản án</b></td>
									<td><b>Ngày bắt</b></td>
									<td><b>Cơ quan xét xử</b></td>
									<td><b>Ngày ra trại</b></td>
									<td><b>Nơi thi hành án</b></td>
									<td><b>Thời hạn</b></td>
									<td><b>Ghi chú</b></td>
								</tr>
							</thead>
							<tbody id="crime-data">
							</tbody>
						</table>
						</div>
						<h4 class="text-warning">Vi phạm pháp luật khác</h4>
						<div class="table-responsive">
						<table class="table table-striped table-bordered">
							<thead>
								<tr class="table-warning">
									<td><b>STT</b></td>
									<td><b>Hành vi vi phạm</b></td>
									<td><b>Số văn bản/Ngày ra văn bản</b></td>
									<td><b>Cơ quan ra văn bản xử phạt</b></td>
									<td><b>Hình thức xử phạt/Mức phạt</b></td>
									<td><b>Ghi chú</b></td>
								</tr>
							</thead>
							<tbody id="penalty-data">
							</tbody>
						</table>
						</div>
						<h4 class="text-info">Mối quan hệ gia đình</h4>
						<div class="table-responsive">
						<table class="table table-striped table-bordered">
							<thead>
								<tr class="table-info">
									<td><b>STT</b></td>
									<td><b>Quan hệ</b></td>
									<td><b>Họ tên</b></td>
									<td><b>Ngày tháng năm sinh</b></td>
									<td><b>Nơi cư trú</b></td>
									<td><b>Lịch sử phạm pháp</b></td>
									<td><b>Ghi chú</b></td>
								</tr>
							</thead>
							<tbody id="family">
							</tbody>
						</table>
						</div>
				<!-- Modal footer -->
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				</div>

			</div>
		</div>
	</div>
</div>
		</div>
	</div>
	<script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
	<script	src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script src="vendor/common.js" type="text/javascript"></script>
	<script src="vendor/search.js" type="text/javascript"></script>
</body>
</html>