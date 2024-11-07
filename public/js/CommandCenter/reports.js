socket.on('connect', function () {
    console.log("connected to socket-reports");
    socket.emit('get_pending_request');
    socket.emit('reports');
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


socket.on('report_result', function(data){
  console.log(data);
  console.log("report_result");
  $('#example').DataTable().destroy();
  var dataSet = [];

  for (var i = 0; i < data.length; i++) {
  dataSet[i] = [''+data[i].imei+'',''+data[i].fname+' '+data[i].mname+' '+data[i].lname+'',''+data[i].alert+'',''+data[i].lat+' '+data[i].lng+'',''+data[i].starttime+'',''+data[i].endtime+'',''+data[i].barangay+' '+data[i].municipality+' '+data[i].province+'','<center><button class="btn btn-info" dataimei="'+data[i].imei+'" dataappuser="'+data[i].fname+' '+data[i].mname+' '+data[i].lname+'" datatime="'+data[i].starttime+'" type="submit" id="moredetails" onClick="moreDetails(this)">More Details</button></center>'];
  }
  console.log(dataSet);
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
                       columns: [0,1,2,3,4,5,6]
                   }
                 },
          {
           extend:'print',
           exportOptions: {
                     columns: [0,1,2,3,4,5,6]
                 }
               },
          {
            extend:'pdf',
            exportOptions: {
                      columns: [0,1,2,3,4,5,6]
                  }
          },
          {
            extend:'excel',
            exportOptions: {
                      columns: [0,1,2,3,4,5,6]
                  }
          },
          {
            extend:'csv',
            exportOptions: {
                      columns: [0,1,2,3,4,5,6]
                  }
          },
          {
            extend:'colvis',
          }
        ]

  });
});

function moreDetails(data){

                var txtimei = $(data).attr('dataimei');
                var txttime = $(data).attr('datatime');
                var apkuser =  $(data).attr('dataappuser');

                var details = ({imei:txtimei, time:txttime, apkuser:apkuser});
                console.log("data");
                console.log(data);
                socket.emit('report_info', details);
}

socket.on('retrieve_info', function(data, responder) {

  console.log("responder.length: ",responder.length);
  console.log("data retrieve_info: ",data);
  console.log("responder: ",responder);
  var modalImg = document.getElementById("imgpath");
  if(data.imgpath !== null){
  modalImg.src =data.imgpath;
  modalImg.style.display='block';
  }
  else{

  modalImg.src ='/img/image_not_available.png';
  modalImg.style.display='block';
  }
  var incident_div = document.getElementById("incident_div");
  if(data.alert_type !== "POLICE"){
  incident_div.style.display='none';
  }
  else{
   incident_div.style.display='block';
   document.getElementById('incident').textContent = data.incident;
  }

   document.getElementById('apk_user').textContent = data.apk_user;
   document.getElementById('alert_type').textContent = data.alert_type;
   document.getElementById('user').textContent = data.user;
   document.getElementById('patient').textContent = data.patient;
   document.getElementById('patient-status').textContent = data.pstatus;
   document.getElementById('hospital').textContent = data.hospital;
   document.getElementById('remarks').textContent = data.remarks;
   var p;
   document.getElementById("IDOL").innerHTML = "";
   for(var i = 0; i <= responder.length -1; i ++){

     p = document.createElement('p');
     p.setAttribute('id', 'content');
     p.textContent  = responder[i].barangay;
      document.getElementById("IDOL").appendChild(p);
   }

   $('#largesizemodal').modal('show');
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
