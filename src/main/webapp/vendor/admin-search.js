window.onload = function(){
	$('.navbar-nav')[0].innerHTML += "<li class=\"nav-item\"><a id=\"GetTestPass\" class=\"nav-link text-white border-top\" onclick=\"showTestPass()\"><i class=\"material-icons\">&#xe8fd;</i> LẤY PASS TK TEST</a></li>";
}
function showTestPass(){
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "api-gettestpass");
	xhttp.send();
	xhttp.onload = function() {
		alert("Mật khẩu tk 'test' là: " + this.responseText);
	}
}
function requestGETAJAX(url, cFunction) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {cFunction(this);}
	xhttp.open("GET", url);
	xhttp.send();
}
function showAddress(xhttp) {
	let lists = JSON.parse(xhttp.responseText);
	for(let address of lists)		document.getElementById("addresslist").appendChild(new option(address));
}
function option(addressname){
	let opt = document.createElement("option");
	opt.text = addressname;
	opt.value = addressname;
	return opt;
}
// Get address data to select
requestGETAJAX("api-addresslist", showAddress);
	// Select 2
	$('#addresslist').select2({
		placeholder: "Chọn địa chỉ",
		width: '100%'
	});
	// Datepicker
	$('#dob').datepicker({
		format: 'dd/mm/yyyy'
	});
	$('#fromdate').datepicker({
		format: 'dd/mm/yyyy'
	});
	$('#todate').datepicker({
		format: 'dd/mm/yyyy'
	});
