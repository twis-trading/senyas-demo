<!DOCTYPE html>
<html>
<head>
     <title>CALAMBAGO 911</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <link href="/css/style.css" rel="stylesheet" type="text/css">
    <link href="/css/tracklocation.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">

</head>

<body>
        <!-- Modal-->
        <div class="modal fade" id="alertModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                        <h4 class="modal-title" id="mt"></h4>

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

<div class = "flex-container">
    <div class = "sidebar-track" style="background:#1e2846">
        <div class = "dispatch-sidebar-header color1">
            <span>Alert Info</span>
        </div>
        <div class = "dispatch2" style="background:#1e2846; color: white">
            <div class = "center container" style="padding:10px">
                <div>
                  @foreach($alertinfo as $alertinfo1)
                  <span class="h5">Name: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{$alertinfo1->fname}} {{$alertinfo1->mname}} {{$alertinfo1->lname}}</span><br>
                  <span class="h5">Address: &nbsp &nbsp &nbsp {{$alertinfo1->barangay}},{{$alertinfo1->municipality}} {{$alertinfo1->province}}</span><br>
                  <span class="h5">Contact: &nbsp &nbsp &nbsp {{$alertinfo1->contact}}</span><br>
                  <span class="h5">Alert Type:&nbsp {{$alertinfo1->alert_type}}</span><br>
                  @if($alertinfo1->alert_type=="POLICE")
                  <span class="h5">Incident: &nbsp &nbsp &nbsp {{$alertinfo1->incident}}</span><br>
                  @endif

                  <span class="h5">Time: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{$alertinfo1->time}}</span><br>

                  @endforeach
                </div>
            </div>
            </div>
        <div class = "dispatch-sidebar-header color1">
            <span>Request</span>
        </div>
        <div class = "sidebar-alert-brgy">
          <div  class = "alert-brgy1" style="background:#1e2846">
          <li> <a id ="arrivalTime" onClick="arrivalTime()" name="" class="btn btn-info alert-brgy1-btn" value="">ARRIVAL</a></li>
        </div>
        <div  class = "alert-brgy1" style="background:#1e2846">
          <li> <a id ="endtrack" onClick="endtrack()" name="" class="btn btn-info alert-brgy1-btn" value="">END TRACKING</a></li>
          </div>
          {{--     @foreach($resp2 as $item)
                 @if($item->status=="active")
                      <div  class = "alert-brgy1">
                          <li> <a id ="{{$item->id}}" onClick="dispatch2(this)" name="{{$item->dept_id}}" class="btn btn-info alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                      </div>
                 @elseif($item->status=="occupied")
                      <div  class = "alert-brgy1">
                          <li> <a id ="{{$item->id}}" onClick="dispatch2(this)" name="{{$item->dept_id}}" class="btn btn-success alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                      </div>
                 @else
                      <div  class = "alert-brgy1">
                          <li> <a id ="{{$item->id}}" onClick="dispatch2(this)" name="{{$item->dept_id}}" class="btn btn-danger alert-brgy1-btn" value="{{$item->barangay}}">{{$item->barangay}}</a></li>
                      </div>
                 @endif
              @endforeach --}}


                @foreach($deptid as $deptid1)

                @endforeach
                @foreach($alertinfo as $alertinfo2)
                    <input id="appusers" type="text" name="" value="{{$alertinfo2->fname}} {{$alertinfo2->mname}} {{$alertinfo2->lname}}" hidden="hidden">
                  @endforeach
          </div>

    </div>
    <div class = "map-container-track" style="background-image: url('/vendor/dashtreme/assets/images/bg-themes/2.png');">

        <div id="map" style="border-radius: 10px; border: 2px solid white">
        </div>

    </div>
    <script src="//code.jquery.com/jquery.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <script>

       var imei = '{{$imei}}';
       var act_center = '{{$acname}}';
       var dept = '{{$dep}}';
       // var deptid = '{{$deptid1->id}}';
       // console.log(deptid);
       var appuser = document.getElementById("appusers").value;;
       console.log(appuser);
       console.log({{$imei}});
    </script>
    <script>  $('#flash-overlay-modal').modal();</script>
    <!-- <script src="/js/dept.js"></script> -->
    <?php
      include('../resources/views/socket.php');
    ?>
    <script src="/js/trackdept.js"></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script>
</body>


</html>
