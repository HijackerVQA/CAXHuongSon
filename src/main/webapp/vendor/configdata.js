var SuspectId = "";
var SuspectPhoto = null;
var family_temp = $('#family').html();

$('#dob').datepicker({
	format: 'dd/mm/yyyy'
});

$('#suspect-dob').datepicker({
	format: 'dd/mm/yyyy'
});

$('#addresslist').select2({
	placeholder: "Chọn địa chỉ",
	width: '100%'
});

$('#suspect-address').select2({
	placeholder: "Chọn địa chỉ",
	width: '100%'
});

$("#ToastId").toast({
    animation: false,
    delay: 4000
});

$('.select2-selection').css('height',$('#dob').css('height'));
$('#suspect-photo').click(function(){ $('#upload').trigger('click'); });

//Get address data to select
const AJAXaddresslist = new XMLHttpRequest();
AJAXaddresslist.open("GET", "api-addresslist");
AJAXaddresslist.send();
AJAXaddresslist.onload = function(){
	let lists = JSON.parse(this.responseText);
	for(let address of lists){
		document.getElementById("addresslist").innerHTML += "<option>" + address + "</option>";
		document.getElementById("suspect-address").innerHTML += "<option value=\"" + address + "\">" + address + "</option>";
	}
}

//Catch onchange event input file to preview image
var loadImg = function(event) {
	const image = document.getElementById('suspect-photo');
	image.src = URL.createObjectURL(event.target.files[0]);
    // Get the remote image as a Blob with the fetch API
    fetch(image.src)
        .then((res) => res.blob())
        .then((blob) => {
            // Read the Blob as DataURL using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert to Base64 string
                SuspectPhoto = getBase64StringFromDataURL(reader.result);
            };
            reader.readAsDataURL(blob);
        });
};
const getBase64StringFromDataURL = (dataURL) =>
dataURL.replace('data:', '').replace(/^.+,/, '');

//Event to add some input field
function addPlusBtnEvent(){
document.getElementsByClassName("plus")[0].addEventListener('click',function(){
	var tr = document.createElement("tr");
	tr.id = index("crime-data", 1);
	tr.innerHTML = "<td>" + tr.id.replace("crime-data","") + "</td>" + "<td><select class=\"form-control crime-data\" style=\"width: 200px;\"><option>Tù có thời hạn</option><option>Tù có thời hạn cho hưởng án treo</option><option>Cải tạo không giam giữ</option></select></td>";
	for(let i = 0; i < this.parentNode.parentNode.childElementCount - 3; i++){
		tr.innerHTML += "<td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/></td>";
	}
	tr.innerHTML += "<td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td>";
	this.parentElement.parentElement.parentElement.nextElementSibling.appendChild(tr);
	addMinusBtnEvent();
})

document.getElementsByClassName("plus")[1].addEventListener('click',function(){
	var tr = document.createElement("tr");
	tr.id = index("penalty-data", 1);
	tr.innerHTML = "<td>" + tr.id.replace("penalty-data","") + "</td>";
	for(let i = 0; i < this.parentNode.parentNode.childElementCount - 2; i++){
		tr.innerHTML += "<td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/></td>";
	}
	tr.innerHTML += "<td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td>";
	this.parentElement.parentElement.parentElement.nextElementSibling.appendChild(tr);
	addMinusBtnEvent();
})

document.getElementsByClassName("plus")[2].addEventListener('click',function(){
	var tr = document.createElement("tr");
	tr.id = index("family", 1);
	tr.innerHTML = "<td>" + tr.id.replace("family","") + "</td>";
	tr.innerHTML += "<td><select class=\"form-control\" style=\"width: 80px;\"><option>Bố</option><option>Mẹ</option><option>Chồng</option><option>Vợ</option><option>Con</option>" +
					"<option>Anh</option><option>Chị</option><option>Em</option></select></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/></td>" + 
					"<td><input id=\"dob" + tr.id.replace("family","") + 
					"\" class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/>" +
					"<td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\"/><td><input class=\"form-control\" type=\"text\" style=\"min-width: 100px;\"/>";
	tr.innerHTML += "<td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td>";
	this.parentElement.parentElement.parentElement.nextElementSibling.appendChild(tr);
	addMinusBtnEvent();
	$('#dob' + tr.id.replace("family","")).datepicker({
		format: 'dd/mm/yyyy'
	});
})
}
addPlusBtnEvent();

