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

  <link href="/vendor/ezdz/jquery.ezdz2.css" rel="stylesheet"/>

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
     include('../resources/views/CommandCenter/nav/navinfoblast.php');
   ?>


<div class="clearfix"></div>

  <div class="content-wrapper">
    <div class="container-fluid">

      <!--Start Content -->
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
         <div class="col-sm-9">
           <h4 class="page-title">Info Blast</h4>
           <ol class="breadcrumb">
             <li class="breadcrumb-item">CalamBago911</a></li>
             <li class="breadcrumb-item">Anouncement</a></li>
             <li id="breadcrumb" class="breadcrumb-item active" aria-current="page">Inbox</li>
          </ol>
        </div>
      </div>
      <!-- End Breadcrumb-->

      <!-- 1st row -->
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <!-- 2nd row-->
              <div class="row">
                <!-- left side bar -->
                <div class="col-lg-12 col-md-12">
                  <button id="compose" type="button" name="create_mail" class="btn btn-success btn-round waves-effect waves-light"><i class="fa fa-plus m-2"></i><span>Compose</span></button>
                  <div class="card mt-3 shadow-none">
                    <div class="list-group shadow-none">
                      <a id="inbox" href="javaScript:void(0)" class="list-group-item active"><i class="fa fa-inbox mr-2"></i> Inbox (0)</a>
                      <a id="attachments" href="javaScript:void(0)" class="list-group-item"><i class="fa fa-paperclip mr-2"></i> Attachments (0)</a>
                      <a id="delete" href="javaScript:void(0)" class="list-group-item"><i class="fa fa-trash-o mr-2"></i> Trash</a>
                    </div>
                  </div>
                </div>
                <!-- End left side bar -->
              </div>
              <!-- End 2nd rowr-->

            </div>
          </div>
        </div>

          <!-- top bar -->
          <div id="right-tab" class="col-lg-8 col-md-8">
          <!-- start div for announcements-div -->
          <div id="announcements-div" class="add-display">
            <div class="row">
              <div class="col-lg-8">
                <div class="btn-group mr-1" style="position:relative; left: 13px">
                    <a id="restore" href="javaScript:void(0)" class="list-group-item" disabled><i class="zmdi zmdi-time-restore-setting"></i></a>
                    <a id="trash" href="javaScript:void(0)" class="list-group-item"><i class="fa fa-trash-o"></i></a>
                </div>
              </div>
            </div>

            <!-- div for table -->
              <div class="col-lg-12">
                <div class="card mt-3 shadow-none">
                  <div class="card-body">

                    <!-- table -->
                    <div class="table-responsive">
                      <table id="example" class="table tblannouncements" style="width:100%;">
                        <thead>
                          <tr style="border: none">
                            <th style="border: none">
                              <div class="icheck-material-primary my-0">
                                  <input id="checkbox" type="checkbox" name="checkall" class="checkall">
                                  <label for="checkbox">Select All
                                  </label>
                              </div>
                            </th style="border: none">
                            <th style="border: none"></th>
                            <th style="border: none"></th>
                            <th style="border: none"></th>
                            <th style="border: none"></th>
                            <th style="border: none"></th>
                          </tr>
                        </thead>
                        <tbody>

                        </tbody>
                      </table>
                    </div>
                    <!-- End tabale -->
                  </div>
                </div>
              </div>
              <!-- end div for table -->

          </div>
          <!-- end div for announcements-div -->

          <!-- start for compose-message-div -->
          <div id="compose-message-div" class="no-display">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header">Compose Message</div>
                  <div class="card-body">
                    <form action="{{ route('auth.upload', 'famy') }}" id="form" method="POST" enctype="multipart/form-data" target="iframe">
                    {{ csrf_field() }}
                    <div class="col-lg-6">
                      <input type="text" id="infoTitle" class="form-control" placeholder="Title">
                    </div>
                    <div class="col-lg-12">
                      <textarea placeholder="Type Content Here." class="form-control" id="infoContent" style = " margin-top:15px; width:  100%; min-height: 30vh; resize: none;"></textarea>
                    </div>

                    <div class="row" id="ezdz-div">
                        <div class="col-lg-4"></div>
                        <div class="col-lg-4">
                          <input type="file" id = "file"  name = "file">
                          <iframe style="display: none;" name = "iframe"></iframe>
                        </div>
                    </div>
                    <br>
                    <!-- <label for="file" class="btn btn-primary" style="cursor:pointer; margin-top:15px;" >Browse For Image</label>
                    <p id="demo"></p>
                    <input class="btn btn-primary" type="file" accept="image/*" id = "file" onchange="nameee()" name = "file" style="display: none;"/>
                    <input style = "margin-top:5px;" type="submit" name="submit6" id="submit6"  class="btn btn-primary" value = "Upload Image" />
                    <p id="message"></p> -->
                    <!-- <center>
                        <img  style = "max-width: 300px; max-height: 300px;" id="image" >
                    </center> -->
                    <p id="message"></p>
                    <button type="submit" id="submit5" name="submit5" class="btn btn-success" value="" onclick="sendInfo()">SEND NEWS</button>
                    <button type="button" id="submit5" name="submit5" class="btn btn-danger" value="" onclick="clearInfo()">Clear</button>
                    </form>
                    <iframe style="display: none;" name = "iframe"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- start for compose-message-div -->
        </div>
          <!-- End top bar -->

      </div>
       <!--End 1st Row-->

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

    <!-- modal Anouncement info-->
      <div class="modal fade" id="infomodal" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Notification Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="row mt-3">
                    <div class="col-lg-6">
                      <div class="form-group">
                          <p id="infotitle"></p>
                      </div>
                      <div class="form-group">
                          <p id="infodate"></p>
                      </div>
                      <div class="form-group">
                          <label>Messae :</label>
                          <p id="infocontent"></p>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-group">
                          <center>
                              <img  style = "width: 300px; height: 300px; border: 1px solid;" id="imgpath">
                          </center>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- end modal Anouncement info-->

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
            <form id="cp" method="POST" accept-charset="UTF-8" enctype="multipart/form-data">
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
  <!--Sweet Alerts -->
  <script src="/vendor/dashtreme/assets/plugins/alerts-boxes/js/sweetalert.min.js"></script>
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

  <script src="/vendor/ezdz/jquery.ezdz.js"></script>
  <!-- server -->
  <?php
     include('../resources/views/socket.php');
  ?>
  <script src="/js/CommandCenter/infoblast.js"></script>


  <script type="text/javascript">

    $(document).ready(function() {

      var table = $('#example').DataTable( {
       "lengthChange": false,
       "ordering": false,
       responsive: true
      });

     } );

     // function nameee() {
     //   console.log("nameee");
     //     var x = document.getElementById("file").value;
     //     document.getElementById("demo").innerHTML = x;
     // }
  </script>

</body>
</html>
