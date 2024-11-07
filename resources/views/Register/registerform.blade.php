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
      <div class="card card-authentication1 mx-auto my-4" style="position:relative; top:15vh">
        <div class="card-body">
          <div class="card-content p-2">
            <div class="text-center">
              <img src="/img/logo.png" alt="logo icon" class="logo-icon">
            </div>
            <div class="card-title text-uppercase text-center py-3">Sign Up</div>

            <form id="reg_form" method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                {{ csrf_field() }}
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
              <label for="exampleInputEmailId" class="sr-only">Email ID</label>
               <div class="position-relative has-icon-right">
                <input type="email" id="email" name="email" class="form-control input-shadow" placeholder="Enter Your Email ID" required>
                <div class="form-control-position">
                  <i class="icon-envelope-open"></i>
                </div>
               </div>
              </div>

              <div class="form-group">
               <label for="exampleInputPassword" class="sr-only">Password</label>
               <div class="position-relative has-icon-right">
                <input type="password" id="pasword" name="password" class="form-control input-shadow" placeholder="Choose Password" required>
                <div class="form-control-position">
                  <i class="icon-lock"></i>
                </div>
               </div>
              </div>

              <div class="form-group">
                <select  id="user_type" name="user_type" class="form-control" required>
                    <option value="" selected disabled>User Type</option>
                    <option value="0">ActionCenter</option>
                    <option value="2">Department</option>
                    <option value="1">Admin</option>
                </select>
              </div>

              <div class="form-group">
                <select  id="position_div" name="position" class="form-control" required>
                    <option value="" selected disabled >Position</option>
                </select>
              </div>
              <div class="form-group">
                <input type="submit" value="Sign up" name="submit" class="btn btn-info btn-block waves-effect waves-light">
              </div>

            </form>

          </div>
        </div>

        <div class="card-footer text-center py-3">
  		    <p class="mb-0">Already have an account? <a href="/"> Sign In here</a></p>
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


  <script type="text/javascript">
  $('#user_type').change(function(){
                var type = document.forms["reg_form"]["user_type"].value;
                $('#position_div').html("");
                 console.log(type);
                 if(type == "0"){
                   $('#position_div').html("<label>Position</label><select class='form-control' name='position' required><option value='' disabled selected>Choose</option><option value='Action Center'>Action Center</option>");
                    // $('#account_type').html(data);
                 }
                 else if(type == "2"){
                   var  dept = "<label>Position</label><select class='form-control' name='position' required><option value='' disabled selected>Choose</option><option value='FIRE'>FIRE</option><option value='POLICE'>POLICE</option>";
                   var  brgy = "<option value='BAGONGKALSADA'>BAGONG KALSADA</option>" +
                                "<option value='BANADERO'>BAÑADERO</option>"+
                                "<option value='BANLIC'>BANLIC</option>"+
                                "<option value='BARANDAL'>BARANDAL</option>"+
                                "<option value='BATINO'>BATINO</option>"+
                                "<option value='BUBUYAN'>BUBUYAN</option>"+
                                "<option value='BUCAL'>BUCAL</option>"+
                                "<option value='BUNGGO'>BUNGGO</option>"+
                                "<option value='BUROL'>BUROL</option>"+
                                "<option value='CAMALIGAN'>CAMALIGAN</option>"+
                                "<option value='CANLUBANG'>CANLUBANG</option>"+
                                "<option value='HALANG'>HALANG</option>"+
                                "<option value='HORNALAN'>HORNALAN</option>"+
                                "<option value='KAYANLONG'>KAY-ANLONG</option>"+
                                "<option value='LAGUERTA'>LAGUERTA</option>"+
                                "<option value='LAMESA'>LA MESA</option>"+
                                "<option value='LAWA'>LAWA</option>"+
                                "<option value='LECHERIA'>LECHERIA</option>"+
                                "<option value='LINGGA'>LINGGA</option>"+
                                "<option value='LOOC'>LOOC</option>"+
                                "<option value='MABATO'>LOOMABATOC</option>"+
                                "<option value='MAJADALABAS'>MAJADA LABAS</option>"+
                                "<option value='MAKILING'>MAKILING</option>"+
                                "<option value='MAPAGONG'>MAPAGONG</option>"+
                                "<option value='MASILI'>MASILI</option>"+
                                "<option value='MAUNONG'>MAUNONG</option>"+
                                "<option value='MAYAPA'>MAYAPA</option>"+
                                "<option value='MILAGROSA'>MILAGROSA</option>"+
                                "<option value='PACIANORIZAL'>PACIANORIZAL</option>"+
                                "<option value='PALINGON'>PALINGON</option>"+
                                "<option value='PALOALTO'>PALO-ALTO</option>"+
                                "<option value='PANSOL'>PANSOL</option>"+
                                "<option value='PARIAN'>PARIAN</option>"+
                                "<option value='BARANGAY1'>BARANGAY 1</option>"+
                                "<option value='BARANGAY2'>BARANGAY 2</option>"+
                                "<option value='BARANGAY3'>BARANGAY 3</option>"+
                                "<option value='BARANGAY4'>BARANGAY 4</option>"+
                                "<option value='BARANGAY5'>BARANGAY 5</option>"+
                                "<option value='BARANGAY6'>BARANGAY 6</option>"+
                                "<option value='BARANGAY7'>BARANGAY 7</option>"+
                                "<option value='PRINZA'>PRINZA</option>"+
                                "<option value='PUNTA'>PUNTA</option>"+
                                "<option value='PUTINGLUPA'>PUTING LUPA</option>"+
                                "<option value='REAL'>REAL</option>"+
                                "<option value='SAIMSIM'>SAIMSIM</option>"+
                                "<option value='SAMPIRUHAN'>SAMPIRUHAN</option>"+
                                "<option value='SANCRISTOBAL'>SAN CRISTOBAL</option>"+
                                "<option value='SANJOSE'>SAN JOSE</option>"+
                                "<option value='SANJUAN'>SAN JUAN</option>"+
                                "<option value='SIRANGLUPA'>SIRANG LUPA</option>"+
                                "<option value='SUCOL'>SUCOL</option>"+
                                "<option value='TURBINA'>TURBINA</option>"+
                                "<option value='ULANGO'>ULANGO</option>"+
                                "<option value='UWISAN'>UWISAN</option>";
                  
                   $('#position_div').html(dept+brgy);
                }
                else{
                  $('#position_div').html("<label>Position</label><select class='form-control' name='position' required><option value='' disabled selected>Choose</option><option value='ADMIN'>Admin</option>");
                   // $('#account_type').html(data);
                }
                });

  </script>


</body>
</html>
