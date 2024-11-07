socket.on('connect', function () {
  console.log("connected to socket-logs");
  socket.emit('get_pending_request');
  socket.emit('get_activity_logs');
  socket.emit('get_accounts');
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

socket.on('result_activity_logs', function(data){
  $('#example').DataTable().destroy();
  var dataSet = [];
  console.log(data);
  for (var i = 0; i < data.length; i++) {
  dataSet[i] = [''+data[i].user_name+'',''+data[i].department+'',''+data[i].log_in+'',''+data[i].log_out+''];
  }

  var tables = $('#example').DataTable({
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

  });

});
socket.on('change_status_logs', function(data){

var dept_div = document.getElementById('dept_div');
var brgy_div = document.getElementById('brgy_div');

dept_div.innerHTML = "";
brgy_div.innerHTML = "";

var ul_dept = document.createElement('ul');
ul_dept.setAttribute('class', 'list-group');
ul_dept.setAttribute('id', 'ul_dept');

var ul_dept2 = document.createElement('ul');
ul_dept2.setAttribute('class', 'list-group');
ul_dept2.setAttribute('id', 'ul_dept2');

dept_div.appendChild(ul_dept);
dept_div.appendChild(ul_dept2);

var ul_brgy = document.createElement('ul');
ul_brgy.setAttribute('class', 'list-group');
ul_brgy.setAttribute('id', 'ul_brgy');

var ul_brgy2 = document.createElement('ul');
ul_brgy2.setAttribute('class', 'list-group');
ul_brgy2.setAttribute('id', 'ul_brgy2');

brgy_div.appendChild(ul_brgy);
brgy_div.appendChild(ul_brgy2);

for (var i = 0; i < data.length; i++) {
  var ul_dept_on = document.getElementById('ul_dept');
  var ul_deptd_off = document.getElementById('ul_dept2');
  var ul_brgy_on = document.getElementById('ul_brgy');
  var ul_brgy_off = document.getElementById('ul_brgy2');

  switch (data[i].user_tag) {
    case 0:
      if(data[i].log_status == "online" && data[i].user_type != 1){

        var li = document.createElement('li');
        var ii = document.createElement('i');
        li.setAttribute('class', 'list-group-item');
        ii.setAttribute('id', data[i].username);
        ii.setAttribute('class', 'fa fa-user fa-2x');
        ii.setAttribute('style','color:green');
        ii.innerHTML = ' &nbsp; &nbsp';
        var label = document.createElement('label');
        label.setAttribute('style','font-size:12pt');
        label.setAttribute('style','margin-bottom:0px');
        label.textContent = data[i].username;

        ul_dept_on.appendChild(li);
        li.appendChild(ii);
        li.appendChild(label);
      }
      else if(data[i].log_status == "offline" && data[i].user_type != 1){

        var li = document.createElement('li');
        var ii = document.createElement('i');
        li.setAttribute('class', 'list-group-item');
        ii.setAttribute('id', data[i].username);
        ii.setAttribute('class', 'fa fa-user fa-2x');
        ii.setAttribute('style','color:red');
        ii.innerHTML = ' &nbsp; &nbsp';
        var label = document.createElement('label');
        label.setAttribute('style','font-size:12pt');
        label.setAttribute('style','margin-bottom:0px');
        label.textContent = data[i].username;

        ul_deptd_off.appendChild(li);
        li.appendChild(ii);
        li.appendChild(label);

      }
      else{

      }
    break;
    case 1:
      if(data[i].log_status == "online"){

        var li = document.createElement('li');
        var ii = document.createElement('i');
        li.setAttribute('class', 'list-group-item');
        ii.setAttribute('id', data[i].username);
        ii.setAttribute('class', 'fa fa-user fa-2x');
        ii.setAttribute('style','color:green');
        ii.innerHTML = ' &nbsp; &nbsp';
        var label = document.createElement('label');
        label.setAttribute('style','font-size:12pt');
        label.setAttribute('style','margin-bottom:0px');
        label.textContent = data[i].username;

        ul_brgy_on.appendChild(li);
        li.appendChild(ii);
        li.appendChild(label);
      }
      else if(data[i].log_status == "offline"){

        var li = document.createElement('li');
        var ii = document.createElement('i');
        li.setAttribute('class', 'list-group-item');
        ii.setAttribute('id', data[i].username);
        ii.setAttribute('class', 'fa fa-user fa-2x');
        ii.setAttribute('style','color:red');
        ii.innerHTML = ' &nbsp; &nbsp';
        var label = document.createElement('label');
        label.setAttribute('style','font-size:12pt');
        label.setAttribute('style','margin-bottom:0px');
        label.textContent = data[i].username;

        ul_brgy_off.appendChild(li);
        li.appendChild(ii);
        li.appendChild(label);

    }
    else{

    }
      break;

    default:

  }
}
});


socket.on('result_accounts', function(data){
console.log(data);
console.log(data.length);
$('#example2').DataTable().destroy();
var dataSet = [];

if (data.length > 0) {
for (var i = 0; i < data.length; i++) {
  dataSet[i] = [data[i].id, data[i].username, data[i].position, '<center><button class="btn btn-info" dataid = "'+data[i].id+'" onClick = "activateAccount(this)">Accept</button> <button class="btn btn-danger" dataid = "'+data[i].id+'" onClick = "deleteAccount(this)">Delete</button></center>']
}
}
var tables = $('#example2').DataTable({
      data: dataSet,
      responsive: true,
      "lengthChange": true,
      "pageLength": 10,
      });
});

function activateAccount(data){
console.log("activate");
var userid = $(data).attr('dataid');
console.log(userid);
socket.emit('activate_account', userid);
}

function deleteAccount(data){
console.log("delete");
var userid = $(data).attr('dataid');
console.log(userid);
socket.emit('delete_account', userid);
}

socket.on('activated_user', function(){
socket.emit('get_accounts');
});

socket.on('deleted_user', function(){
socket.emit('get_accounts');
});

// --======= change pass
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
