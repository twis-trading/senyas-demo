var map;
var initLoc;
var marker;
var rMarker = [];
var imei = null;
var alertSound;
var alert_img;

socket.on('new_resp_login', function(){
  window.location.reload();
});

socket.on('send_dept', function (data) {
    console.log('alert send to dept');
    console.log({data});
    marker.setIcon(getMarkADSOPHon(data.alert_type));
    display_alert(data);
    // displayModal("New alert received.")
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    Swal.fire({
        title: 'New alert has been received.',
        text: data.alert_type,
        imageUrl: alert_img,
        imageWidth: 50,
        imageHeight: 50,
        showConfirmButton: true
        });
});

socket.on('connect', function () {
    socket.emit('dept_login', {name : act_center, dept: dept});
    //socket.emit('user_login', {name : act_center});
    console.log('login_action_dep');
    console.log(imei);
    if ( imei !== null){
      console.log('login_action_dep');
        alertClick(imei);
    }
});

//------------------------------------------------sam
socket.on('init_res', function(data) {
  for (var i = 0; i<=data.length - 1; i++){
    res(data[i], 'res-container');
}
});

function res(data, container) {
    var child = document.getElementById(data.imei);
    if (child === null){
        var div = document.createElement('div');
        var anchor = document.createElement('a');
      //  anchor.setAttribute('href','http://45.76.182.96/ADSOPH/trackLocation/' + data.imei);
        anchor.setAttribute('id', data.imei);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('onclick','onClickEv(this)');
        anchor.setAttribute('class', 'res-notif');
        div.textContent = data.contact +" "+ data.name + " " + data.alert_type;
        div.setAttribute('class', 'note-res');
        anchor.appendChild(div);

        document.getElementById(container).appendChild(anchor);
    }
}

socket.on('init_track', function (data) {
    marker.setIcon(getMarkADSOPHon(data.alert_type));
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);
    map.setCenter(mLatLng);
    map.setZoom(18);
    updateMarker(data);
});

socket.on('init_resp', function (data) {
    for (var mrk in rMarker){
        rMarker[mrk].setMap(null);
    }
    rMarker = [];
    if (data.length !== 0){
        for (var i=0; i<=data.length-1;i++){
            var mLatLng = new google.maps.LatLng(data[i].lat,data[i].lng);
            var newRMrk = new google.maps.Marker({
                position : mLatLng,
                map  : map,
                icon : getRMarkADSOPHon(data[i].type, 'online'),
                id   : data[i].id
            });
            rMarker.push(newRMrk);
        }
    }
});

socket.on('alerts_ac', function (data) {
    console.log('alerts_ac');
    var child;
    for (var i = 0; i<=data.length - 1; i++){
        child = document.getElementById(data[i].imei);
        if (child === null) {
            display_alert(data[i], 'alert-container');
        }
    }
});

//initialize map
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
    marker.addListener('click', function() {
        displayModal(marker.id);
    });
}


function updateMarker(data){
    //this.map.setCenter({lat:this.lat, lng:this.long, alt:0});
    //console.log("lat: " + data.lat + " lng: " + data.lng);
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);
    this.marker.setPosition(mLatLng);
    marker.id = imei;
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
            icon : getRMarkADSOPHon(data.type, 'online'),
            id   : data.id
        });
        rMarker.push(rMrk);
    }
}

function change_alert(data) {
    console.log("div id");
    console.log(data);
    document.getElementById(data.id).className = 'note-ongoing';
    document.getElementById('ongoing-container').appendChild(data);//idol
}

socket.on('change_status', function (data) {
    change_status(data);
});

socket.on('change_marker', function (data) {
    change_marker(data);
});