function index(id, i){
	while(document.getElementById(id + i) != undefined){i++;}
	return id + i;
}

//Delete some input field
function addMinusBtnEvent(){
for(var x of document.getElementsByClassName("minus")){
	x.addEventListener('click',function(){
		this.parentNode.parentNode.parentNode.removeChild(this.parentElement.parentElement);
	});
}}

function requestGETAJAX(url, cFunction) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {cFunction(this);}
	xhttp.open("GET", url);
	xhttp.send();
}
//Btn add click
$("#btn-add").click(function(){
	$('#loader').hide();
	//Get SuspectId new
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "api-getsuspectid");
	xhttp.send();
	xhttp.onload = function(){
		SuspectId = this.responseText;
	}
	//Set suspect's data to blank
	$('#suspect-photo').attr('src',"pic/camera.jpg");
	$('#suspect-fullname').val("");
	$('#suspect-dob').val("");
	SuspectPhoto = null;
	$("#suspect-address").val(null).trigger('change');
	$('#suspect-identifier').val("");
	$('#suspect-phonenumber').val("");
	$('input:radio[name="status"]').filter('[value="1"]').attr('checked', true);
	
	$('#crime-data').html("");
	$('#penalty-data').html("");
	$('#family').html(family_temp);
	
	$('#dob1').datepicker({
		format: 'dd/mm/yyyy'
	});
	$('#dob2').datepicker({
		format: 'dd/mm/yyyy'
	});
	addMinusBtnEvent();
	$('#BtnConfig').attr('onclick','addData()');
});

//Btn search click
$("#btn-search").click(function(){
	var mark = false;
	for(let i of $('.row input')){
		if(i.value != "")	mark = true;
	}
	if(!mark && $('#addresslist').val().length != 0)	mark = true;
	if(mark){
		$("#TableHead").html("");
		$("#TableBody").html("");
		var adquery = "";
		$('#addresslistfield :selected').each(function(i, sel){
		    adquery += "&addresslist=" + $(sel).val();
		});
		requestGETAJAX("api-suspects?fullname=" + $('#fullname').val().toUpperCase().trim() + "&dob=" + $('#dob').val() + "&fathername=" + 
				$('#fathername').val().toUpperCase().trim() + "&mothername=" + $('#mothername').val().toUpperCase().trim() + "&address=" + adquery + "&searchtype=0", searchsuspect);
		$("#btn-add").prop("disabled",false);
		$("#btn-search").html("<span class=\"spinner-border spinner-border-sm text-light\"></span> Kiểm tra");
	}else	alert("Hãy điền vào ít nhất 1 trong các trường thông tin để tìm kiếm!");
});

