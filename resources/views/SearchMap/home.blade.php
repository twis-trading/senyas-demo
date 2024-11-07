<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <title>ADSOPH Call Center</title>

    <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <link href="../css/style.css" rel="stylesheet" type="text/css">
    <link href="../css/actioncenter.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">

    <style media="screen">
    .controls {
      margin-top: 10px;
      border: 1px solid transparent;
      border-radius: 2px 0 0 2px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      height: 32px;
      outline: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }

    #pac-input {
      background-color: #fff;
      font-family: Roboto;
      font-size: 1vw;
      font-weight: 300;
      margin-left: 12px;
      padding: 0 11px 0 13px;
      text-overflow: ellipsis;
      width: 25vw;
      height: 5vh;
    }

    #pac-input:focus {
      border-color: #4d90fe;
    }
    .div-name{
      width: 100%;
      height: 3.5vh;
      font-size: 1vw;
      user-select: none;
      font-family: Roboto;
      font-weight: bold;
      /* border: 1px solid; */
    }
    .div-name button:focus {
    border: none;
    outline: none;
    }

    .div-name select:focus {
    border: none;
    outline: none;
    }
    #alert_type{
      position:relative;
      float:left;
      left:4vw;
      width:10vw;
      border-radius: .5vw;
      padding: 4px  8px;
      cursor: pointer;
      user-select: none;
    }
    #incident{
      position:relative;
      float:left;
      left:5vw;
      width:15vw;
      border-radius: .5vw;
      padding: 4px  8px;
      cursor: no-drop;
      user-select: none;
    }
    /* .div-name select option:hover,
    select option:focus,
    select option:active {
        background: red;
        background-color: red;
        color: white;
    } */
    .div-nums{
      width: 100%;
      height: 3.5vh;
      font-size: 1vw;
      user-select: none;
      font-family: Roboto;
      font-weight: bold;
      /* border: 1px solid; */
    }

    .div-nums input[type=number]::-webkit-inner-spin-button,
              input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
    }

    </style>
