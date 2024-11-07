var map;
var geocoder;
var initLoc;
var markers = [];
var marker;
var alertSound;
var rMarker = [];
var counter = 0;
var alert_img;
var focus;
var newTabs = [];

function initMap() {
    geocoder = new google.maps.Geocoder();
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
}

socket.on('sms_connected', function(){
  console.log("sms_connected");
  $('#sms-rcvr').attr("title", 'SMS online');
  $('#sms-receiver').attr("style", 'color:green');
});

socket.on('sms_disconnected', function(){
  console.log('sms_disconnected');
  $('#sms-rcvr').attr("title", 'SMS offline');
  $('#sms-receiver').attr("style", 'color:red');
});


socket.on('manualStopAlerts', function (data) {
console.log({data});
if (data !== null){
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: data.name + " manual Stop her/his Alert.",
            text: data.name + " requesting to EndTrack her/his Alert.",
            type: 'info',
            // timer: 1500,
            showConfirmButton: true
            });
    }
});

socket.on('RESP_REPORTd', function (data) {
console.log({data});
if (data !== null){
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Report Received, alert from " + data.aname + "",
            text: "Patient name: " + data.name + ", Patient Status: " + data.pstatus + ", Hospital: " + data.hospital + ", Remarks: " + data.remarks,
            type: 'info',
            // timer: 1500,
            showConfirmButton: true
            });
    }
});

socket.on('RESP_ATd', function (data) {
    if (data !== null){
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Arrival Time Received from " + data.position + "",
            text: "Responder Arrival Time: " + data.date,
            type: 'info',
            // timer: 1500,
            showConfirmButton: true
            });
    }
});

socket.on('RESP_AT', function (data) {
    if (data !== null){
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Arrival Time Received from " + data.rtype + "",
            text: "Responder Arrival Time: " + data.date,
            type: 'info',
            // timer: 1500,
            showConfirmButton: true
            });
    }
});


socket.on('reg_nottif', function(data){
  var col=document.getElementById("nottif");
      if(data > 0){
        col.style.color="red";
      }
      else{
        col.style.color="white";
      }

});

socket.on('reg_nottifs', function(data){
  var col=document.getElementById("nottif");
      if(data > 0){
        col.style.color="red";
      }
      else{
        col.style.color="white";
      }

});

socket.on('new_alert', function(data) {
  alert(data, 'alert-container');
  var sound = new Audio('/sound/notification.mp3');
  sound.play();
  // displayModal("New alert has been received.");
  Swal.fire({
      title: 'New alert has been received.',
      text: data.alert_type,
      imageUrl: alert_img,
      imageWidth: 50,
      imageHeight: 50,
      showConfirmButton: true
      });
  updateMarker(data);
});

// socket1.on('connect', function(data) {
//   console.log('aaaaaaaaaaaaaaaaa');
// //  alert(data, 'alert-container');
//   // displayModal("New alert has been received.");
//   socket1.emit('send_alert',{imei : '863674038563886', lat : '14.3101463', lng : '121.0875395', alert_type : 'POLICE', time : '2019-05-27 00:17:32', pnpi : 'VEHICULAR INCEDENT'});
// //  updateMarker(data);
// });

socket.on('dept_end_message', function(data){
  // displayModal("Requesting to End Tracking for " + data);
  var sound = new Audio('/sound/notification.mp3');
  sound.play();
  Swal.fire({
      title: 'Requesting to End Tracking for',
      text: data.appuser,
      type: 'info',
      // timer: 1500,
      showConfirmButton: true
      });
});

socket.on('init_alert', function(data) {
  for (var i = 0; i<=data.length - 1; i++){
    alert(data[i],'alert-container');
    updateMarker(data[i]);
}
});

socket.on('track_message', function (data) {
    // displayModal(data.message);
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    Swal.fire({
        title: data.message,
        // text: data,
        type: 'info',
        // timer: 1500,
        showConfirmButton: true
        });
});

socket.on('init_ongoing', function(data) {
  for (var i = 0; i<=data.length - 1; i++){
    ongoing(data[i], 'ongoing-container');
    //newTabs.push( window.open("http://45.76.182.96/ADSOPH/trackLocation/" + data.imei, "_blank") );
}
});
socket.on('updateLocation', function(data){
    updateMarker(data);
/*addMarker(myLatLng);
showMarkers(map);*/

//alert();

});

function change_alert(child, container) {
    child.getElementsByTagName('div')[0].className = 'note-ongoing';
    document.getElementById(container).appendChild(child);
}

