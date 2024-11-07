/**
 * Created by Adsoph on 7/8/2017.
 */

var map;
var initLoc;
var marker;
var rMarker = [];

//initialize map
/*function initMap() {
    var initLoc = {lat: 14.1390, lng: 122.7633};
    this.map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: 'hybrid',
        labels: true
    });

}*/
function initMap() {
    var initLoc = {lat: 14.1860247, lng: 121.1187644};
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: initLoc,
        // mapTypeId: 'hybrid',
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

}


function updateMarker(data){
    //this.map.setCenter({lat:this.lat, lng:this.long, alt:0});
    //console.log("lat: " + data.lat + " lng: " + data.lng);
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);
    this.marker.setPosition(mLatLng);
    //transition([data.lat, data.lng]);
    //.animateTo(mLatLng, {easing: 'linear', duration: 1000});
    //marker.metadata = {id: data.imei};
    /*marker.addListener('click', function() {
        alert(marker.id);
    });*/
}

function updateResponderMarker(data){
    //this.map.setCenter({lat:this.lat, lng:this.long, alt:0});
    var rMrk;
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);
    if (rMarker.length!==0){
        //console.log("lat: " + data.lat + " lng: " + data.lng);
        for (var i=0; i <= rMarker.length-1;i++){
            if (data.id === rMarker[i].id){
                rMrk = rMarker[i];
                break;
            }
        }
        rMrk.setPosition(mLatLng);
    }else{
        rMrk = new google.maps.Marker({
            position : mLatLng,
            map  : map,
            icon : getRMarkADSOPHon(data.type,'online'),
            id   : data.id
        });
        rMarker.push(rMrk);
    }
}

socket.on('connect', function () {
    //Join room
    console.log(formatDate(new Date()));
    console.log('track');
    socket.emit('track_this', imei);
    socket.emit('track_alert', imei, dept, formatDate(new Date()));

});


socket.on('init_track', function (data) {
    marker.id = imei;
    var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div id="img">'+
                '<img src="'+data.imgpath+'" alt="Smiley face" height="500" width="500">'
                '</div>'+
                '</div>';
    var infowindow = new google.maps.InfoWindow({
    content: contentString
   });
    marker.addListener('click', function() {
         infowindow.open(map, marker);
       });
    marker.setIcon(getMarkADSOPHon(data.alert_type));
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);
    map.setCenter(mLatLng);
    map.setZoom(15);
    updateMarker(data);
});


socket.on('init_resp', function (data) {
    var isMarkerExist;
    for (var i=0; i<=data.length-1;i++){
        isMarkerExist = false;
        var mLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
        for (var mrk in rMarker){
            if (data[i].id === mrk.id){
                isMarkerExist = true;
                break;
            }
        }
        if (!isMarkerExist){
            var newRMrk = new google.maps.Marker({
                position : mLatLng,
                map  : map,
                icon : getRMarkADSOPHon(data[i].type,'online'),
                id   : data[i].id
            });

            rMarker.push(newRMrk);
        }
    }
});
//socket.emit('count');

function end() {

    socket.emit('end_alert', {imei:imei, date:formatDate(new Date())});
    close();
}


function send(){
    var checkboxes = document.getElementsByName("ac[]");
    var arr = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            arr.push(checkboxes[i].value);
            //socket.emit('send_alert_ac', {imei : '{{$imei}}', name : arr[i]});
        }
    }
    var result = socket.emit('send_alert_ac', {imei : imei, name : arr[0]});
    if (arr.length !== 0){
        // displayModal('Alert has been sent');
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: 'Alert has been sent',
            icon: 'info',
            showConfirmButton: true
            });
    }else{
        // displayModal('No alert center selected!');
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: 'No alert center selected!',
            icon: 'info',
            showConfirmButton: true
            });
    }
}

socket.on('already_sent', function (data) {
    // displayModal("Alert is already sent to " + data.name.toUpperCase());
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    Swal.fire({
        title: "Alert is already sent to " + data.name.toUpperCase(),
        icon: 'info',
        showConfirmButton: true
        });
});

socket.on('callback', function (data) {
    displayModal(data);
});

socket.on('RESP_ALERT', function (data) {
    var isMarkerExist = false;
    for (var i=0;i<=rMarker.length-1;i++){
        if (data.id === rMarker[i].id){
            isMarkerExist = true;
            break;
        }
    }
    if (!isMarkerExist){
        var newRMrk = new google.maps.Marker({
            map : map,
            icon : getRMarkADSOPHon(data.type,'online'),
            id  : data.id
        });
        rMarker.push(newRMrk);
    }

    // displayModal("Responder accepted the Alert");
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    Swal.fire({
        title: "Responder accepted the Alert",
        icon: 'info',
        showConfirmButton: true
        });

    change_status({name: data.id, status: data.status});
    //dischange_status(data)
});
socket.on('dept_close_tab', function(data){
  if(appuser === data){
      close();
  }
  else{

  }
});

socket.on('location_update',function(data){
    updateMarker(data);
});
socket.on('RESP_UPDATE',function(data){
    updateResponderMarker(data);
});

socket.on('track_message', function (data) {
    displayModal(data.message);
});

socket.on('incident_status', function (data) {
    var res = document.getElementById(data.imei);
    if (res !== null){
        var name = res.textContent.split(" ");
        // displayModal("Barangay confirm the alert for " + name[1] + " " + name[2]);
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Barangay confirm the alert for " + name[1] + " " + name[2],
            icon: 'info',
            showConfirmButton: true
            });
    }
});