</head>
  <body>

    <div id="myModal1" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <form id="cp" method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                {{ csrf_field() }}
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Password</h4>
                    </div>
                    <div class="modal-body">
                        <label>Old Password</label>
                        <input type = "password" name = "old_pass" class="form-control" placeholder="Type Old Password">
                        <label style = "margin-top:15px;">New Password</label>
                        <input id = "newpass" type = "password" name = "New_Password" class="form-control" placeholder="New Password">
                        <label style = "margin-top:15px;">Confirm Password</label>
                        <input id = "confirm" type = "password" name = "Confirm_Pass"  class="form-control" placeholder="Confirm New Password">
                        <div id="error_pass">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="submit" name="submit" class="btn btn-info" value="SAVE">
                        {{--<button type="button" name="submit" class="btn btn-info" value="submit" onclick="submit">SAVE</button>--}}
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

         <div class = "flex-container">
                <div class = "sidebar">
                    <div class = "sidebar-header color1">
                        <span>ALERT INFO</span>
                    </div>
                    <div class = "sidebar-alert-container"  style="height:55vh;overflow: hidden;">
                        <div id="alert-container" class = "alert-action" style="height:55vh;overflow: hidden;">

                            <br>
                            <div class="div-name">
                              <!-- <i class="fa fa-fw fa-lock fa-f5 control-panel-item"data-toggle="modal" data-target="#myModal1"></i> -->
                              <div class="col-xs-1" style="float:right; position:relative; left:-2vw; cursor: pointer;">
                                <i style="position:relative; right: 1.5vw;"class="fa fa-fw fa-lock fa-2x control-panel-item"data-toggle="modal" data-target="#myModal1"></i>
                              </div>
                              <a href="/logout">
                              <div class="col-xs-1" style="float:right; position:relative; left: -3vw;">
                                  <i style="position:relative; right: .5vw;" class="fa fa-power-off fa-2x"></i>
                              </div>
                              </a>
                              <!-- <div id="imei"style="position:relative; float:left; left:5.5vw"></div> -->
                            </div>
                            <br>
                            <div class="div-name">
                              <div class=""style="position:relative; float:left; left:1vw">Alert ID:</div>
                              <div id="imei"style="position:relative; float:left; left:5.5vw"></div>
                            </div>
                            <br>
                            <div class="div-name">
                              <div class=""style="position:relative; float:left; left:1vw">First Name:</div>
                              <input id="fname" style="position:relative; float:left; left:4vw; width:20vw" type="text" name="" value="">
                            </div>
                            <br>
                            <div class="div-name">
                              <div class=""style="position:relative; float:left; left:1vw">Last Name:</div>
                              <input id="lname" style="position:relative; float:left; left:4vw; width:20vw" type="text" name="" value="">
                            </div>
                            <br>
                            <div class="div-nums">
                              <div class="" style="position:relative; float:left; left:1vw">Phone Number:</div>
                              <input id="phone_number" style="position:relative; float:left; left:2vw; width:20vw;" type="number" name="" value="">
                            </div>

                            <br>
                            <div class="div-name">
                              <div class=""style="position:relative; float:left; left:1vw;">Alert Type:</div>
                              <!-- <select id="alert_type" name="" style="position:relative; float:left; left:4vw; width:10vw;background:DodgerBlue;color: #ffffff;padding: 4px  8px;cursor: pointer;user-select: none;"> -->
                              <select id="alert_type" name="" >
                                <option value="" selected disabled>Select</option>
                                <option value="FIRE">FIRE</option>
                                <option value="MEDICAL">MEDICAL</option>
                                <option value="POLICE">POLICE</option>
                              </select>
                            </div>
                            <br>
                            <div class="div-name">
                              <div class=""style="position:relative; float:left; left:1vw;">Incident:</div>
                              <!-- <select id="incident" name="" style="position:relative; float:left; left:5vw; width:15vw;background:DodgerBlue;color: #ffffff;padding: 4px  8px;cursor: pointer;user-select: none;border-radius:8px"> -->
                              <select id="incident">
                                <option value="" disabled selected>Select</option>
                                <option value="ROBBERY">ROBBERY</option>
                                <option value="ILLEGAL DRUGS RELATED">ILLEGAL DRUGS RELATED</option>
                                <option value="SHOOTING INCIDENT">SHOOTING INCIDENT</option>
                                <option value="VEHICULAR INCIDENT">VEHICULAR INCIDENT</option>
                                <option value="OTHER POLICE CONCERN">OTHER POLICE CONCERN</option>

                              </select>
                            </div>
                            <br>
                            <br>
                            <div class="div-name">
                                <button id="send_alert" type="button" name="button" style="position:relative; float:left; left:9vw;background:DodgerBlue;color: #ffffff; border:none; border-radius: 8px ;padding: 4px  8px;cursor: pointer; height:5vh; width:7vw">Send Alert</button>
                                <!-- <button id="send_alert" type="button" name="button" style="position:relative; float:left; left:9vw;background:DodgerBlue;color: #ffffff; border:none; border-radius: 8px ;padding: 4px  8px;cursor: pointer; height:5vh; width:7vw">Logout</button> -->
                            </div>


                        </div>

                    </div>

                </div>
                <div class = "map-container">
                  <input id="pac-input"class="controls" type="text" placeholder="Enter a location" style="position:relative; top: 3vh">
                  <div id="type-selector" class="controls" hidden>
            <input type="radio" name="type" id="changetype-all" checked="checked">
            <label for="changetype-all">All</label>
          </div>

                    <div id="map"></div>
                </div>
            </div>

  </body>
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="../js/call.js"></script>


  <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script> -->
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&libraries=places,geometry&callback=initMap"> </script>
  <!-- <script async defer src="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&libraries=places&callback=initMap"> </script> -->

  <script src="//code.jquery.com/jquery.js"></script>
  <script src="../js/sweetalert2-8.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  <script type="text/javascript">  </script>

</html>
