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
			<div id="right-pane" class="col-lg-10 col-12 mt-1">
				<div class="row">
					<div id="fullnamefield" class="form-group col-xl-4">
						<input id="fullname" type="text" class="form-control" placeholder="Họ tên">
					</div>
					<div id="dobfield" class="form-group col-xl-4">
						<input id="dob" class="form-control" type="text" placeholder="Ngày sinh" />
					</div>
					<div id="addresslistfield" class="form-group col-xl-4">
						<select id="addresslist" class="form-control" multiple>
							<!--Ajax request to database to get addresses-->
						</select>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-xl-4">
						<input name="fathername" id="fathername" class="form-control" type="text" placeholder="Họ tên bố"/>
					</div>
					<div class="form-group col-xl-4">
						<input name="mothername" id="mothername" class="form-control" type="text" placeholder="Họ tên mẹ"/>
					</div>
					<button id="btn-search" class="btn btn-success d-flex align-items-center h-100"><i class="material-icons">search</i> Kiểm tra</button>
					<button id="btn-add" class="ml-2 btn btn-outline-success d-flex align-items-center h-100" disabled data-toggle="modal" data-target="#ProfileModal"><i class="material-icons">add</i> Thêm mới</button>
				</div>
	
				<hr color="black">
	
				<table class="table table-striped table-bordered table-responsive-xl">
					<thead id="TableHead" class="table-info"></thead>
					<tbody id="TableBody"></tbody>
				</table>
			
			</div> 
			
			<!-- The Modal -->
			<div class="modal fade" id="ProfileModal">
				<div class="modal-dialog modal-lg">

					<div class="modal-content">
						<div id="loader">
							<div class="dot dot1"></div>
							<div class="dot dot2"></div>
							<div class="dot dot3"></div>
						</div>
						<!-- Modal Header -->
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<!-- Modal body -->
						<div class="modal-body">
							<div class="card">
								<img id="suspect-photo" class="profile-pic card-img-overlay p-0" src="pic/camera.jpg" style="cursor: pointer;" />
								<input id="upload" type="file" name="file" onchange="loadImg(event)" hidden />
								<div class="card-body p-1">
									<input class="form-control mb-2" type=text id="suspect-fullname" placeholder="Họ tên" />
									<input class="form-control mb-2" type=text id="suspect-dob" placeholder="Ngày sinh" />
									<select id="suspect-address" class="form-control">
											<!--Ajax request to database to get addresses-->
									</select>
									<input class="form-control mb-2" type=text id="suspect-identifier" placeholder="Số CCCD/ĐDCN" />
									<input class="form-control mb-2" type=text id="suspect-phonenumber" placeholder="Số điện thoại" />
									<div class="form-check-inline">
										<label class="form-check-label text-success mb-2"> <input
											type="radio" class="form-check-input" name="status" value="1"
											selected>Còn sống
										</label>
									</div>
									<div class="form-check-inline">
										<label class="form-check-label text-danger mb-2"> <input
											type="radio" class="form-check-input" name="status" value="0">Đã
											chết
										</label>
									</div>
									<div class="form-check-inline">
										<label class="form-check-label text-warning mb-2"> <input
											type="radio" class="form-check-input" name="status" value="2">Đã
											chuyển khẩu đi
										</label>
									</div>
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
											<td class="sticky-column"><button class="rounded plus">+</button></td>
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
											<td class="sticky-column"><button class="rounded plus">+</button></td>
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
											<td class="sticky-column"><button class="rounded plus">+</button></td>
										</tr>
									</thead>
									<tbody id="family">
										<tr id="family1">
											<td>1</td>
											<td><select class="form-control" style="width: 80px;">
													<option selected>Bố</option>
													<option>Mẹ</option>
													<option>Chồng</option>
													<option>Vợ</option>
													<option>Con</option>
													<option>Anh</option>
													<option>Chị</option>
													<option>Em</option>
											</select></td>
											<td><input class="form-control" type="text" /></td>
											<td><input id="dob1" class="form-controla" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td class="sticky-column"><button class="rounded minus">-</button></td>
										</tr>
										<tr id="family2">
											<td>2</td>
											<td><select class="form-control" style="width: 80px;">
													<option>Bố</option>
													<option selected>Mẹ</option>
													<option>Chồng</option>
													<option>Vợ</option>
													<option>Con</option>
													<option>Anh</option>
													<option>Chị</option>
													<option>Em</option>
											</select></td>
											<td><input class="form-control" type="text" /></td>
											<td><input id="dob2" class="form-control" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td><input class="form-control" type="text" /></td>
											<td class="sticky-column"><button class="rounded minus">-</button></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<!-- Modal footer -->
						<div class="modal-footer d-flex justify-content-center">
							<button id="BtnChangeConfig" class="btn btn-success d-flex align-items-center"
								data-toggle="modal" data-target="#SubmitModal"><i class="material-icons">save</i> Lưu</button>
							<button class="btn btn-outline-success" data-dismiss="modal">Hủy</button>
						</div>
					</div>
				</div>

				<div class="modal fade" id="SubmitModal">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">
							<div class="modal-body">
								<h6>Bạn có muốn lưu thay đổi/thêm mới dữ liệu?</h6>
							</div>
							<div class="modal-footer d-flex justify-content-center">
								<button id="BtnConfig" class="btn btn-success"><i class="material-icons">send</i> Xác nhận</button>
								<button class="btn btn-outline-success" data-dismiss="modal">Hủy</button>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="modal fade" id="DeleteModal">
				<div class="modal-dialog modal-sm">
					<div class="modal-content">
						<div class="modal-body">
							<h6>Bạn có muốn xóa dữ liệu?</h6>
						</div>
						<div class="modal-footer d-flex justify-content-center">
							<button id="BtnDelete" class="btn btn-success"><i class="material-icons">send</i> Xác nhận</button>
							<button class="btn btn-outline-success" data-dismiss="modal">Hủy</button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="toast" id="ToastId" style="position: absolute; right: 5pt; top: 65pt;">
				<div class="toast-body bg-success text-white d-flex align-items-center">
					<!-- innerHTML -->
				</div>
			</div>
			
		</div>
</div>
	<script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
	<script	src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
	<script src="vendor/common.js" type="text/javascript"></script>
	<script src="vendor/configdata.js" type="text/javascript"></script>
</body>
</html>