function searchsuspect(xhttp){
	let suspects = JSON.parse(xhttp.responseText);
	document.getElementById("TableHead").innerHTML += "<tr><td><b>STT</b></td><td>Ảnh mặt</td><td><b>Họ tên</b></td>" +
			"<td><b>Tình trạng</b></td><td><b>Ngày sinh</b></td><td><b>Địa chỉ</b></td><td><b>Họ tên bố</b></td><td><b>Họ tên mẹ</b></td><td><b>Cập nhật/Xóa</b></td></tr>";
	var index = 1;
	var photosrc = null;
	for(let suspect of suspects){
		var status = "";
		if(suspect.status == 0){
			status = "<span class=\"badge badge-danger\">Đã chết</span>";
		}else if(suspect.status == 1){
			status = "<span class=\"badge badge-success\">Còn sống</span>";
		}else{
			status = "<span class=\"badge badge-warning\">Đã chuyển khẩu đi</span>";
		}
		document.getElementById("TableBody").innerHTML += "<tr id=\"" + suspect.id + "\"><td class=\"pt-5\">" + index++ + "</td><td><img style=\"height: 20vh\" src=\"" + suspect.photo +
			"\"/></td><td class=\"pt-5\">" + suspect.fullname + "</td><td class=\"pt-5\">" + status + "</td><td class=\"pt-5\">" + suspect.dob + "</td><td class=\"pt-5\">" + suspect.address +
			"</td><td class=\"pt-5\">" + suspect.fathername + "</td><td class=\"pt-5\">" + suspect.mothername + "</td>" +
			"<td class=\"pt-5\"><a class=\"mr-2\" data-toggle=\"modal\" data-target=\"#ProfileModal\" onclick=\"getData('" + suspect.id + "')\"><i class=\"material-icons\">edit" +
			"</i></a><a class=\"text-danger\" data-toggle=\"modal\" data-target=\"#DeleteModal\" onclick=\"deleteData('" + suspect.id + "')\"><i class=\"material-icons\">delete</i></a></td></tr>";
	}
	$("#btn-search").html("<i class=\"material-icons\">search</i> Kiểm tra");
}

//AJAX get data
function getData(id){
	$('#loader').show();
	SuspectId = id;
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "api-exportsuspectdata?suspectid=" + id);
	xhttp.send();
	xhttp.onload = function() {
		let suspect = JSON.parse(this.responseText);
		if(suspect.status == 0)	$('input:radio[name="status"]').filter('[value="0"]').attr('checked', true);
		else if(suspect.status == 1) $('input:radio[name="status"]').filter('[value="1"]').attr('checked', true);
		else $('input:radio[name="status"]').filter('[value="2"]').attr('checked', true);
		$('#suspect-photo').attr('src', suspect.photo);
		$('#suspect-fullname').val(suspect.fullname);
		$('#suspect-dob').val(suspect.dob);
		SuspectPhoto = suspect.photo == "pic/profile.png" ? null : suspect.photo.slice(22,suspect.photo.length);
		$('#suspect-address').val(suspect.address);
		$('#suspect-identifier').val(suspect.identifier);
		$('#suspect-phonenumber').val(suspect.phonenumber);
		$('#crime-data').html("");
		$('#penalty-data').html("");
		$('#family').html("");
		var i = 1;
		
		$("#suspect-address").val(suspect.address).trigger('change');
		
		for(let crime of suspect.crimes){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			var select = document.createElement("select");
			var options = ["Tù có thời hạn","Tù có thời hạn cho hưởng án treo","Cải tạo không giam giữ"];
			select.className = "form-control";
			select.style = "width: 200px;";
			for(let opt of options){
				if(opt != crime.crimetype)
					select.innerHTML += "<option>" + opt + "</option>";
				else
					select.innerHTML += "<option selected>" + opt + "</option>";
			}
			tr.innerHTML += "<td>" + i + "</td>";
			td.appendChild(select);
			tr.appendChild(td);
			tr.innerHTML +="</td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.crimename +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.decision +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.daycatch +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.agency +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.dayout +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.placeofjail +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.timeinjail +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + crime.note + "\"/></td>" +
				"<td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td>";
			document.getElementById('crime-data').appendChild(tr);
			i++;
		}i = 1;
		
		for(let penalty of suspect.penalties){
			document.getElementById('penalty-data').innerHTML += "<tr id=\"penalty-data" + i + "\"><td>" + i +
				"</td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + penalty.penaltyname +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + penalty.decision +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + penalty.agency +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + penalty.penaltytype +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + penalty.note + "\"/></td>" +
				"<td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td></tr>";
			i++;
		}i = 1;
		
		for(let familier of suspect.family){
			var tr = document.createElement("tr");
			tr.id = "family" + i;
			var td = document.createElement("td");
			var select = document.createElement("select");
			var options = ["Bố","Mẹ","Chồng","Vợ","Con","Anh","Chị","Em"];
			select.className = "form-control";
			select.style = "width: 80px;";
			for(let opt of options){
				if(opt != familier.relationship)
					select.innerHTML += "<option>" + opt + "</option>";
				else
					select.innerHTML += "<option selected>" + opt + "</option>";
			}
			tr.innerHTML += "<td>" + i + "</td>";
			td.appendChild(select);
			tr.appendChild(td);
			tr.innerHTML += "<td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + familier.fullname +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 120px;\" id=\"dob" + i + "\" value=\"" + familier.dob +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + familier.address +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + familier.history +
				"\"/></td><td><input class=\"form-control\" type=\"text\" style=\"min-width: 150px;\" value=\"" + familier.note +
				"\"/></td><td class=\"sticky-column\"><button class=\"rounded minus\">-</button></td></td>";
			document.getElementById("family").appendChild(tr);
			$('#dob' + i).datepicker({
				format: 'dd/mm/yyyy'
			});
			i++;
		}
		addMinusBtnEvent();
		$('#loader').fadeOut();
		$('#BtnConfig').attr('onclick','editData()');
	}
}

