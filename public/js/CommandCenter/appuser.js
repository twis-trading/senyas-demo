socket.on('connect', function () {
    console.log("connected to socket-appuser");
    socket.emit('get_pending_request');
});
socket.on('reg_nottif_admin', function(){
    socket.emit('get_pending_request');
});

socket.on('result_pending_request', function(data){
  var dataSet = [];
  console.log(data.length);
  // notif
  if (data.length > 10) {
    document.getElementById('pending_request').innerHTML = "New 10+";
  }else if(data.length === 0) {
    document.getElementById('pending_request').innerHTML = "";
  }else {
    document.getElementById('pending_request').innerHTML = "New " + data.length;
  }
  // table for Verification
  $('#example').DataTable().destroy();

  console.log(data);

  for (var i = 0; i < data.length; i++) {
  dataSet[i] = [''+data[i].id+'',''+data[i].fname+' '+data[i].mname+' '+data[i].lname+'',''+data[i].contact+'',''+data[i].barangay+' '+data[i].municipality+' '+data[i].province+'','<center><button name="activate" id="activate" class="btn btn-info" contact = "'+data[i].contact+'" onClick="activateUser(this)">Activate</button></center>'];
  }

    console.log(dataSet);

    var tables = $('#example').DataTable({
          data: dataSet,
          responsive: true,
          "lengthChange": true,
          "pageLength": 5,
    })

});

socket.on('result_verified_users', function(data){
  var dataSet = [];
  $('#example2').DataTable().destroy();

  for (var i = 0; i < data.length; i++) {
  dataSet[i] = [''+data[i].id+'',''+data[i].fname+' '+data[i].mname+' '+data[i].lname+'',''+data[i].contact+'',''+data[i].barangay+' '+data[i].municipality+' '+data[i].province+'','<center><button name="deactivate" id="deactivate" class="btn btn-success" contact = "'+data[i].contact+'" onClick="deactivateUser(this)">Deactivate</button>&nbsp&nbsp<button name="deleteuser" id="deleteuser" class="btn btn-danger" contact = "'+data[i].contact+'" onClick="deleteUser(this)">Delete</button></center>'];
  }

  var tables = $('#example2').DataTable({
        data: dataSet,
        responsive: true,
        "lengthChange": true,
        "pageLength": 10,
        dom: 'Bfrtip',
        buttons: [
          {
             extend:'copy',
             exportOptions: {
                       columns: [0,1,2,3]
                   }
                 },
          {
           extend:'print',
           exportOptions: {
                     columns: [0,1,2,3]
                 }
               },
          {
            extend:'pdf',
            exportOptions: {
                      columns: [0,1,2,3]
                  }
          },
          {
            extend:'excel',
            exportOptions: {
                      columns: [0,1,2,3]
                  }
          },
          {
            extend:'csv',
            exportOptions: {
                      columns: [0,1,2,3]
                  }
          },
          {
            extend:'colvis',
          }
        ]

  })

});

function activateUser(data){
  var mobile_number = $(data).attr('contact');
  socket.emit('admin_send_confirm', mobile_number);
}

function deactivateUser(data){
  var mobile_number = $(data).attr('contact');
  socket.emit('admin_deactivate_user', mobile_number);
}

function deleteUser(data){
  var mobile_number = $(data).attr('contact');
  socket.emit('admin_delete_user', mobile_number);
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
