/**
 * Created by Adsoph on 7/8/2017.
 */

var map;
var initLoc;
var marker;
var rMarker = [];
var imgpath;
var focus;


var objDiv = document.getElementById("dispatch");
objDiv.scrollTop = objDiv.scrollHeight;


function initMap() {
  var initLoc = { lat: 14.1860247, lng: 121.1187644 };
  this.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: initLoc,
    // mapTypeId: 'hybrid',
    labels: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ee8839' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#8696b6' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#ffa128' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#04112c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  });

  this.marker = new google.maps.Marker({
    map: this.map

  });

}


function updateMarker(data) {
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

function updateResponderMarker(data) {
  console.log("update responder marker");
  console.log(data);
  //this.map.setCenter({lat:this.lat, lng:this.long, alt:0});
  var rMrk;
  var stat;
  console.log(rMarker);
  var mLatLng = new google.maps.LatLng(data.lat, data.lng);
  if (rMarker.length !== 0) {
    //console.log("lat: " + data.lat + " lng: " + data.lng);
    for (var i = 0; i <= rMarker.length - 1; i++) {
      if (data.id === rMarker[i].id) {
        //Remove the marker from Map
        rMarker[i].setMap(null);

        //Remove the marker from array.
        rMarker.splice(i, 1);
        break;
      }
    }
    //   rMrk.setPosition(mLatLng);
  }

  //if(data.status !== "inactive"){

  if (data.status === 'active') {
    stat = "online";
  } else if (data.status === 'inactive') {
    stat = "offline";
  } else {
    stat = "online";
  }
  rMrk = new google.maps.Marker({
    position: mLatLng,
    map: map,
    icon: getRMarkerIcon(data.type, stat),
    id: data.id,
    title: data.status
  });

  if (rMrk.title == "active") {
    var contentString = '<div id="content">' +
      '<p style = "text-align: center">Send Alert to</p>' +
      '<div id="siteNotice">' +
      // '<button type="button" name="button">Send Alert</button>'+
      '<li style="list-style: none;"><a id ="' + data.id + '" onClick="dispatch(this)" name="' + data.type + '" class = "btn btn-info alert-brgy1-btn " value="' + data.label + '">' + data.label + '</a></li>' +
      '</div>' +
      '</div>';

    if (data.id === focus) {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false
      });
    } else {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true
      });
    }

    infowindow.open(map, rMrk);

    rMrk.addListener('click', function () {
      focus = data.id;
      infowindow.open(map, rMrk);
    });

  } else if (rMrk.title == "inactive") {
    var contentString = '<div id="content">' +
      '<p style = "text-align: center">Offline</p>' +
      '<div id="siteNotice">' +
      // '<button type="button" name="button">Send Alert</button>'+
      '<li style="list-style: none;"><a id ="' + data.id + '" onClick="" name="' + data.type + '" class = "btn btn-danger alert-brgy1-btn " value="' + data.label + '">' + data.label + '</a></li>' +
      '</div>' +
      '</div>';
    if (data.id === focus) {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false
      });
    } else {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true
      });
    }

    infowindow.open(map, rMrk);

    rMrk.addListener('click', function () {
      focus = data.id;
      infowindow.open(map, rMrk);
    });
  }
  else {
    var contentString = '<div id="content">' +
      '<p style = "text-align: center">Send Alert to</p>' +
      '<div id="siteNotice">' +
      // '<button type="button" name="button">Send Alert</button>'+
      '<li style="list-style: none;"><a id ="' + data.id + '" onClick="dispatch(this)" name="' + data.type + '" class = "btn btn-success alert-brgy1-btn " value="' + data.label + '">' + data.label + '</a></li>' +
      '</div>' +
      '</div>';
    if (data.id === focus) {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false
      });
    } else {
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true
      });
    }

    infowindow.open(map, rMrk);

    rMrk.addListener('click', function () {
      focus = data.id;
      infowindow.open(map, rMrk);
    });
  }
  rMarker.push(rMrk);
  //}
}

socket.on('connect', function () {
  //Join room
  console.log('track sam');
  socket.emit('track_resp2');
  socket.emit('track_this', imei);
  socket.emit('track_alert', imei);
});

socket.on('closettab', function (data) {

  if (data.id === imei) {
    window.close();
  }
});

socket.on('init_track', function (data) {
  marker.id = imei;
  imgpath = data.imgpath;
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div id="img">' +
    '<img src="' + data.imgpath + '" alt="No Image Found!" height="500" width="500">'
  '</div>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
  marker.setIcon(getMarkerIcon(data.alert_type));
  var mLatLng = new google.maps.LatLng(data.lat, data.lng);
  map.setCenter(mLatLng);
  map.setZoom(15);
  updateMarker(data);

});



