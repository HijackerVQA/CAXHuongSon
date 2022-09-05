//Adjust height of page //common
var height = document.getElementsByTagName("body")[0].clientHeight - document.getElementsByClassName("header")[0].clientHeight;
if(document.getElementById("main-pane") != undefined)
	document.getElementById("main-pane").style.height = height + "px";
if(document.getElementById("left-pane") != undefined)
	document.getElementById("left-pane").style.height = height + "px";
if(document.getElementById("right-pane") != undefined)
	document.getElementById("right-pane").style.height = height + "px";

window.addEventListener('load', function() {
// Get the forms we want to add validation styles to
var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
var validation = Array.prototype.filter.call(forms, function(form) {
  form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});
}, false);