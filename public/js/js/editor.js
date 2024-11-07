function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});

//Modal new sy
var modal = document.getElementById("myModal");
var btn = document.getElementById("btnmodal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "block";
  }
}
// /modal new sy

$(document).ready(function(){
  var range = new Date().getFullYear() + ':'+ (new Date().getFullYear() + 5);
    $("#startyear").datepicker({
      changeMonth: false,
      changeYear: true,
      showButtonPanel: true,
      yearRange: range,
      dateFormat: 'yy',
      viewSelect: 'decade',
      onClose: function(dateText, inst) {
        var startyear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker('setDate', new Date(startyear, 0, 1));
        $("#startyear").val(startyear);
    }});

    $("#endyear").datepicker({
      changeMonth: false,
      changeYear: true,
      showButtonPanel: true,
      yearRange: range,
      dateFormat: 'yy',
      viewSelect: 'decade',
      onClose: function(dateText, inst) {
        var endyear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker('setDate', new Date(startyear, 0, 1));
        $("#endyear").val(endyear);
    }});
});

//Confirmation
$(document).ready(function(){
    $('#setcurrent').click(function(){
      if($("#startyear").val()!="" && $("#endyear").val()!="")
      {
        var r = confirm("Set as Current School Year?");
        if (r == true) {
          alert("OK");
        } else {
          alert("Cancelled");;
        }
      }
    });
});
// /Confirmation