socket.on('disconnect_resp', function (data) {

  for (var i = 0; i < markers.length; i++) {
    console.log("------------dis Marker -------------");
    console.log(markers[i].id);
    console.log("id " + data);
    console.log("------------dis ENDMarker -------------");
    if (markers[i].id === data) {
      console.log("------------tatlo -------------");
      //Remove the marker from Map
      markers[i].setMap(null);

      //Remove the marker from array.
      markers.splice(i, 1);
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


function end() {

  socket.emit('end_alert', { imei: imei, date: formatDate(new Date()) });
  socket.emit('end_dept_alert', appuser);
  close();
}


function send() {
  var checkboxes = document.getElementsByName("ac[]");
  var arr = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      arr.push(checkboxes[i].value);
      //socket.emit('send_alert_ac', {imei : '{{$imei}}', name : arr[i]});
    }
  }
  var result = socket.emit('send_alert_ac', { imei: imei, name: arr[0] });
  if (arr.length !== 0) {
    // displayModal('Alert has been sent');
    displayModal2('Alert has been sent');
  } else {
    // displayModal('No alert center selected!');
    displayModal2('No alert center selected!');
  }
}

// socket.on('already_sent', function (data) {
//     displayModal("Alert is already sent to " + data.name.toUpperCase());
// });

socket.on('callback', function (data) {
  displayModal(data);
});

socket.on('RESP_ALERT', function (data) {
  var isMarkerExist = false;
  console.log("resp_alert");
  console.log(data);
  for (var i = 0; i <= rMarker.length - 1; i++) {
    if (data.id === rMarker[i].id) {
      isMarkerExist = true;
      break;
    }
  }
  if (!isMarkerExist) {
    var newRMrk = new google.maps.Marker({
      map: map,
      icon: getRMarkerIcon(data.type, 'online'),
      id: data.id
    });
    rMarker.push(newRMrk);

  }

  displayModal2("Responder accepted the Alert");

  var data = {
    name: data.id,
    status: data.status
  };

  change_status(data);

});

socket.on('RESP_ATd', function (data) {
  if (data !== null) {
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
  if (data !== null) {
    var sound = new Audio('/sound/notification.mp3');
    sound.play();
    swal({
      title: "Arrival Time Received from " + data.rtype + "",
      text: "Responder Arrival Time: " + data.date,
      type: 'info',
      // timer: 1500,
    });
  }
});
socket.on('location_update', function (data) {
  updateMarker(data);
});
socket.on('RESP_UPDATE3', function (data) {
  console.log("resp_update");
  console.log(data);
  updateResponderMarker(data);
});
socket.on('newLoc', function () {
  socket.emit('track_resp2');;
});
socket.on('track_message', function (data) {
  displayModal2(data.message);
});

socket.on('incident_status', function (data) {
  var res = document.getElementById(data.imei);
  if (res !== null) {
    var name = res.textContent.split(" ");
    // displayModal("Barangay confirm the alert for " + name[1] + " " + name[2]);
    displayModal2("Barangay confirm the alert for " + name[1] + " " + name[2]);
  }
});

socket.on('already_sent', function (data) {
  // displayModal("Alert is already sent to " + data.type.toUpperCase());
  displayModal2("Alert is already sent to " + data.type.toUpperCase());
});

socket.on('request_end', function (data) {
  if (data !== null) {
    // displayModal("Requesting to End Alert for " + data.name);
    document.getElementById('endbtn1').classList.remove('disabled-dv');
    displayModal2("Requesting to End Alert for " + data.name);
  }
});

function formatDate(date) {
  return date.getFullYear() + "-" +
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
  console.log("change_marker");
  change_marker(data);
});

function change_marker(data) {
  console.log("change marker function");
  console.log({ data });
  for (var i in rMarker) {
    if (rMarker[i].id === data.name) {
      rMarker[i].setIcon(getRMarkerIcon(data.type, data.status));
    }
  }
}

function change_status(data) {
  var child = document.getElementById(data.name);
  var markerid = data.name+"r";
  var marker_id = document.getElementById(markerid);
  console.log("====================================== data ===============================");
  console.log(data);
  console.log(child);
  console.log("===========================================================================");
  switch (data.status) {
    case 'active':
      child.className = "btn btn-info alert-brgy1-btn";
      marker_id.className = "btn btn-info alert-brgy1-btn";
      break;
    case 'occupied':
      child.className = "btn btn-success alert-brgy1-btn";
      marker_id.className = "btn btn-success alert-brgy1-btn";
      break;
    case 'inactive':
      child.className = "btn btn-danger alert-brgy1-btn";
      marker_id.className = "btn btn-danger alert-brgy1-btn"
      break;
  }
}

function submit1() {
  var fname = document.getElementById('fname').value;
  var mname = document.getElementById('mname').value;
  var lname = document.getElementById('lname').value;
  var imei = document.getElementById('imei').value;

  var department = document.getElementById('slctdept');
  var depVal = department.options[department.selectedIndex].value;
  var type = document.getElementById('slcttype');
  var typeVal = type.options[type.selectedIndex].value;

  var request = {
    mname: mname,
    lname: lname,
    fname: fname,
    imei: imei,
    department: depVal,
    st_id: typeVal,
    act_center: act_center
  };

  // console.log(request);
  socket.emit('resp_reg', request);
  /*var div = document.getElementById(imei);
   div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
}


function dispatch(resp) {
  console.log("idol");
  console.log(resp.name);
  console.log(resp.textContent);

  var data = {
    imei: imei,
    name: act_center,
    type: resp.name,
    value: resp.textContent,
    imgpath: imgpath
  };
  console.log(data);

  console.log("send resp " + data.imei);
  if (data.imei !== null) {
    socket.emit('send_alert_resp', data);
  } else {
    // displayModal("No Alert to send to " + resp.textContent + " Responders.");
    displayModal2("No Alert to send to " + resp.textContent + " Responders.");
  }

  /*var div = document.getElementById(imei);
  div.innerHTML = div.innerHTML + '<br><a class="btn btn-success"></a>';*/
}

function sendToDept(dept) {
  var data = {
    imei: imei,
    name: act_center,
    type: dept.id
  };
  if (data.imei !== null) {
    socket.emit('send_alert_dept', data);
  } else {
    // displayModal("No Alert to send to " + dept.textContent + " Department.");
    displayModal2("No Alert to send to " + dept.textContent + " Department.");
  }
}

function getMarkerIcon(type) {
  var path = "";
  console.log("type: ", type);
  switch (type) {
    case "IMAGE":
      path = "/img/markers/image.png";
      break;
    case "GENERAL":
      path = "/img/markers/rescue-2.png";
      break;
    case "FLOOD":
      path = "/img/markers/rescue-2.png";
      break;
    case "FIRE":
      path = "/img/markers/fire_alert.png";
      break;
    case "MEDICAL":
      path = "/img/markers/medical_alert.png";
      break;
    case "POLICE":
      path = "/img/markers/police_alert.png";
      break;
    case "HIGHRISK":
      path = "/img/markers/highrisk_alert.png";
      break;
    case "RESCUE":
      path = "/img/markers/rescue-2.png";
      break;
  }
  return path;
}

function getRMarkerIcon(type, status) {
  var path = "";
  switch (type) {
    case 2:
      path = "/img/markers/firemen";
      break;
    case 1:
      path = "/img/markers/ambulance";
      break;
    case 3:
      path = "/img/markers/police";
      break;
    case 4:
      path = "/img/markers/police";
      break;
    case 5:
      path = "/img/markers/firemen";
      break;
    case 6:
      path = "/img/markers/ambulance";
      break;
  }
  if (status === 'offline') {
    path += '_offline.png'
  } else {
    path += '.png'
  }
  return path;
}

function sendInfo() {
  var imgUrl = document.getElementById("image").src;
  var title = document.getElementById("infoTitle").value;
  var content = document.getElementById("infoContent").value;

  var info = {
    image: imgUrl,
    title: title,
    content: content,
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
function displayModal2(content) {
  var sound = new Audio('/sound/notification.mp3');
  sound.play();
  swal({
    title: content,
    icon: "info",
    button: "OK",
  });
  // Swal.fire({
  //   title: content,
  //   icon: 'info',
  //   showConfirmButton: true
  //   });
}


socket.on('change_userStatus', function (data) {

  var child = document.getElementById(data[0].position);
  console.log("====================================== data user===============================");
  console.log(data[0].position);
  console.log(data[0].status);
  console.log("===========================================================================");
  switch (data[0].status) {
    case 'online':
      child.className = "btn btn-info dispatch-btn";
      document.getElementById(data[0].position).setAttribute("onClick", "sendToDept(this)");
      document.getElementById(data[0].position).removeAttribute("data-toggle");
      document.getElementById(data[0].position).removeAttribute("data-target");

      break;
    case 'offline':
      child.className = "btn btn-danger dispatch-btn";
      console.log("remove attr");
      document.getElementById(data[0].position).removeAttribute("onclick");
      document.getElementById(data[0].position).setAttribute("data-toggle", "modal");
      document.getElementById(data[0].position).setAttribute("data-target", "#offline");

      break;
  }
});
