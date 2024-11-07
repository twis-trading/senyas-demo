var socket = io.connect('http://45.76.183.116:8080');
var lat="";
var lng="";
var imei = "";
var fname = "";
var lname = "";
var phone_number = "";
var alert_type;
var incident;
var CurrentDateTime;
var marker;
var infowindow;

var markers = [];
var rMarker = [];



socket.on('connect', function () {
document.getElementById("incident").disabled = true;
// document.getElementById("send_alert").disabled = true;
// document.getElementById("send_alert").style.cursor = 'no-drop';
socket.emit('track_resp');

google.maps.event.addListener(map, 'click', function( event ){

  lat = event.latLng.lat();
  lng = event.latLng.lng();
  console.log(lat);
  console.log(lng);
  var geocoder = new google.maps.Geocoder();
    var initLoc = {lat, lng};
  // marker.setVisible(true);
  marker.setPosition(initLoc);
  generateImei();
});


socket.on('disconnect_resp2', function(data){

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
});

socket.on('resp_updatecall', function(data){
    updateResponderMarker(data);
});

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

    console.log("------------ updateResponderMarker -------------");
    console.log("id " + data.id)
    console.log(data);
    var rMrk;
    console.log("------------ RMARKER -------------");
    console.log(rMarker);
    var mLatLng = new google.maps.LatLng(data.lat, data.lng);

        rMrk = new google.maps.Marker({
            position : mLatLng,
            map  : map,
            icon : getRMarkADSOPHon(data.type,'online'),
            id   : data.id,
            title : data.label,
            focus: false,
        });
        if(data.id === focus){
          var infowindow = new google.maps.InfoWindow({
            content: data.label,
            disableAutoPan: false
          });
        }else{
          var infowindow = new google.maps.InfoWindow({
            content: data.label,
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



//  //calculates distance between two points in km's
// function calcDistance(p1, p2) {
//   return (google.maps.geometry.sphADSOPHal.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
// }

// var cordinateArr = [];
// var coor = [];
// var marker = [];
// //add this event in gmap script
//
// google.maps.event.addListener(map, "click", function (event) {
//      lat = event.latLng.lat();
//      lng = event.latLng.lng();
//
//      var initLoc = {lat, lng};
//      console.log("initloc: ");
//      console.log(initLoc);
//      cordinateArr.push(new google.maps.LatLng(initLoc));
//   coor.push(initLoc);
//   console.log(cordinateArr);
//
//   if(cordinateArr.length == 2){
//
//     console.log("coor");
//
//     console.log(cordinateArr);
//     for (var i = 0; i < cordinateArr.length; i++) {
//              marker = new google.maps.Marker({
//              position: new google.maps.LatLng(coor[i]),
//              map: map
//            });
//          }
//
//     var flightPath = new google.maps.Polyline({
//          path: cordinateArr,
//          geodesic: true,
//          strokeColor: '#FF0000',
//          strokeOpacity: 1.0,
//          strokeWeight: 2
//      });
//
//      // set the polyline's map with your map object from above.
//      flightPath.setMap(map);
//
//     // console.log(calcDistance(cordinateArr[0], cordinateArr[1]) + " km");
//     // cordinateArr = [];
//   }
//  });


// });
});
var divWidth = $("#div_alert").width();
var text = $("#alert_text");
var fontSize = 12;

while (text.width() > divWidth)
  text.css("font-size", fontSize -= 0.5);

text.css("display", "inline");

$('#confirm').keyup(function(){
        var pass1 = document.forms["cp"]["New_Password"].value;
        var pass2 = document.forms["cp"]["Confirm_Pass"].value;
// $('#error_pass')
        console.log(pass1);
        console.log(pass2);
        if(pass2 != ""){
          if(pass2 != pass1){
    // console.log("invalid");
  ///  error_pass = "error";
          $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
        }
        else{
  //  error_pass = "";
          $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
        }
      }
      else {
        $('#error_pass').html("");
      }

});

$('#newpass').keyup(function(){
              var pass1 = document.forms["cp"]["New_Password"].value;
              var pass2 = document.forms["cp"]["Confirm_Pass"].value;
              // $('#error_pass')
               console.log(pass1);
               console.log(pass2);
              if(pass1 != "" && pass2 != ""){
                if(pass1 != pass2){
                  // console.log("invalid");
                ///  error_pass = "error";
                  $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
                }
                else{
                //  error_pass = "";
                  $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
                }
              }
              else {
                $('#error_pass').html("");
                document.forms["cp"]["Confirm_Pass"].value = "";
              }

              });

$('#alert_type').change(function(){
  alert_type = document.getElementById("alert_type").value;
  console.log(alert_type);
  if(alert_type=="POLICE"){
    document.getElementById("incident").disabled = false;
    document.getElementById("incident").style.cursor = 'pointer';
  }
  else{
    document.getElementById("incident").disabled = true;
    document.getElementById("incident").value = "";
    document.getElementById("incident").style.cursor = 'no-drop';
  }
});

$('#send_alert').click(function(){
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  phone_number = document.getElementById("phone_number").value;
  alert_type = document.getElementById("alert_type").value;
  incident = document.getElementById("incident").value;

  // marker.setVisible(false);

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  CurrentDateTime = date+' '+time;

  console.log("=========== Send Alert =============");
  console.log(fname);
  console.log(lname);
  console.log(phone_number);
  console.log(alert_type);
  console.log(incident);
  console.log(imei);
  console.log(lat);
  console.log(lng);
  console.log(CurrentDateTime);
  var name = fname+" "+lname;

  if (imei !== "") {
    if(alert_type === "POLICE"){
      if(fname !== "" & lname !== "" & phone_number !== "" & incident !== ""){
        var data = {
            imei : imei,
            name: name,
            fname : fname,
            lname : lname,
            contact : phone_number,
            alert_type: alert_type,
            incident: incident,
            lat: lat,
            lng: lng,
            date: CurrentDateTime
        };
        console.log(data);
        socket.emit('call_alert', data);

        Swal.fire({
            title: 'Alert Send',
            text: alert_type,
            type: 'success',
            timer: 2000,
            showConfirmButton: false
            }).then(function(){
             location.reload();
         });
      }
      else {
        Swal.fire({
            title: 'Error Sending',
            text: "Incomplete details!",
            type: 'error',
            timer: 1500,
            showConfirmButton: false
            });
      }
    }
    else if(alert_type === "FIRE" || alert_type === "MEDICAL"){
      if(fname !== "" & lname !== "" & phone_number !== ""){

        var data = {
            imei : imei,
            name: name,
            fname : fname,
            lname : lname,
            contact : phone_number,
            alert_type: alert_type,
            incident: "",
            lat: lat,
            lng: lng,
            date: CurrentDateTime
        };
        console.log(data);
        socket.emit('call_alert', data);

        Swal.fire({
            title: 'Alert Send',
            text: alert_type,
            type: 'success',
            timer: 2000,
            showConfirmButton: false
            }).then(function(){
             location.reload();
         });
      }
      else {
        Swal.fire({
            title: 'Error Sending',
            text: "Incomplete details!",
            type: 'error',
            timer: 1500,
            showConfirmButton: false
            });
      }
    }
    else{
      Swal.fire({
          title: 'Error Sending',
          text: "Incomplete details!",
          type: 'error',
          timer: 1500,
          showConfirmButton: false
          });
    }

  }
  else {
    Swal.fire({
        title: 'Error Sending',
        text: "Incomplete details!",
        type: 'error',
        timer: 1500,
        showConfirmButton: false
        // button: "Aww yiss!",
      });
        // location.reload();
  }

});

function generateImei(){
  var pos;
  var str = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sum = 0;
  var final_digit = 0;
  var t = 0;
  var len_offset = 0;
  var len = 15;
  var issuer;

//
// Fill in the first two values of the string based with the specified prefix.
// Reporting Body Identifier list: http://en.wikipedia.org/wiki/Reporting_Body_Identifier
//

  var rbi = ["01","10","30","33","35","44","45","49","50","51","52","53","54","86","91","98","99"];
  var arr = rbi[Math.floor(Math.random() * rbi.length)].split("");
  str[0] = Number(arr[0]);
  str[1] = Number(arr[1]);
  pos = 2;

//
// Fill all the remaining numbers except for the last one with random values.
//

  while (pos < len - 1) {
    str[pos++] = Math.floor(Math.random() * 10) % 10;
  }

//
// Calculate the Luhn checksum of the values thus far.
//

  len_offset = (len + 1) % 2;
  for (pos = 0; pos < len - 1; pos++) {
    if ((pos + len_offset) % 2) {
      t = str[pos] * 2;
      if (t > 9) {
        t -= 9;
      }
      sum += t;
    }
    else {
      sum += str[pos];
    }
  }

//
// Choose the last digit so that it causes the entire string to pass the checksum.
//

  final_digit = (10 - (sum % 10)) % 10;
  str[len - 1] = final_digit;

// Output the IMEI value.
  t = str.join('');
  t = t.substr(0, len);

// return t;
      document.getElementById('imei').textContent = t ;
      imei = t;
}
  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// <!—ADD YOUR KEY HERE. GENERATE FROM GOOGLE MAPS API

  function initMap() {
  var geocoder = new google.maps.Geocoder();
    var initLoc = {lat: 14.436152, lng: 121.44777};
    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: initLoc,
        mapTypeId: 'hybrid',
        labels: true
    });

    var input = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    infowindow = new google.maps.InfoWindow();
    marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        // window.alert("No details available for input: '" + place.name + "'");
        Swal.fire({
            title: 'No details available for input',
            text: place.name,
            type: 'error',
            timer: 1500,
            showConfirmButton: false
            });
        return;
      }
      else {
        Swal.fire({
            title: 'Location Found',
            text: place.formatted_address,
            type: 'success',
            timer: 1500,
            showConfirmButton: false
            });
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      // marker.setIcon(/** @type {google.maps.Icon} */({
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(35, 35)
      // }));
      // marker.setIcon("/img/markers/ambulance.png");
      // marker.setIcon(google.maps.Marker);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      var item_Lat =place.geometry.location.lat()
      var item_Lng= place.geometry.location.lng()
      var item_Location = place.formatted_address;
      lat = item_Lat;
      lng = item_Lng;
      generateImei();
      console.log(item_Lat);
      console.log(item_Lng);
      console.log(item_Location);
      //alert("Lat= "+item_Lat+"_____Lang="+item_Lng+"_____Location="+item_Location);
    $("#lat").val(item_Lat);
    $("#lng").val(item_Lng);
    $("#location").val(item_Location);
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

    setupClickListener('type-selector', []);
    setupClickListener('type-selector', ['address']);
    setupClickListener('type-selector', ['establishment']);
    setupClickListener('type-selector', ['geocode']);
  }
