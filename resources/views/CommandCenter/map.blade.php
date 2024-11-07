<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta name="description" content=""/>
  <meta name="author" content=""/>
  <title>CALAMBAGO 911</title>

  <!-- simplebar CSS-->
  <link href="/vendor/dashtreme/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet"/>
  <!-- Bootstrap core CSS-->
  <link href="/vendor/dashtreme/assets/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- animate CSS-->
  <link href="/vendor/dashtreme/assets/css/animate.css" rel="stylesheet" type="text/css"/>
  <!-- Icons CSS-->
  <link href="/vendor/dashtreme/assets/css/icons.css" rel="stylesheet" type="text/css"/>
  <!-- Sidebar CSS-->
  <link href="/vendor/dashtreme/assets/css/sidebar-menu.css" rel="stylesheet"/>
  <!-- Custom Style-->
  <link href="/vendor/dashtreme/assets/css/app-style.css" rel="stylesheet"/>
  <!-- skins CSS-->
  <link href="/vendor/dashtreme/assets/css/skins.css" rel="stylesheet"/>


      <style>
         #map{
           height:75vh;
           border-radius: 8px 8px 8px 8px;
           border: 2px solid white
         }
         .map-container{ position:relative; width:100%; height:auto;padding:5px;}
         body {margin: 0;padding: 0;width: 100%;}
      </style>
</head>

<body class="bg-theme bg-theme2">

   <!-- start loader -->
   <!-- <div id="pageloader-overlay" class="visible incoming"><div class="loader-wrapper-outer"><div class="loader-wrapper-inner"><div class="loader"></div></div></div></div> -->
   <!-- end loader -->

<!-- Start wrapper-->
 <div id="wrapper">

   <?php
     include('../resources/views/CommandCenter/nav/navmaps.php');
   ?>


<div class="clearfix"></div>

  <div class="content-wrapper">
    <div class="container-fluid">

      <!--Start Content -->
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-lg-2">
                    <div class="">
                      <h3>Map</h3>
                    </div>
                  </div>
                  <div class="col-lg-1">
                    <div class="">
                    <label style="position:relative; top:5px;" for="total"><h5>Result(s)</h5></label>
                    </div>
                  </div>
                  <div class="col-lg-1">
                    <div class="card">
                      <input type="text" name="" value="0" id="total" class="form-control" readonly=true>
                    </div>
                  </div>
                  <div class="col-lg-1">
                    <div class="card">
                      <input type="number" name="Year" id="alert_year" min="2020" placeholder="Year" required autofocus class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="card">
                      <select class="form-control" name="Month" id="alert_month" required>
                        <option value="" disabled selected>Month</option>
                        <option value="01">JANUARY</option>
                        <option value="02">FEBRUARY</option>
                        <option value="03">MARCH</option>
                        <option value="04">APRIL</option>
                        <option value="05">MAY</option>
                        <option value="06">JUNE</option>
                        <option value="07">JULY</option>
                        <option value="08">AUGUST</option>
                        <option value="09">SEPTEMBER</option>
                        <option value="10">OCTOBER</option>
                        <option value="11">NOVEMBER</option>
                        <option value="12">DECEMBER</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="card">
                      <select class="form-control" name="Alert" id="alert_type" required>
                        <option value="" disabled selected>Alert Type</option>
                        <option value="FIRE">FIRE</option>
                        <option value="HIGHRISK">HIGHRISK</option>
                        <option value="IMAGE">IMAGE</option>
                        <option value="MEDICAL">MEDICAL</option>
                        <option value="POLICE">POLICE</option>
                        <!-- <option value="RESCUE">RESCUE</option> -->
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="card">
                      <select class="form-control" name="Incident" id="incident" disabled="true">
                        <option value="" disabled selected>Incident</option>
                        <option value="ROBBERY">ROBBERY</option>
                        <option value="ILLEGAL DRUGS RELATED">ILLEGAL DRUGS RELATED</option>
                        <option value="SHOOTING INCIDENT">SHOOTING INCIDENT</option>
                        <option value="VEHICULAR INCIDENT">VEHICULAR INCIDENT</option>
                        <option value="OTHER POLICE CONCERN">OTHER POLICE CONCERN</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-1">
                    <div>
                      <button style="position:relative; bottom:3px;" type="button" name="button" class="btn btn-info btn-round waves-effect waves-light m-1" onclick="onMapLoad()">Go</button>
                    </div>
                  </div>
                </div>
            </div>
            <div class="card-body">
                <div class = "map-container" id="map-container">
                  <div id="map"></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <!--End Content-->

    <!--start overlay-->
	  <div class="overlay toggle-menu"></div>
	  <!--end overlay-->
    </div>
    <!-- End container-fluid-->

    </div><!--End content-wrapper-->
   <!--Start Back To Top Button-->
    <a href="javaScript:void();" class="back-to-top"><i class="fa fa-angle-double-up"></i> </a>
    <!--End Back To Top Button-->


    <div id="myModal1" class="modal fade" style="display: none;" aria-hidden="true" role="dialog">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Change Password</h5>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true" style="color: white">x</span>
            </button>
          </div>

          <div class="modal-body">
            <form id="cp" method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
              {{ csrf_field() }}
              <div class="form-group">
                <label for="input-1">Old Password</label>
                <input id="input-1" type = "password" name = "old_pass" class="form-control" placeholder="Type Old Password">
                <label for="newpass" style = "margin-top:15px;">New Password</label>
                <input id = "newpass" type = "password" name = "New_Password" class="form-control" placeholder="New Password">
                <label for="confirm" style = "margin-top:15px;">Confirm Password</label>
                <input id ="confirm" type = "password" name = "Confirm_Pass"  class="form-control" placeholder="Confirm New Password">
                <br>
                <div id="error_pass">
                </div>
              </div>

          </div>

          <div class="modal-footer">
              <input id="savebtn" type="submit" name="submit" class="btn btn-info" value="SAVE" disabled>
          </div>
          </form>
        </div>

      </div>
    </div>


  </div><!--End wrapper-->

  <!-- Bootstrap core JavaScript-->
  <script src="/vendor/dashtreme/assets/js/jquery.min.js"></script>
  <script src="/vendor/dashtreme/assets/js/popper.min.js"></script>
  <script src="/vendor/dashtreme/assets/js/bootstrap.min.js"></script>

 <!-- simplebar js -->
  <script src="/vendor/dashtreme/assets/plugins/simplebar/js/simplebar.js"></script>
  <!-- sidebar-menu js -->
  <script src="/vendor/dashtreme/assets/js/sidebar-menu.js"></script>
  <!-- Custom scripts -->
  <script src="/vendor/dashtreme/assets/js/app-script.js"></script>


  <!-- server -->
 
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="/js/CommandCenter/map.js"></script>
  <!-- google maps api -->
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script>

</body>
</html>
