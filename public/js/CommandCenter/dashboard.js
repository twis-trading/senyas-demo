var mm = [];
var tt = [];
var total_user = 0;
var apk_version;

socket.on('connect', function () {
    console.log("connected to socket-dashboard");
    socket.emit('get_total_user');
    socket.emit('get_latest_version');
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

socket.on('result_latest_version', function(data){
  if (data.length != 0) {
    console.log(data[0].version.slice(0, -4));
    apk_version = data[0].version;
    document.getElementById('apk_version').innerHTML = data[0].version.slice(0, -4);
  }
  else {
    apk_version = "";
  }

});

socket.on('result_total_user', function(data){
  console.log(data);


  for (var i = 0; i < data.length; i++) {
    mm[i] = data[i].barangay;
    tt[i] = data[i].total;
    total_user = total_user + data[i].total;
  }
  total_user = (total_user).toLocaleString('en');
  document.getElementById("total_user").innerHTML  = total_user;

  $(function() {
      "use strict";

      console.log(mm);
      var options = {
              chart: {
  				foreColor: '#e4e6eb',
                  height: 500,
                  type: 'bar',
             toolbar: {
                       show: false
                  }
              },
              plotOptions: {
                  bar: {
              columnWidth: '50%',
                endingShape: 'rounded',
                      dataLabels: {
                          position: 'top', // top, center, bottom
                      },
                  }
              },
              dataLabels: {
                  enabled: true,
                  formatter: function(val) {
                    return parseInt(val);
                  },
                  offsetY: -20,
                  style: {
                      fontSize: '14px',
                      colors: ["#e4e6eb"]
                  }
              },
              stroke: {
                width: 0
                },
              series: [{
                  name: 'App users',
                  data: tt
              }],
              xaxis: {
                  categories: mm,
                  position: 'bottom',
                  labels: {
                      offsetY: 0,
                  },
                  axisBorder: {
                      show: true
                  },
                  axisTicks: {
                      show: true
                  }
              },
                tooltip: {
                      enabled: true,
                      theme: 'dark',
               },
              grid:{
                  show: true,
                  borderColor: 'rgba(255, 255, 255, 0.06)',
              },
              fill: {
                  type: 'gradient',
                  gradient: {
                      shade: 'dark',
                      gradientToColors: [ '#08a50e'],
                      shadeIntensity: 1,
                      type: 'vertical',
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100, 100, 100]
                  },
              },
              colors: ["#cddc35"],
              yaxis: {
                  axisBorder: {
                      show: false
                  },
                  axisTicks: {
                      show: false,
                  },
                  labels: {
                      show: false,
                      formatter: function(val) {
                      return parseInt(val);
                    }
                  }

              },
              title: {
                  text: 'Total App User per Barangay',
                  floating: true,
                  offsetY: 0,
                  align: 'center',
                  style: {
                  fontSize: '15px',
                      color: '#e4e6eb'
                  }
              },
              responsive: [{
                  breakpoint: 480,
                  options: {
                      chart: {
                          height: 310
                      },
                      legend: {
                          position: 'bottom'
                      },
                title: {
                  text: 'Total App User per Barangay',
                  floating: true,
                  offsetY: 0,
                  align: 'center',
                  style: {
                    fontSize: '13px',
                    color: '#e4e6eb'
                  }
                }
                      }
                  }]
          }

          var chart = new ApexCharts(
              document.querySelector("#submitted-application"),
              options
          );
          chart.render();

      });

});

$('#direct-download').on('click', function(){
  if (apk_version != "") {
    var url = '/img/'+apk_version+''
    window.open(url, '_self');
  }
  else {
    swal({
    title: "No apk found!",
    text: "Please upload apk first",
    icon: "info",
    button: false,
    timer: 2000,
    });
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