// alert -> ongoing_container
function ongoing(data, container) {
    var child = document.getElementById(data.imei);
    if (child === null){
        var div = document.createElement('div');
        var anchor = document.createElement('a');
        //anchor.setAttribute('href','http://45.76.182.96/ADSOPH/trackLocation/' + data.imei);
        // anchor.setAttribute('href','http://139.180.132.53/ADSOPH/trackLocation/' + data.imei);
        anchor.setAttribute('id', data.imei);
        //anchor.setAttribute('target', '_blank');
        anchor.setAttribute('onclick','onClickEv(this)');
        anchor.setAttribute('class', 'alert-notif');
        div.textContent = data.contact +" "+ data.name + " " + data.alert_type;
        div.setAttribute('class', 'note-ongoing');
        anchor.appendChild(div);

        document.getElementById(container).appendChild(anchor);
        //-------------------sam
        socket.emit('track_res', "active");

    }
}
//new alert -> alert-container
function alert(data, container) {
   var child = document.getElementById(data.imei);
    if (child === null){
        var div = document.createElement('div');
        var anchor = document.createElement('a');

        anchor.setAttribute('id', data.imei);

        anchor.setAttribute('onclick','onClickEv(this)');
        anchor.setAttribute('class', 'alert-notif');
        div.textContent = data.contact + " " + data.name + " " + data.alert_type;
        div.setAttribute('class', 'note');
        anchor.appendChild(div);

        document.getElementById(container).appendChild(anchor);

        switch (data.alert_type) {
           case 'IMAGE':
              alertSound =new Audio('/sound/general.mp3');
              alert_img = "/img/markers/image.png";
              alertSound.play();
              break;
            case 'GENERAL':
                alertSound = new Audio('/sound/general.mp3');
                alert_img  = "/img/markers/rescue-2.png";
                alertSound.play();
                break;
            case 'FIRE':
                alertSound = new Audio('/sound/fire.mp3');
                alert_img = "/img/markers/fire_alert.png";
                alertSound.play();
                break;
            case 'MEDICAL':
                alertSound = new Audio('/sound/medical.mp3');
                alert_img = "/img/markers/medical_alert.png";
                alertSound.play();
                break;
            case 'HIGHRISK':
                alertSound = new Audio('/sound/highrisk.mp3');
                alert_img = "/img/markers/highrisk_alert.png";
                alertSound.play();
                break;
            case 'RESCUE':
                alertSound = new Audio('/sound/medical.mp3');
                alert_img = "/img/markers/rescue-2.png";
                alertSound.play();
                break;
            case 'POLICE':
                alertSound = new Audio('/sound/police.mp3');
                alert_img = "/img/markers/police_alert.png";
                alertSound.play();
                break;
        }
       alertSound.onended = function () {
           if (isHasAlert()) {
               alertSound.play();
           }
       }
    }

  //$('#alert-container').html(html);
}

socket.on('connect', function () {
  var user_name = userlogin;
    console.log('user_login ' + user_name);
    socket.emit('user_login', {name : 'CommandCenter', username: user_name});
    socket.emit('track_resp2');
    socket.emit('checkNottif');
    socket.emit('checksms');
    console.log('track_resp2');


});

function logout(){
  socket.emit('disconnect');
}
function send_confirm(data){
  console.log("SMSSMSMSMSMSMSMSMSMSMSMMSSMSMSMS");
  socket.emit('send_confirm', {mobile: data});
}
function removeMarker(data){
  for(var i = 0;i<=markers.length-1;i++){
    if (markers[i].id === data){
        markers[i].setMap(null);
        markers.splice(i,1);
        break;
    }
  }
}

function updateMarker(data){
  //this.map.setCenter({lat:this.lat, lng:this.long, alt:0});
  //console.log("lat: " + data.lat + " lng: " + data.lng);
  var mLatLng = new google.maps.LatLng(data.lat, data.lng);
  var marker =  new google.maps.Marker({
      position: mLatLng,
      map: this.map,
      icon: getMarkADSOPHon(data.alert_type),
      id: data.imei
  });
  //marker.metadata = {id: data.imei};
  // marker.addListener('click', function() {
  //   displayModal(marker.get('id'));
  //
  // });
    alertGeocoder(geocoder, map, marker);
  markers.push(marker);
}