socket.on('already_sent', function (data) {
    // displayModal("Alert is already sent to " + data.type.toUpperCase());
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    Swal.fire({
        title: "Alert is already sent to " + data.type.toUpperCase(),
        icon: 'info',
        showConfirmButton: true
        });
});

socket.on('request_end', function (data) {
    if (data !== null){
        // displayModal("Requesting to End Alert for " + data.name);
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Requesting to End Alert for " + data.name,
            icon: 'info',
            showConfirmButton: true
            });
    }
});

function formatDate(date) {
    return  date.getFullYear() + "-" +
            (date.getMonth() + 1) + "-" +
            date.getDate() + " " +
            date.getHours() + ":" +
            date.getMinutes() + ":" +
            date.getSeconds();
}

socket.on('change_status', function (data) {
    change_status(data);
});

socket.on('change_marker', function (data) {
    change_marker(data);
});

function change_marker(data) {
    for (var i in rMarker){
        if (rMarker[i].id === data.name){
            rMarker[i].setIcon(getRMarkADSOPHon(data.type, data.status));
        }
    }
}

function change_status(data) {
    var child = document.getElementById(data.name);
    switch (data.status){
        case 'active':
            child.className = "btn btn-info alert-brgy1-btn";
            break;
        case 'occupied':
            child.className = "btn btn-success alert-brgy1-btn";
            break;
        case 'inactive':
            child.className = "btn btn-danger alert-brgy1-btn";
            break;
    }
}

function submit1(){
    var fname = document.getElementById('fname').value;
    var mname = document.getElementById('mname').value;
    var lname = document.getElementById('lname').value;
    var imei = document.getElementById('imei').value;

    var department = document.getElementById('slctdept');
    var depVal=department.options[department.selectedIndex].value;
    var type = document.getElementById('slcttype');
    var typeVal=type.options[type.selectedIndex].value;

    var request = {
        mname : mname,
        lname : lname,
        fname : fname,
        imei  : imei,
        department : depVal,
        st_id : typeVal,
        act_center : act_center
    };

    // console.log(request);
    socket.emit('resp_reg', request);
    /*var div = document.getElementById(imei);
     div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
}

function endtrack(){
  console.log(appuser);
  var data = {
      imei: imei,
      appuser: appuser,
      message: 'Requesting to End Tracking for '+ appuser,
      date: formatDate(new Date())
  };
  socket.emit('dept_end_track', data);
}
function arrivalTime(){
  console.log("-------------------- Arrival Time --------------------------");
   console.log(formatDate(new Date()));
  console.log("-------------------- END Arrival Time --------------------------");
  var data = {
      imei: imei,
      position: dept,
      date: formatDate(new Date())
  };
  socket.emit('arrival_time', data);
}
function dispatch(resp){
  console.log("idol");
    var data = {
        imei: imei,
        name: act_center,
        type: resp.name,
        value: resp.textContent
    };
    console.log("send resp " + data.imei);
    if (data.imei !== null){
        socket.emit('send_alert_resp', data);
    }else{
        // displayModal("No Alert to send to " + resp.textContent + " Responders.");
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "No Alert to send to " + resp.textContent + " Responders.",
            icon: 'info',
            showConfirmButton: true
            });
    }

    /*var div = document.getElementById(imei);
    div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
}

function sendToDept(dept){
    var data = {
        imei: imei,
        name: act_center,
        type: dept.id
    };
    if (data.imei !== null){
        socket.emit('send_alert_dept', data);
    }else{
        // displayModal("No Alert to send to " + dept.textContent + " Department.");
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "No Alert to send to " + dept.textContent + " Department.",
            icon: 'info',
            showConfirmButton: true
            });
    }
}

function getMarkADSOPHon(type) {
    var path = "";
    switch (type){
      case "IMAGE":
          path= "/img/markers/image.png";
          break;
        case "GENERAL":
            path= "/img/markers/rescue-2.png";
            break;
        case "FIRE":
            path= "/img/markers/fire_alert.png";
            break;
        case "MEDICAL":
            path= "/img/markers/medical_alert.png";
            break;
        case "POLICE":
            path= "/img/markers/police_alert.png";
            break;
        case "HIGHRISK":
            path= "/img/markers/highrisk_alert.png";
            break;
        case "RESCUE":
            path= "/img/markers/rescue-2.png";
            break;
    }
    return path;
}

function getRMarkADSOPHon(type, status) {
    var path = "";
    switch (type){
        case 2:
            path= "/img/markers/firemen";
            break;
        case 1:
            path= "/img/markers/ambulance";
            break;
        case 3:
            path= "/img/markers/police";
            break;
        case 4:
            path= "/img/markers/ambulance";
            break;
    }
    if (status === 'offline'){
        path+='_offline.png'
    }else{
        path+='.png'
    }
    return path;
}

function sendInfo(){
    var imgUrl = document.getElementById("image").src;
    var title = document.getElementById("infoTitle").value;
    var content = document.getElementById("infoContent").value;

    var info = {
        image : imgUrl,
        title : title,
        content : content,
        filter: act_center
    };

    socket.emit("send_notification", info);
}

function displayModal(content) {
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    document.getElementById('mt').textContent = "CALAMBAGO 911";
    document.getElementById('mc').textContent = content;
    $('#alertModal').modal('show');
}
