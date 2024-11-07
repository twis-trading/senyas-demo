var hashpw;
var charset;
var recovery_email;

socket.on('connect', function () {
    console.log("connected to socket-acct-recovery");
});


$('#submit').on('click', function(){

  var length = 6,
        charset = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789",
        hashpw = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        hashpw += charset.charAt(Math.random() * n);
        }
  recovery_email = $('#emailadd').val();
  var username = $('#username').val();

  $('#password').val(hashpw);

  if (recovery_email != "" && username != "") {
    console.log($('#password').val());
    console.log("==================== ===");
    console.log(recovery_email);
    console.log(username);
    var acc = {
         username : username,
         email : recovery_email,
     };

    socket.emit('check_acc', acc);
  }else {
    $("#submit3").trigger("click");
  }

});


socket.on('result_check_acc', function(data){
  console.log(data.length);
  console.log(recovery_email);
  if (data.length > 0) {
    Email.send({
        SecureToken : "a56408fa-0cb1-4bb6-8a00-d02e4ac85835",
        To : recovery_email,
        From : "senyasspprt@gmail.com",
        Subject : "Account Recovery",
        Body : "<p>Your temporary password is</p><br><h1 style='color: green'>"+$('#password').val()+"</h1>"
    });

    swal({
    title: "Please check your email!",
    icon: "success",
    button: 'Ok',
    timer: 1000,
  }).then(function(){
     $("#submit2").trigger("click");
  });
}else {

  swal({
  title: "Username  or email not found!",
  icon: "info",
  button: 'Ok',
  timer: 1000,
  });
}

});