function onClickEv(child) {
   initMap();
  var user_name = userlogin;
  var wihe = 'width='+screen.availWidth+',height='+screen.availHeight;
    change_alert(child, 'ongoing-container');
    socket.emit('accept_alert', {id: child.id, user_name: user_name});
    socket.emit('on_alert_accepted', {id: child.id, user_name: user_name});
    removeMarker(child.id);
    socket.emit('close_tab', {id: child.id});
    setTimeout(function(){
     window.open(myIP+"/calambago911/trackLocation/" + child.id, child.id, "resizable,scrollbars,status,screenX=1,screenY=1,left=1,top=1,"  + wihe);
},
500);
     //if (isHasAlert()){
     try{
       alertSound.pause();
       alertSound.currentTime = 0;
     }catch(err) {
       console.log("error");
}
    socket.emit('pause_sound');
     //}
  //document.getElementById('alert-container').removeChild(child);
}
socket.on('pause_alert', function(){
  alertSound.pause();
  alertSound.currentTime = 0;
});
socket.on('on_alert_acceptede', function (data) {
   initMap();
    $('#alertModal').modal('hide');
  var child = document.getElementById(data.id);
  child.getElementsByTagName('div')[0].className = 'note-ongoing';
  removeMarker(child.id);
  if(data.user_name != userlogin){
     child.getElementsByTagName('div')[0].style.display= 'none';;
     document.getElementById('ongoing-container').appendChild(child);
    }
    else{
      document.getElementById('ongoing-container').appendChild(child);
    }

   // location.reload();
// change_alert(data, 'ongoing-container');
});

socket.on('end_alert2', function (data) {
  console.log("============== END ALERT =================");
    var child = document.getElementById(data);
    if(child !== null){
      document.getElementById('ongoing-container').removeChild(child);
      // location.reload();
      socket.emit('track_resp2');
    }
});

socket.on('request_end', function (data) {
    if (data !== null){
        // displayModal("Requesting to End Alert for " + data.name);
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        Swal.fire({
            title: "Requesting to End Alert for",
            text: data.name,
            type: 'info',
            // timer: 1500,
            showConfirmButton: true
            });
    }
});

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

function isHasAlert() {
    var ao =  document.getElementById('alert-container');
    var alrt = ao.getElementsByTagName('a');
    return alrt.length !==0;
    //for (var e in document.get)
}

function alertGeocoder(geocoder, map, marker) {
    var infoWindow = new google.maps.InfoWindow();
    geocoder.geocode({'location': marker.position}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                //map.setZoom(11);
                infoWindow.setContent(results[0].formatted_address);
                infoWindow.open(map, marker);
            } else {
                displayModal('No results found');
            }
        } else {
            displayModal('Geocoder failed due to: ' + status);
        }
    });
}

