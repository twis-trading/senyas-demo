socket.on('connect', function () {
    $('input[type="file"]').ezdz();
    console.log("connected to socket-update-apk");
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


$('#submit6').on('click', function(){
  var x = document.getElementById("file").value;
  var filename = x.split(/(\\|\/)/g).pop();
  console.log('filename: ',filename);


  if (filename === "") {
    swal({
    title: "Please select apk!",
    icon: "info",
    button: "Ok",
    timer: 2000,
    });
  }else{
    console.log("updated");
    socket.emit('update_apk', filename);
  }
});

function uploadedapk(data){
  swal({
  title: data,
  icon: "success",
  button: 'Ok',
  timer: 2000,
  });

  $('#ezdz-div').html("");
  var htmls = '<div class="col-lg-12" style="height: 63vh">' +
                '<input type="file" id = "file"  name = "file">'+
                '<iframe style="display: none;" name = "iframe"></iframe>'+
              '</div>';
  $('#ezdz-div').append(htmls);
  $('input[type="file"]').ezdz();

}

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