function addData(){
	$('#BtnConfig').html("<span class=\"spinner-border spinner-border-sm text-light\"></span> Xác nhận");
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "api-suspects");
	xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded; charset=UTF-8");
	xhttp.send(getConfigString());
	xhttp.onload = function(){
		if(this.responseText == SuspectId)	{
			showToast(2, 0);$('#SubmitModal').modal('toggle');$('#ProfileModal').modal('toggle');
			$('#BtnConfig').html("<i class=\"material-icons\">send</i> Xác nhận");
		}
		else	{showToast(2, 1);$('#SubmitModal').modal('toggle');$('#BtnConfig').html("<i class=\"material-icons\">send</i> Xác nhận");}
	}
}
function getConfigString(){
	var FatherName = "", MotherName = "";
	var status = 1;
	for(let rad of $('input:radio[name=status]')){
		if(rad.checked == true)	status = rad.value;
	}
	var familydata = "";
	for(let i = 0; i < $("#family tr").length; i++){
		if($('#family select')[i].value == "Bố")	FatherName = $('#family input')[i*5].value.toUpperCase();
		if($('#family select')[i].value == "Mẹ")	MotherName = $('#family input')[i*5].value.toUpperCase();
		familydata += "&relationship=" + $('#family select')[i].value + "&familiername=" + $('#family input')[i*5].value.toUpperCase() + "&familierdob=" + $('#family input')[i*5 + 1].value +
			"&familieraddress=" + $('#family input')[i*5 + 2].value + "&history=" + $('#family input')[i*5 + 3].value + "&familiernote=" + $('#family input')[i*5 + 4].value;
	}
	var crimedata = "";
	for(let i = 0; i < $("#crime-data tr").length; i++){
		crimedata += "&crimetype=" + $('#crime-data select')[i].value + "&crimename=" + $('#crime-data input')[i*8].value + "&crimedecision=" + $('#crime-data input')[i*8 + 1].value +
		"&daycatch=" + $('#crime-data input')[i*8 + 2].value + "&crimeagency=" + $('#crime-data input')[i*8 + 3].value + "&dayout=" + $('#crime-data input')[i*8 + 4].value + "&placeofjail=" +
		$('#crime-data input')[i*8 + 5].value + "&timeinjail=" + $('#crime-data input')[i*8 + 6].value + "&crimenote=" + $('#crime-data input')[i*8 + 7].value;
	}
	var penaltydata = "";
	for(let i = 0; i < $("#penalty-data tr").length; i++){
		penaltydata += "&penaltyname=" + $('#penalty-data input')[i*5].value + "&penaltydecision=" + $('#penalty-data input')[i*5 + 1].value + "&penaltyagency=" + $('#penalty-data input')[i*5 + 2].value +
		"&penaltytype=" + $('#penalty-data input')[i*5 + 3].value + "&penaltynote=" + $('#penalty-data input')[i*5 + 4].value;
	}
	var suspectdata = "suspectid=" + SuspectId + "&fullname=" + $('#suspect-fullname').val().toUpperCase() + "&dob=" + $('#suspect-dob').val() + "&address=" + $('#suspect-address').val() +
	"&identifier=" + $('#suspect-identifier').val() + "&status=" + status + "&phonenumber=" + $('#suspect-phonenumber').val() + "&fathername=" + FatherName +
	"&mothername=" + MotherName + "&photo=" + SuspectPhoto;
	return suspectdata + crimedata + penaltydata + familydata;
}