function change_status(data) {
    var child = document.getElementById(data.name);
    console.log('barangay : ' + data.name);
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

function change_marker(data) {
    for (var i in rMarker){
        if (rMarker[i].id === data.name){
            rMarker[i].setIcon(getRMarkADSOPHon(data.type, data.status));
        }
    }
}


function display_alert(data){
    console.log(data);
    var child = document.getElementById(data.imei);
    if (child === null){
        var div = document.createElement('div');
        var anchor = document.createElement('a');
        // anchor.setAttribute('href','http://45.76.151.132/ADSOPH/' + dept + '/trackLocationDept/' + data.imei);
        // anchor.setAttribute('href','http://139.180.147.208/daet/' + dept + '/trackLocationDept/' + data.imei);
        anchor.setAttribute('href', myIP+'/calambago911/' + dept + '/trackLocationDept/' + data.imei);
        // anchor.setAttribute('id', data.imei);
        anchor.setAttribute('target', '_blank');
        div.setAttribute('onclick','alertClick(this)');

        div.textContent = data.contact +" "+ data.name + " " + data.alert_type;
        if (data.status !== 1) {
            div.setAttribute('class', 'note');
            anchor.appendChild(div);
            div.setAttribute('id', data.imei);
            document.getElementById('alert-container').appendChild(anchor);
        }else {
            div.setAttribute('class', 'note-ongoing');
            console.log("dsadasd");
            anchor.appendChild(div);
            div.setAttribute('id', data.imei);
            document.getElementById('ongoing-container').appendChild(anchor);
        }

        if (data.status !== 1){
            switch (data.alert_type) {
              case 'IMAGE':
                  alertSound =new Audio('/sound/general.mp3');
                  alert_img = "/img/markers/image.png";
                  alertSound.play();
                  break;
                case 'GENERAL':
                    alertSound =new Audio('/sound/general.mp3');
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
                case 'POLICE':
                    alertSound = new Audio('/sound/police.mp3');
                    alert_img = "/img/markers/police_alert.png";
                    alert_img = "/img/markers/highrisk_alert.png";
                    alertSound.play();
                    break;
                case 'HIGHRISK':
                    alertSound = new Audio('/sound/highrisk.mp3');
                    alert_img = "/img/markers/highrisk_alert.png";
                    alertSound.play();
                    break;
            }
        }
        if (alertSound !== undefined){
            alertSound.onended = function () {
                if (isHasAlert()) {
                    alertSound.play();
                }
            }
        }
    }
}

function isHasAlert() {
    var ao =  document.getElementById('alert-container');
    var alrt = ao.getElementsByClassName('note');
    return alrt.length > 0;
    //for (var e in document.get)
}

socket.on('track_message', function (data) {
    displayModal(data.message);
});

function alertClick(id){
  console.log("-------------------------- FORMAT DATE -------------------------");
  console.log(formatDate(new Date()));
  console.log(id);
  console.log("-------------------------- FORMAT DATE -------------------------");
    //alert(id);
    change_alert(id);
    socket.emit('track_alert', id, dept, formatDate(new Date()));
    //socket.emit('count');
    imei = id;
    // if (isHasAlert()){
        alertSound.pause();
        alertSound.currentTime = 0;
    // }
}

socket.on('RESP_ALERT', function (data) {
    var isMarkerExist = false;
    console.log('idol : ' + data.id);
    for (var i=0;i<=rMarker.length-1;i++){
        if (data.id === rMarker[i].id){
            isMarkerExist = true;
            break;
        }
    }
    if (!isMarkerExist){
        var newRMrk = new google.maps.Marker({
            map : map,
            icon : getRMarkADSOPHon(data.type, 'online'),
            id  : data.id
        });
        // newRMrk.addTo(map);
        rMarker.push(newRMrk);
    }
    // displayModal("Responder accepted the Alert");
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    // displayModal("New alert has been received.");
    Swal.fire({
        title: 'Responder accepted the Alert',
        icon: 'info',
        showConfirmButton: true
        });

    change_status({name: data.id, status: 'occupied'});
    // socket.broadcast.emit('change_status', data);
});

// socket.on('RESP_UPDATE',function(data){
//     updateResponderMarker(data);
// }); idol comment


socket.on('no_resp', function (data) {
    displayModal(data.message);
});

socket.on('end_alert', function (data) {
    var child = document.getElementById(data);
    if (data === imei){
        marker.setPosition(null);
        for (var mrk in rMarker){
            rMarker[mrk].setMap(null);
        }
        map.setCenter(initLoc);
        map.setZoom(15);
        rMarker = [];
        imei = null;
    }

    if (child !== null){
        document.getElementById('alert-container').removeChild(child);
    }
});

function dispatch(resp){

    var data = {
        id: resp.id,
        imei: imei,
        name: act_center,
        type: resp.name,
        value: resp.textContent
    };
    if (data.imei !== null){
        socket.emit('send_alert_resp', data);
    }else{
        // displayModal("No Alert to send to " + resp.textContent + " Responders.");
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        // displayModal("New alert has been received.");
        Swal.fire({
            title: "No Alert to send to " + resp.textContent + " Responders.",
            icon: 'info',
            showConfirmButton: true
            });
    }

    /*var div = document.getElementById(imei);
    div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/

}
socket.on('location_update',function(data){
    updateMarker(data);
});

socket.on('incident_status', function (data) {
    var res = document.getElementById(data.imei);
    if (res !== null){
        var name = res.textContent.split(" ");
        // displayModal("Barangay confirm Alert for " + name[1] + " " + name[2]);
        var sound = new Audio('/sound/notification.mp3');
        sound.play();
        // displayModal("New alert has been received.");
        Swal.fire({
            title: "Barangay confirm Alert for " + name[1] + " " + name[2],
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
        fname : fname,
        mname : mname,
        lname : lname,
        imei  : imei,
        department : depVal,
        type : typeVal,
        act_center : act_center
    };
    socket.emit('resp_reg', request);
    /*var div = document.getElementById(imei);
     div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
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

function displayModal(content) {
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    document.getElementById('mt').textContent = "MASH";
    document.getElementById('mc').textContent = content;
    $('#alertModal').modal('show');
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
}
