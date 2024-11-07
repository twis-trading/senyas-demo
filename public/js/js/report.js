function display_modal(data){
  console.log("dsasdas");
  console.log(data);

  socket.emit('report_info', data);
}

socket.on('connect', function () {
  socket.emit('reports');
});

socket.on('report_result', function(data){
  console.log(data);
  console.log("report_result");

  $('#dataTables-example').DataTable().destroy();
  var dataSet = [];

  for (var i = 0; i < data.length; i++) {
  dataSet[i] = [''+data[i].imei+'',''+data[i].fname+' '+data[i].mname+' '+data[i].lname+'',''+data[i].alert+'',''+data[i].starttime+'',''+data[i].endtime+'',''+data[i].barangay+' '+data[i].municipality+' '+data[i].province+'','<button class="btn btn-info" value="'+data[i].imei+'" type="submit" id="moredetails">More Details</button>'];
  }

  console.log(dataSet);

  $('#dataTables-example').DataTable({
        data: dataSet,
        responsive: true,
        lengthChange: false,
        dom: 'Bfrtip',
        buttons: [{
           extend:'print',
           exportOptions: {
                     columns: [1,2,3,4,5]
                 }
               },
          {
            extend:'pdf',
            exportOptions: {
                      columns: [1,2,3,4,5]
                  }
          },
          {
            extend:'excel',
            exportOptions: {
                      columns: [1,2,3,4,5]
                  }
          },
          {
            extend:'csv',
            exportOptions: {
                      columns: [1,2,3,4,5]
                  }
          }

        ]
  });

  $('.tblreports tbody tr').on('click','#moredetails', function(){
            var txtimei
            var txttime
            var appuser
            // event.preventDefault();
                txtimei = $(this).closest('tr').find('td:eq(0)').text();
                txttime = $(this).closest('tr').find('td:eq(3)').text();
                appuser = $(this).closest('tr').find('td:eq(1)').text();

                // console.log(txtimgpath);
                display_modal({imei:txtimei, time:txttime, apkuser:appuser});
          });

});


socket.on('retrieve_info', function(data, responder) {

  console.log(responder.length);
  console.log(data);
  console.log(responder);
  var modalImg = document.getElementById("imgpath");
  if(data.imgpath !== null){
  modalImg.src =data.imgpath;
  modalImg.style.display='block';
  }
  else{
  // modalImg.src ="#";
  // // modalImg.style.display='none';
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

   // document.getElementById('mt').textContent = "I-ALERT";
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

  // $('#alertModal').modal('show');
   $('#editOrder').modal('show');
});

function displayModal(data, responder) {

   var modalImg = document.getElementById("imgpath");
   modalImg.src = data.imgpath;
     console.log("SMSMSMSMSMMSMSMS");
     console.log(data.imei);
    document.getElementById('mt').textContent = "MASH";
   document.getElementById('mc').textContent = data.imgpath;
    $('#alertModal').modal('show');
}
