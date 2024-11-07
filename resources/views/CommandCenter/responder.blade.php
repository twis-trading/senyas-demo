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


</head>

<body class="bg-theme bg-theme2">

   <!-- start loader -->
   <!-- <div id="pageloader-overlay" class="visible incoming"><div class="loader-wrapper-outer"><div class="loader-wrapper-inner"><div class="loader"></div></div></div></div> -->
   <!-- end loader -->

<!-- Start wrapper-->
 <div id="wrapper">

   <?php
     include('../resources/views/CommandCenter/nav/navresponder.php');
   ?>


<div class="clearfix"></div>

  <div class="content-wrapper">
    <div class="container-fluid">

      <!--Start Content -->
      <br><br><br><br><br><br>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h5>Register Responder</h5>
              </div>

              <div class="card-body">
                <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                  {{ csrf_field() }}
                  <div class="form-group">
                    <input type="text" name="" placeholder="First Name" id="fname" class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="text" name="" placeholder="Middle Name" id="mname" class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="text" name="" placeholder="Last Name" id="lname" class="form-control">
                  </div>
                  <div class="form-group">
                    <input type="text" name="" placeholder="Device IMEI" id="imei" class="form-control">
                  </div>

                  <select id = "slctdept" style = "margin-top:15px;" name = "department" class="form-control" onchange="populate('slctdept','slcttype')">
                      <option disabled selected value="">Choose Department</option>
                      <!-- <option value="MEDICAL">MEDICAL</option>
                      <option value="FIRE">FIRE</option>
                      <option value="POLICE">POLICE</option> -->
                      <option value="AMBULANCE">AMBULANCE</option>

                  </select>

                  <select id = "slcttype" style = "margin-top:15px;" name = "type" class="form-control" required>
                    <option  disabled selected value="">Responder Type</option>
                  </select>
                  <br>
                  <div class="form-group">
                    <input id="save-resp" type="button" value="Register" class="btn btn-info btn-block waves-effect waves-light">
                  </div>
                </form>
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
  <script src="/vendor/dashtreme/assets/plugins/alerts-boxes/js/sweetalert.min.js"></script>

  <!-- server -->
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="/js/CommandCenter/responder.js"></script>

  <script type="text/javascript">

  function populate(s1,s2){
      var s1 = document.getElementById(s1);
      var s2 = document.getElementById(s2);
      s2.innerHTML="";
      if(s1.value=="AMBULANCE"){
          @foreach($ambulance as $ambulanceitems)
              opt1 = document.createElement('option');
              opt1.id = 'opttype';
              opt1.value = '{{$ambulanceitems->barangay}}';
              opt1.text = '{{$ambulanceitems->barangay}}';
              s2.appendChild(opt1);
          @endforeach
      } else if(s1.value=="MARSHALL"){
         @foreach($marshall as $marshallitems)
              opt1 = document.createElement('option');
              opt1.id = 'opttype';
              opt1.value = '{{$marshallitems->barangay}}';
              opt1.text = '{{$marshallitems->barangay}}';
              s2.appendChild(opt1);
        @endforeach
    } else if(s1.value=="FIRE AUXILIARY"){
         @foreach($fireaux as $fireauxitems)
             opt1 = document.createElement('option');
             opt1.id = 'opttype';
             opt1.value = '{{$fireauxitems->barangay}}';
             opt1.text = '{{$fireauxitems->barangay}}';
             s2.appendChild(opt1);
         @endforeach
    }

  }
  </script>

</body>
</html>