function editData(){
	$('#BtnConfig').html("<span class=\"spinner-border spinner-border-sm text-light\"></span> Xác nhận");
	const xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "api-suspects?suspectid=" + SuspectId);
	xhttp.send();
	xhttp.onload = function(){
		if(this.responseText == SuspectId){
			const xhttp_2 = new XMLHttpRequest();
			xhttp_2.open("POST", "api-suspects");
			xhttp_2.setRequestHeader("content-type","application/x-www-form-urlencoded; charset=UTF-8");
			xhttp_2.send(getConfigString());
			xhttp_2.onload = function(){
				if(this.responseText == SuspectId)	{
					showToast(1, 0);$('#SubmitModal').modal('toggle');$('#ProfileModal').modal('toggle');
					$('#BtnConfig').html("<i class=\"material-icons\">send</i> Xác nhận");
				}
				else	 {showToast(1, 1);$('#SubmitModal').modal('toggle');$('#BtnConfig').html("<i class=\"material-icons\">send</i> Xác nhận");}
			}
		}else	{showToast(1, 1);$('#SubmitModal').modal('toggle');$('#BtnConfig').html("<i class=\"material-icons\">send</i> Xác nhận");}
	}
}

function deleteData(id){
	SuspectId = id;
}
//BtnDelete click delete data
$("#BtnDelete").click(function(){
	$("#BtnDelete").html("<span class=\"spinner-border spinner-border-sm text-light\"></span> Xác nhận");
	const xhttp = new XMLHttpRequest();
	xhttp.open("DELETE", "api-suspects?suspectid=" + SuspectId);
	xhttp.send();
	xhttp.onload = function(){
		if(this.responseText == SuspectId){	showToast(0,0);$('#DeleteModal').modal('toggle');}
		else	{showToast(0,1);$('#DeleteModal').modal('toggle');}
		$("#BtnDelete").html("<i class=\"material-icons\">send</i> Xác nhận");
	}
})

function showToast(type, isOK){
	if(type == 0)
		if(isOK == 0){
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-success text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">done</i><h6> Xóa thành công!</h6>";
		}else{
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-danger text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">error_outline</i><h6> Xóa không thành công!</h6>";
		}
	else if(type == 1)
		if(isOK == 0){
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-success text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">done</i><h6> Chỉnh sửa thành công!</h6>";
		}else{
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-danger text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">error_outline</i><h6> Chỉnh sửa không thành công!</h6>";
		}
	else
		if(isOK == 0){
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-success text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">done</i><h6> Thêm mới thành công!</h6>";
		}else{
			document.getElementById("ToastId").firstElementChild.className = "toast-body bg-danger text-white d-flex align-items-center rounded";
			document.getElementById("ToastId").firstElementChild.innerHTML = "<i class=\"material-icons\">error_outline</i><h6> Thêm mới không thành công!</h6>";
		}
	$("#ToastId").toast('show');
}