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
   <div id="pageloader-overlay" class="visible incoming"><div class="loader-wrapper-outer"><div class="loader-wrapper-inner"><div class="loader"></div></div></div></div>
   <!-- end loader -->

<!-- Start wrapper-->



   <div class="loader-wrapper"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>


    <div id="wrapper">

      <!--Start Content -->
      <div class="card card-authentication1 mx-auto my-5" style="position:relative; top:15vh">
        <div class="card-body">
          <div class="card-content p-2">
            <div class="card-title text-uperase pb-2">Reset Password</div>
            <p class="pb-2">Please enter your username and email address used in your account. You will receive a temporary password via email.</p>
            <form>
              <br>
              <div class="form-group">
                <label for="exampleInputName" class="sr-only">Username</label>
                 <div class="position-relative has-icon-right">
                  <input type="text" id="username" name="username" class="form-control input-shadow" placeholder="Enter Username" required autofocus>
                  <div class="form-control-position">
                    <i class="icon-user"></i>
                  </div>
                 </div>
              </div>

              <div class="form-group">
      			  <label for="exampleInputEmailAddress" class="sr-only">Email Address</label>
      			   <div class="position-relative has-icon-right">
      				  <input type="email" name="email" id="emailadd" class="form-control input-shadow" placeholder="Email Address" required>
      				  <div class="form-control-position">
      					  <i class="icon-envelope-open"></i>
      				  </div>
      			   </div>
      			  </div>

              <div class="form-group" style="display: none">
              <label for="password" class="sr-only">Password</label>
               <div class="position-relative has-icon-right">
                <input type="text" name="password" id="password" class="form-control input-shadow" placeholder="password">
                <div class="form-control-position">
                  <i class="icon-envelope-open"></i>
                </div>
               </div>
              </div>

              <input id="submit" type="button" value="Reset Password" class="btn btn-warning btn-block waves-effect waves-light mt-3">
              <input id="submit2" style="display: none" type="submit" value="Reset Password" name="submit" class="btn btn-warning btn-block waves-effect waves-light mt-3">
              <input id="submit3" style="display: none" type="submit" value="Reset Password" name="submit2" class="btn btn-warning btn-block waves-effect waves-light mt-3">
            </form>
          </div>
        </div>
        <div class="card-footer text-center py-3">
         <p class="mb-0">Return to the <a href="/"> Sign In</a></p>
       </div>
      </div>

      <!--End Content-->


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
  <!--Sweet Alerts -->
  <script src="/vendor/dashtreme/assets/plugins/alerts-boxes/js/sweetalert.min.js"></script>

  <!-- server -->
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="/vendor/smtp/smtp.js"></script>
  <script src="/js/Auth/recover-pass.js"></script>

</body>
</html>