document.getElementById('search').className += " active";
$("#crimeinfocheck").change( function(){
    if (this.checked)
    	$('#crimeinfo').attr('disabled',false);
    else{
    	$('#crimeinfo').attr('disabled',true);
    	$('#crimeinfo').val("");
    	if($('#penaltyinfocheck').prop('checked') == false){
    		alert("Ít nhất tích vào 1 lựa chọn tra cứu PPHS hoặc VPPL khác!!");
    		$("#crimeinfocheck").prop('checked',true);
    		$('#crimeinfo').attr('disabled',false);
    	}
    }
});
$("#penaltyinfocheck").change( function(){
    if (this.checked)
    	$('#penaltyinfo').attr('disabled',false);
    else{
    	$('#penaltyinfo').attr('disabled',true);
    	$('#penaltyinfo').val("");
    	if($('#crimeinfocheck').prop('checked') == false){
    		alert("Ít nhất tích vào 1 lựa chọn tra cứu PPHS hoặc VPPL khác!");
    		$("#penaltyinfocheck").prop('checked',true);
    		$('#penaltyinfo').attr('disabled',false);
    	}
    }
});
document.getElementById('row1').style.display="none";
document.getElementById('row2').style.display="none";
document.getElementById('row3').style.display="none";
document.getElementById('row4').style.display="none";
function showOrHide(){
	if(document.getElementById('row1').style.display == "none"){
		document.getElementById('row1').style.display = "flex";
		document.getElementById('row2').style.display = "flex";
		document.getElementById('btnadvance').innerText = "Thu gọn";
		document.getElementById('row3').style.display = "flex";
		document.getElementById('row4').style.display = "flex";
		document.getElementById('dobfield').style.display = "none";
		document.getElementById('fullnamefield').className = "form-group col-xl-6";
		document.getElementById('addresslistfield').className = "form-group col-xl-6";
		$('#btnsearch').attr('onclick','requestsuspect(1)');
		document.getElementById('dob').value = "";
	}else{
		document.getElementById('row1').style.display = "none";
		document.getElementById('row2').style.display = "none";
		document.getElementById('row3').style.display = "none";
		document.getElementById('row4').style.display = "none";
		document.getElementById('dobfield').style.display = "block";
		document.getElementById('fullnamefield').className = "form-group col-xl-4";
		document.getElementById('addresslistfield').className = "form-group col-xl-4";
		document.getElementById('btnadvance').innerText = "...Tìm kiếm nâng cao";
		for(let i = 2; i < $('input').length; i++)
			$('input')[i].value="";
		$('#btnsearch').attr('onclick','requestsuspect(0)');
	}
}
var form = document.getElementById("crimeform");
function requestsuspect(t){
	document.getElementById('btnsearch').innerHTML = "<div class=\"spinner-border spinner-border-sm text-light\"></div> Tìm kiếm";
	$('#sequence').text("");
	document.getElementsByClassName("card-columns")[0].innerHTML = "";
	const xhttp = new XMLHttpRequest();
	var adquery = "";
	$('#addresslistfield :selected').each(function(i, sel){
	    adquery += "&addresslist=" + $(sel).val();
	});
	xhttp.open("GET", "api-suspects?fullname=" + $('#fullname').val().toUpperCase() + "&dob=" + $('#dob').val() + "&fromdate=" + $('#fromdate').val() +
			"&todate=" + $('#todate').val() + "&crimeinfo=" + $('#crimeinfo').val() + "&penaltyinfo=" + $('#penaltyinfo').val() + "&fathername=" + $('#fathername').val() + 
			"&mothername=" + $('#mothername').val() + "&crimecheck=" + $('#crimeinfocheck').prop('checked') + "&penaltycheck=" + $('#penaltycheck').prop('checked') + 
			"&searchtype=" + t + adquery);
	xhttp.send();
	xhttp.onload = function() {
		let suspects = JSON.parse(this.responseText);
		$('#sequence').text("Có " + suspects.length + " kết quả được tìm thấy!");
		for(suspect of suspects)	addSuspect(suspect);
		document.getElementById('btnsearch').innerHTML = "<i class=\"material-icons\">search</i> Tìm kiếm";
	};
}
function requestdata(btn){
	document.getElementsByClassName("modal-content")[0].innerHTML = "<div id=\"loader\"><div class=\"dot dot1\"></div><div class=\"dot dot2\">" +
			"</div><div class=\"dot dot3\"></div></div>" + document.getElementsByClassName("modal-content")[0].innerHTML;
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "api-exportsuspectdata?suspectid=" + btn.id + "");
	xhttp.send();
	xhttp.onload = function() {
		let suspect = JSON.parse(this.responseText);
		if(suspect.status == 0)	document.getElementById("suspect-status").innerHTML = "<span class=\"badge badge-danger\">Đã chết</span>";
		else if(suspect.status == 1)	document.getElementById("suspect-status").innerHTML = "<span class=\"badge badge-success\">Còn sống</span>";
		else document.getElementById("suspect-status").innerHTML = "<span class=\"badge badge-warning\">Đã chuyển khẩu đi</span>";
		$('#suspect-photo').attr('src',suspect.photo);
		$('#suspect-fullname').text(suspect.fullname);
		$('#suspect-dob').text(suspect.dob);
		$('#suspect-address').text(suspect.address);
		$('#suspect-identifier').text(suspect.identifier);
		$('#suspect-phonenumber').text(suspect.phonenumber);
		document.getElementById('crime-data').innerHTML = "";
		document.getElementById('penalty-data').innerHTML = "";
		document.getElementById('family').innerHTML = "";
		var i = 1;
		for(let crime of suspect.crimes){
			document.getElementById('crime-data').innerHTML += "<tr><td>" + i + "</td><td>" + crime.crimetype + "</td><td>" + crime.crimename + 
				"</td><td>" + crime.decision + "</td><td>" + crime.daycatch + "</td><td>" + crime.agency + "</td><td>" + crime.dayout + 
				"</td><td>" + crime.placeofjail + "</td><td>" + crime.timeinjail + "</td><td>" + crime.note + "</td></tr>";
			i++;
		}i = 1;
		for(let penalty of suspect.penalties){
			document.getElementById('penalty-data').innerHTML += "<tr><td>" + i + "</td><td>" + penalty.penaltyname + "</td><td>" + penalty.decision +
				"</td><td>" + penalty.agency + "</td><td>" + penalty.penaltytype + "</td><td>" + penalty.note + "</td></tr>";
			i++;
		}i = 1;
		for(let familier of suspect.family){
			document.getElementById('family').innerHTML += "<tr><td>" + i + "</td><td>" + familier.relationship + "</td><td>" + familier.fullname +
				"</td><td>" + familier.dob + "</td><td>" + familier.address + "</td><td>" + familier.history + "</td><td>" + familier.note + "</td></tr>";
			i++;
		}
		$('#loader').fadeOut();
	}
}
function addSuspect(suspect){
	var card = document.createElement('div');
	card.className = "profile card rounded-lg";
	//Add image
	var img = document.createElement('img');
	img.className = "profile-pic card-img-overlay p-1";
	img.src = suspect.photo;
	card.appendChild(img);
	
	//Add card body
	var card_body = document.createElement('div');
	card_body.className = "card-body p-1";
	card_body.innerHTML = "<p class=\"m-0\"><span class=\"text-primary\">Họ tên : </span><b>" + suspect.fullname + "</b></p>" +
	"<p class=\"m-0\"><span class=\"text-primary\">Ngày sinh : </span><b>" + suspect.dob + "</b></p>" +
	"<p class=\"m-0\"><span class=\"text-primary\">Địa chỉ : </span><b>" + suspect.address + "</b></p>" +
	"<p class=\"m-0\"><span class=\"text-primary\">Họ tên bố : </span><b>" + suspect.fathername + "</b></p>" +
	"<p class=\"m-0\"><span class=\"text-primary\">Họ tên mẹ : </span><b>" + suspect.mothername + "</b></p>";
	
	//Add status 0:Đã chết 2:Đã chuyển khẩu đi 1:Còn sống
	if(suspect.status == 0){
		card_body.innerHTML += "<p class=\"m-0\"><span class=\"text-primary\">Tình trạng: </span><span class=\"badge badge-danger\">Đã chết</span></p>";
	}else if(suspect.status == 1){
		card_body.innerHTML += "<p class=\"m-0\"><span class=\"text-primary\">Tình trạng: </span><span class=\"badge badge-success\">Còn sống</span></p>";
	}else{
		card_body.innerHTML += "<p class=\"m-0\"><span class=\"text-primary\">Tình trạng: </span><span class=\"badge badge-warning\">Đã chuyển khẩu đi</span></p>";
	}
	card.appendChild(card_body);
	card.innerHTML += "<button id=\"" + suspect.id + "\" class=\"d-flex stretched-link form-control align-items-center justify-content-center\" data-toggle=\"modal\"" +
		" data-target=\"#ProfileModal\" onclick=\"requestdata(this)\"><i class=\"material-icons\">&#xe417;</i><b>Xem thông tin</b></button>";
	document.getElementsByClassName("card-columns")[0].appendChild(card);
}
//After 10 mins refresh
setTimeout(function(){
	var a = document.createElement("a");
	a.href = "/search";
	a.click();
},601000);