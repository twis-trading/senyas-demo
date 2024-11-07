<!DOCTYPE HTML>

<html>
<head>
    <script src="//code.jquery.com/jquery.js"></script>
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" >
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <title>CALAMBAGO 911</title>
    <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <link href="/css/style.css" rel="stylesheet" type="text/css">
    <link href="/css/actioncenter.css" rel="stylesheet" type="text/css">
    {{-- <link href="../css/tracklocation.css" rel="stylesheet" type="text/css">--}}
    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">
    <meta http-equiv="Content-Security-Policy" content="default-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *; img-src * data: 'unsafe-inline'">

</head>

<body>

        <div class="modal fade" id="alertModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="mt"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p id="mc"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

<div id="myModal1" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
        <form id="cp" method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
                    <!-- Modal content-->
            <div class="modal-content" style="background-color:#1e2846; color: #ffff">
                <div class="modal-header">
                    <button style="color: #ffff" type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New Password</h4>
                </div>
                <div class="modal-body">
                    <label>Old Password</label>
                    <input type = "password" name = "old_pass" class="form-control" placeholder="Type Old Password" required>
                    <label style = "margin-top:15px;">New Password</label>
                    <input id="newpass" type = "password" name = "New_Password" class="form-control" placeholder="New Password" required>
                    <label style = "margin-top:15px;">Confirm Password</label>
                    <input id="confirm" type = "password" name = "Confirm_Pass"  class="form-control" placeholder="Confirm New Password" required>
                    <div id="error_pass">
                    </div>
                </div>
                <div class="modal-footer">
                    <input id="savebtn" type="submit" name="submit" class="btn btn-info" value="SAVE" disabled>
                </div>
            </div>
        </form>
    </div>
</div>



<div class = "flex-container">
    <div class = "sidebar" style="background:#1e2846">
        <div class = "sidebar-header color1">
            <span>ALERTS</span>
        </div>
        {{--<div id="alert-container" class = "notif-container">
        </div>--}}
        <div class = "sidebar-alert-container">
            <div id="alert-container" class = "alert-action">
            </div>
        </div>
        <div class = "sidebar-header color1">
            <span>On-Going</span>
        </div>
        <div id = "ongoing-container" class = "notif-container">

        </div>

    {{--   <div class = "sidebar-alert-brgy">
      @foreach($resp as $item)
               @if($item->status=="active")
                    <div  class = "alert-brgy1">
                        <li> <a id ="{{$item->id}}" onClick="dispatch(this)" name="{{$item->dept_id}}" class="btn btn-info alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                    </div>
               @elseif($item->status=="occupied")
                    <div  class = "alert-brgy1">
                        <li> <a id ="{{$item->id}}" onClick="dispatch(this)" name="{{$item->dept_id}}" class="btn btn-success alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                    </div>
               @else
                    <div  class = "alert-brgy1">
                        <li> <a id ="{{$item->id}}" onClick="dispatch(this)" name="{{$item->dept_id}}" class="btn btn-danger alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                    </div>
               @endif



            @endforeach
        </div> --}}




    </div>
    <div class = "map-container" style="background-image: url('/vendor/dashtreme/assets/images/bg-themes/2.png');">
        <div class = "control-panels">
            <ul style="margin-top: 17px">
                <li title="Change Password" style="cursor:pointer"><a  ><i class="fa fa-fw fa-lock control-panel-item" data-toggle="modal" data-target="#myModal1"></i></a></li>
            </ul>
            <ul style="margin-top: 0px">
                <li title="Logout"><a href="/logout"><i class="fa fa-fw fa-power-off control-panel-item"></i></a></li>
            </ul>
        </div>

        <div id="map" style="border-radius: 10px; border: 2px solid white"></div>



    </div>
</div>

<script> var act_center = '{{$acname}}'
        var dept = '{{$dep}}'
</script>

<?php
    include('../resources/views/socket.php');
?>
<script src="/js/ActionCenter/dept.js"></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script>

<script type="text/javascript">
$('#confirm').keyup(function(){
        var pass1 = document.forms["cp"]["New_Password"].value;
        var pass2 = document.forms["cp"]["Confirm_Pass"].value;
        console.log(pass1);
        console.log(pass2);
        if(pass2 != ""){
          if(pass2 != pass1){
            $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
            $("#savebtn").removeAttr('disabled');
            $("#savebtn").attr('disabled', true);
        }
        else{
            $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
            $("#savebtn").removeAttr('disabled');
        }
      }
      else {
        $('#error_pass').html("");
      }
});
$('#newpass').keyup(function(){
        var pass1 = document.forms["cp"]["New_Password"].value;
        var pass2 = document.forms["cp"]["Confirm_Pass"].value;
        console.log(pass1);
        console.log(pass2);
        if(pass1 != "" && pass2 != ""){
          if(pass1 != pass2){
            $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
            $("#savebtn").removeAttr('disabled');
            $("#savebtn").attr('disabled', true);
        }
        else{
            $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
            $("#savebtn").removeAttr('disabled');
          }
        }
        else {
            $('#error_pass').html("");
              document.forms["cp"]["Confirm_Pass"].value = "";
       }
});

</script>

</body>
</html>
