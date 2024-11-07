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

  <!--Data Tables -->
  <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css"> -->
  <link href="/vendor/dashtreme/assets/plugins/bootstrap-datatable/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css">
  <link href="/vendor/dashtreme/assets/plugins/bootstrap-datatable/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css">

  <link href="/vendor/dashtreme/assets/plugins/bootstrap-datatable/css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css">

</head>

<body class="bg-theme bg-theme2">

 <!-- start loader -->
   <!-- <div id="pageloader-overlay" class="visible incoming"><div class="loader-wrapper-outer"><div class="loader-wrapper-inner"><div class="loader"></div></div></div></div> -->
  <!-- end loader -->
<!-- Start wrapper-->
 <div id="wrapper">

   <?php
     include('../resources/views/CommandCenter/nav/navreports.php');
   ?>


<div class="clearfix"></div>

  <div class="content-wrapper">
    <div class="container-fluid">

      <!--Start Content -->

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><h3>&nbsp Alert Reports</h3></div>
            <div class="card-body">

              <div class="table-responsive">
                <table id="example" class="table table-bordered tblreports" style="width:100%">
                  <thead>
                    <tr>
                      <th>imei</th>
                      <th>Name</th>
                      <th>Alert Type</th>
                      <th>location</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Address</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>

                  </tbody>

                </table>
              </div>

            </div>

          </div>

        </div>
       </div>

       <!--End Row-->
       <div class="modal fade" id="largesizemodal" role="dialog">
         <div class="modal-dialog modal-lg modal-dialog-centered">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title">Alert Info</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">

              <div class="row mt-3">

               <div class="col-12 col-lg-6 col-xl-6">
                   <form>
                     <div class="form-group">
                       <label for="apk_user">Name</label>
                       <p id="apk_user"></p>
                     </div>
                     <div class="form-group">
                       <label for="alert_type">Alerty Type</label>
                       <p id="alert_type"></p>
                     </div>
                     <div class="form-group" id="incident_div">
                       <label for="incident">Incident</label>
                       <p id="incident"></p>
                     </div>
                     <div class="form-group">
                       <label for="user">Command Center</label>
                       <p id="user"></p>
                     </div>
                     <div class="form-group">
                       <table>
                         <tr>
                           <td style="vertical-align: top">
                             <p style="font-weight: bold">Responder: &nbsp &nbsp &nbsp</p>
                           </td>
                           <td style="vertical-align: top"  id="IDOL">
                           </td>
                         </tr>
                       </table>
                     </div>
                     <div class="form-group">
                       <label for="patient">Patient</label>
                       <p id="patient"></p>
                     </div>
                     <div class="form-group">
                       <label for="patient-status">Patient Status</label>
                       <p id="patient-status"></p>
                     </div>
                     <div class="form-group">
                       <label for="hospital">Hospital</label>
                       <p id="hospital"></p>
                     </div>
                     <div class="form-group">
                       <label for="remarks">Remarks</label>
                       <p id="remarks"></p>
                     </div>
                   </form>
               </div>

               <div class="col-12 col-lg-6 col-xl-6">
                 <form>
                   <div class="form-group">
                       <center>
                           <img  style = "width: 300px; height: 300px; border: 1px solid" id="imgpath">
                       </center>
                   </div>
                 </form>
               </div>

               </div>
            </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-info"></i> Download</button>
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

    <!-- modal report info-->

    <!-- end modal report info-->

    <!-- change pass modal -->
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
    <!-- end of change pass modal -->

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

  <!--Data Tables js-->
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/jquery.dataTables.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/dataTables.bootstrap4.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/dataTables.buttons.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/buttons.bootstrap4.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/jszip.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/pdfmake.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/vfs_fonts.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/buttons.html5.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/buttons.print.min.js"></script>
  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/buttons.colVis.min.js"></script>

  <script src="/vendor/dashtreme/assets/plugins/bootstrap-datatable/js/dataTables.responsive.min.js"></script>

  <script src="/dist/js/filesaver.min.js"></script>
  <script src="/dist/js/dom-to-image.min.js"></script>
  
  <!-- server -->
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="/js/CommandCenter/reports.js"></script>


  <script type="text/javascript">

    $(document).ready(function() {

      var table = $('#example').DataTable( {
       "lengthChange": true
      });

     } );
  </script>

</body>
</html>
