var rMarker = [];
var map;
var initLoc;
var marker;
var markers = [];


socket.on('connect', function () {
    console.log("connected to socket-map");
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

function initMap() {
  var initLoc = {lat: 14.1860247, lng: 121.1187644};
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: initLoc,
        labels: true,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ee8839'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#8696b6'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#ffa128'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#04112c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
    });
    this.marker = new google.maps.Marker({
        map: this.map
    });
    // marker.addListener('click', function() {
    //     displayModal(marker.id);
    // });

    google.maps.event.addListener(this.map, 'zoom_changed', function() {
        zoomLevel = map.getZoom();
    console.log(zoomLevel);
    if (zoomLevel == 15) {
      console.log("eut");
    }
    });
}


$('#alert_type').change(function(){
  var alert_type = document.getElementById("alert_type").value;
  console.log(alert_type);
  if(alert_type=="POLICE"){
    document.getElementById("incident").disabled = false;
  }
  else{
    document.getElementById("incident").disabled = true;
    document.getElementById("incident").value = "";
  }
});

function onMapLoad(){
  var alert_type = document.getElementById("alert_type").value;
  var incident = document.getElementById("incident").value;
  var month = document.getElementById("alert_month").value;
  var year = document.getElementById("alert_year").value;

  var data = {
      alert_type : alert_type,
      incident : incident,
      month : month,
      year : year
  };
  var data2 = {
      alert_type : alert_type,
      month : month,
      year : year
  };
  if(alert_type=="POLICE" && incident!=""){
    socket.emit('load_markers', data);
  }
  else if (alert_type=="IMAGE" || alert_type=="FIRE" || alert_type=="MEDICAL" ||  alert_type=="RESCUE"||  alert_type=="HIGHRISK") {
    socket.emit('load_markers', data2);
  }
  else{

  }
}

socket.on('display_markers', function(data){
  console.log(data);
  if (data != 0) {
var contentString;
var infowindow;
  for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
                markers.splice(i, 1);
                break;
        }
initLoc = {lat: 14.1860247, lng: 121.1187644};
this.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: initLoc,
    // mapTypeId: 'hybrid',
    labels: true,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
});
console.log(data.lat);
if(data[0].alert_type==="IMAGE"){
  for(var i = 0; i <= data.length -1; i ++){

     contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div id="img">'+
                '<img src="'+data[i].imgpath+'" alt="no image" style="width:200px; height:250px;">'+
                '</div>'+
                '</div>';
    infowindow = new google.maps.InfoWindow({
    content: contentString
   });

    var mLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
    var marker =  new google.maps.Marker({
        position: mLatLng,
        map: this.map,
        id: data[i].imei
        // animation : google.maps.Animation.DROP
    });
    infowindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        contentString = '<div id="content">'+
                   '<div id="siteNotice">'+
                   '</div id="img">'+
                   '<img src="'+data[i].imgpath+'" alt="no image" style="width:200px; height:250px;">'+
                   '</div>'+
                   '</div>';
       infowindow = new google.maps.InfoWindow({
       content: contentString
      });
        infowindow.open(map, marker);
      }
    })(marker, i));

     markers.push(marker);
  }
     // ===========================
}
else{
  for(var i = 0; i <= data.length -1; i ++){
    contentString = '<div style="color:red;>'+
               '<p style="color:red;>'+data[i].time+'</p>'+
               '</div>';
    infowindow = new google.maps.InfoWindow({
    content: contentString
   });

    var mLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
    var marker =  new google.maps.Marker({
        position: mLatLng,
        map: this.map,
        id: data[i].imei
        // animation : google.maps.Animation.DROP
    });
    infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i){
      return function(){
        contentString = '<div style="color:red;>'+
                   '<p style="color:red;>'+data[i].time+'</p>'+
                   '</div>';
       infowindow = new google.maps.InfoWindow({
       content: contentString
      });
        infowindow.open(map, marker);
      }
    })(marker, i));
     markers.push(marker);
  }
}

google.maps.event.addListener(this.map, 'zoom_changed', function() {
      zoomLevel = map.getZoom();
      console.log(zoomLevel);
      if (zoomLevel == 15) {
        console.log("eut");
      }
    });
  document.getElementById("total").value= data.length;
    }
    else{
      markers = [];
      initMap();
      document.getElementById("total").value= data.length;
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