function sendInfo(){
    var imgUrl = document.getElementById("image").src;
    var title = document.getElementById("infoTitle").value;
    var content = document.getElementById("infoContent").value;

    var info = {
        image : imgUrl,
        title : title,
        content : content,
        filter: ""
    };

    socket.emit("send_notification", info);
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
   /* var div = document.getElementById(imei);
    div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
    socket.emit('resp_reg', request);

}

function displayModal(content) {
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    document.getElementById('mt').textContent = "CALAMBAGO 911";
    document.getElementById('mc').textContent = content;
    $('#alertModal').modal('show');
}

// socket.on('RESP_ALERT', function (data) {
//     var isMarkerExist = false;
//     for (var i=0;i<=rMarker.length-1;i++){
//         if (data.id === rMarker[i].id){
//             isMarkerExist = true;
//             break;
//         }
//     }
//     if (!isMarkerExist){
//         var newRMrk = new google.maps.Marker({
//             map : map,
//             icon : getRMarkADSOPHon(data.type,'online'),
//             id  : data.id
//         });
//         rMarker.push(newRMrk);
//     }
//
//     displayModal("Responder accepted the Alert");
//     change_status({name: data.id, status: data.status});
//     //dischange_status(data)
// });
socket.on('change_marker', function (data) {
    console.log("change_marker");
    change_marker(data);
});

function change_marker(data) {
    console.log("change marker function");
    console.log({data});
    for (var i in markers){
      console.log(markers[i].id + " " + data.name);
        if (markers[i].id === data.name){
            markers[i].setIcon(getRMarkADSOPHon(data.type, data.status));
        }
    }
}
socket.on('disconnect_resp', function(data){

  for (var i = 0; i < markers.length; i++) {
    console.log("------------dis Marker -------------");
      console.log(markers[i].id);
      console.log(data);
      console.log("------------dis ENDMarker -------------");
            if (markers[i].id === data.id) {
                markers[i].setIcon(getRMarkADSOPHon(data.dep_id, data.status));
                //Remove the marker from Map
                //markers[i].setMap(null);

                //Remove the marker from array.
                //markers.splice(i, 1);
                break;
            }
        }
        // for(var i = 0;i<=markers.length-1;i++){
        //   if (markers[i].id === data){
        //       markers[i].setMap(null);
        //       markers.splice(i,1);
        //       break;
        //   }
        // }
});
// socket.on('resp_update3', function(data){
//     console.log("------------ responder reload -------------");
//     console.log(data);
//     updateResponderMarker(data);
//     console.log("------------ end responder reload -------------");
// });
socket.on('resp_update2', function(data){
    console.log("------------ responder login -------------");
    console.log(data);
    updateResponderMarker(data);
    console.log("------------ end responder login -------------");
});
// socket.on('RESP_UPDATE2',function(data){
//     console.log("resp_update");
//     console.log(data);
//     updateResponderMarker(data);
// });
function updateResponderMarker(data){
  for (var i = 0; i < markers.length; i++) {
    console.log("------------ Marker -------------");
      console.log(markers[i].id);

      console.log("------------ ENDMarker -------------");
            if (markers[i].id === data.id) {
                //Remove the marker from Map
                markers[i].setMap(null);

                //Remove the marker from array.
                markers.splice(i, 1);
                break;
            }
        }
//if(data.status !== "inactive"){
    console.log("------------ updateResponderMarker -------------");
    var rMrk;
    var stat;
    var color;
    var check;
    console.log("------------ RMARKER -------------");
    console.log(rMarker);

    if(data.status === 'active'){
      stat = "online";
      color = "blue";
      check = "";
    }else if(data.status === 'occupied'){
      stat = "online";
      color = "green";
      check = "Occupied";
    }else{
      stat = "offline";
      color = "red";
      check = "Offline";
    }
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);

        rMrk = new google.maps.Marker({
            position : mLatLng,
            map  : map,
            icon : getRMarkADSOPHon(data.type, stat),
            id   : data.id,
            title : data.label,
            focus: false,
        });

        var contentString = '<div id="content">'+
    '<div id="rmarker">'+
    '</div>'+
    '<div id="bodyContent">'+
    '<b><p style="font-size:120%;text-align:center;color:'+color+'">'+data.label+'</p></b>'+
    // '<li style="list-style: none;"><a id ="'+data.id+'" onClick="dispatch(this)" name="'+data.type+'" class = "btn btn-info alert-brgy1-btn " value="'+data.label+'">'+data.label+'</a></li>'+
    '<p style="text-align:center;">'+data.battery+" | GPS: "+data.gps+'</p>'+
    '<b><p style="font-size:120%;text-align:center;color:'+color+'">'+check+'</p></b>'+
    '</div>'+
    '</div>';
        if(data.id === focus){
          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            disableAutoPan: false
          });
        }else{
          var infowindow = new google.maps.InfoWindow({
            content: contentString,
            disableAutoPan: true
          });
        }

        infowindow.open(map, rMrk);

        rMrk.addListener('click', function() {
          focus = data.id;
             infowindow.open(map, rMrk);
        });

        // infowindow.open(map, rMrk);
      markers.push(rMrk);
      console.log("------------ MARKER LENGTH-------------");
      console.log(markers.length);
//}
}

function dispatch(resp){
        displayModal2("No Alert to send to " + resp.textContent + " Responders.");
}

function getRMarkADSOPHon(type, status) {
  console.log("type" + type);
console.log("status" + status);
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
            path= "/img/markers/police";
            break;
        case 5:
            path= "/img/markers/firemen";
            break;
        case 6:
              path= "/img/markers/ambulance";
              break;
        case 7:
            path= "/img/markers/firemen";
        break;
    }
    if (status === 'offline'){
        path+='_offline.png'
    }else{
        path+='.png'
    }
    return path;
}


$(window).bind("beforeunload", function() {
        socket.emit('logs',(userlogin));
       // return confirm("Do you really want to close?");

   });

window.addEventListener('online', () => onLine());
function onLine(){
  console.log('came online');
  location.reload();
}
window.addEventListener('offline', () => offLine());
function offLine(){
  console.log('came offLine');
  location.reload();
  // socket.emit('logs',(userlogin));
}
