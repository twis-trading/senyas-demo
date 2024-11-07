socket.on('connect', function () {
    console.log("connected to socket-home");
    socket.emit('get_pending_request');
});
socket.on('reg_nottif_admin', function(){
    socket.emit('get_pending_request');
});

socket.on('result_pending_request', function(data){
  console.log(data.length);
  // notif
  if (data.length > 10) {
    document.getElementById('pending_request').innerHTML = "New 10+";
  }else if(data.length === 0) {
    document.getElementById('pending_request').innerHTML = "";
  }else {
    document.getElementById('pending_request').innerHTML = "New " + data.length;
  }
});


$('#confirm').keyup(function(){
          var pass1 = document.forms["cp"]["New_Password"].value;
          var pass2 = document.forms["cp"]["Confirm_Pass"].value;
          console.log(pass1);
          console.log(pass2);
          if(pass2 != ""){
            if(pass2 != pass1){
            $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
            $("#savebtn").removeAttr('disabled');
            $("#savebtn").attr('disabled', true);
          }
          else{
            $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
            $("#savebtn").removeAttr('disabled');
          }
        }
        else {
          $('#error_pass').html("");
        }
});
$('#newpass').keyup(function(){
                var pass1 = document.forms["cp"]["New_Password"].value;
                var pass2 = document.forms["cp"]["Confirm_Pass"].value;
                 console.log(pass1);
                 console.log(pass2);
                if(pass1 != "" && pass2 != ""){
                  if(pass1 != pass2){
                    $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
                    $("#savebtn").removeAttr('disabled');
                    $("#savebtn").attr('disabled', true);
                  }
                  else{
                    $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
                    $("#savebtn").removeAttr('disabled');
                  }
                }
                else {
                  $('#error_pass').html("");
                  document.forms["cp"]["Confirm_Pass"].value = "";
                }
});
