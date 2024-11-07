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
    <style>
      #alert_text{
        font-size: 1vw;
        /* position: relative;
        left: 1vw; */
        transform: translate(20px, 202px);
        font-size: 1vw;
        fill: #000;
      }

      .disabled-dv{
        pointer-events:none;
      }

    </style>
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


<div id="myModalAmbulance" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">AMBULANCE</h4>
                </div>
                <div class="modal-body">
                    @foreach($ambulance as $meditem)
                        @if($meditem->status=="active")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}r" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-info alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @elseif($meditem->status=="occupied")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}r" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-success alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @else
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}r" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-danger alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="myModalFireAux" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">FIRE AUXILIARY</h4>
                </div>
                <div class="modal-body">
                    @foreach($med as $meditem)
                        @if($meditem->status=="active")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-info alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @elseif($meditem->status=="occupied")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-success alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @else
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-danger alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>
<div id="myModalMarshall" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">MARSHALL</h4>
                </div>
                <div class="modal-body">
                    @foreach($marshall as $meditem)
                        @if($meditem->status=="active")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-info alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @elseif($meditem->status=="occupied")
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-success alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @else
                            <div  class = "alert-brgy1">
                                <li> <a id ="{{$meditem->id}}" onClick="dispatch(this)" name="{{$meditem->dept_id}}" class = "btn btn-danger alert-brgy1-btn " value="{{$meditem->barangay}}">{{$meditem->barangay}}</a></li>
                            </div>
                        @endif
                    @endforeach
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="offline" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Department is Offline.</h4>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="offline2" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
            {{ csrf_field() }}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Barangay is Offline.</h4>
                </div>
            </div>
        </form>
    </div>
</div>



        <!-- <div id="myModal3" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                    {{ csrf_field() }}

                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">POLICE</h4>
                        </div>
                        <div class="modal-body">
                            @foreach($pnp as $pnpitem)

                                @if($pnpitem->status=="active")
                                    <div  class = "alert-brgy1">
                                        <li> <a id ="{{$pnpitem->id}}" onClick="dispatch(this)" name="{{$pnpitem->dept_id}}" class = "btn btn-info alert-brgy1-btn " value ="{{$pnpitem->barangay}}">{{$pnpitem->barangay}}</a></li>
                                    </div>
                                @elseif($pnpitem->status=="occupied")
                                    <div  class = "alert-brgy1">
                                        <li> <a id ="{{$pnpitem->id}}" onClick="dispatch(this)" name="{{$pnpitem->dept_id}}" class = "btn btn-success alert-brgy1-btn " value ="{{$pnpitem->barangay}}">{{$pnpitem->barangay}}</a></li>
                                    </div>
                                @else
                                    <div  class = "alert-brgy1">
                                        <li> <a id ="{{$pnpitem->id}}" onClick="dispatch(this)" name="{{$pnpitem->dept_id}}" class = "btn btn-danger alert-brgy1-btn " value ="{{$pnpitem->barangay}}">{{$pnpitem->barangay}}</a></li>
                                    </div>
                                @endif

                            @endforeach
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> -->


<div class = "flex-container">
    <div class = "sidebar-track">
        <div class = "dispatch-sidebar-header color1">
            <span>Alert Info</span>
        </div>
        <div class = "dispatch2" style="height:23vh;overflow: hidden;background:#1e2846; color:#ffff">
            <div class = "center container" style="padding:1px">
                <div id="div_alert" style="width:24.9vw; height: 22vh;">
                    @foreach($alertinfo as $alertinfo1)
                    <span class="" id="alert_text" style="margin-left: 10px">Name: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{$alertinfo1->fname}} {{$alertinfo1->mname}} {{$alertinfo1->lname}}</span><br>
                    <!-- <div class="" id="div_text" style="width:1vw"> -->
                    <!-- <span class="" id="alert_text2">Address: &nbsp &nbsp &nbsp {{$alertinfo1->barangay}},{{$alertinfo1->municipality}} {{$alertinfo1->province}}</span><br> -->
                    <!-- </div> -->
                    <span class="" id="alert_text" style="margin-left: 10px">Address: &nbsp &nbsp &nbsp {{$alertinfo1->barangay}},{{$alertinfo1->municipality}} {{$alertinfo1->province}}</span><br>
                    <span class="" id="alert_text" style="margin-left: 10px">Contact: &nbsp &nbsp &nbsp {{$alertinfo1->contact}}</span><br>
                    <span class="" id="alert_text" style="margin-left: 10px">Alert Type:&nbsp {{$alertinfo1->alert_type}}</span><br>
                    @if($alertinfo1->alert_type=="POLICE")
                    <span class="" id="alert_text" style="margin-left: 10px">Incident: &nbsp &nbsp &nbsp {{$alertinfo1->incident}}</span><br>
                    @endif

                    <span class="" id="alert_text" style="margin-left: 10px">Time: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp {{$alertinfo1->time}}</span><br>

                    @endforeach
                </div>
            </div>
            </div>
        <div  class = "dispatch-sidebar-header color1">
            <span>Dispatch</span>
        </div>
        <div class = "dispatch" id="dispatch" style="background:#1e2846" >
            <div class = "center checkboxes">
                <li><a  id='medical' data-toggle="modal" data-target="#myModalAmbulance" class="btn btn-info dispatch-btn"><img src = "/img/medical.png" class = "img-responsive"/><span>AMBULANCE</span></a></li>
                <!-- <li><a  id='medical' onClick="sendToDept(this)" class="btn btn-danger dispatch-btn"><img src = "/img/medical.png" class = "img-responsive"/><span>AMBULANCE</span></a></li> -->
            </div>
            <!-- <div class = "center checkboxes">
              <li><a  id='marshall' data-toggle="modal" data-target="#myModalMarshall" class="btn btn-info dispatch-btn"><img src = "/img/police.png" class = "img-responsive"/><span>Marshall</span></a></li>
            </div>
            <div class = "center checkboxes">
              <li><a  id='fireaux'   data-toggle="modal" data-target="#myModalFireAux" class="btn btn-info dispatch-btn"><img src = "/img/fire.png" class = "img-responsive"/><span>Fire Auxiliary</span></a></li>
            </div> -->
            @foreach($userspnp as $item)
                @if($item->log_status=="online")
                <div class = "center checkboxes">
                   <li> <a  id='{{$item->position}}' onClick="sendToDept(this)" class="btn btn-info dispatch-btn">  <img src = "/img/police.png" class = "img-responsive"/> <span>PNP</span> </a> </li>
                </div>
                @elseif($item->log_status=="offline")
                <div class = "center checkboxes">
                   <li> <a  id='{{$item->position}}' data-toggle="modal" data-target="#offline" class="btn btn-danger dispatch-btn">  <img src = "/img/police.png" class = "img-responsive"/> <span>PNP</span> </a> </li>
                </div>
                @endif
            @endforeach
            @foreach($usersfire as $item)
                @if($item->log_status=="online")
                <div class = "center checkboxes">
                  <li><a  id='{{$item->position}}'   onClick="sendToDept(this)" class="btn btn-info dispatch-btn"><img src = "/img/fire.png" class = "img-responsive"/><span>BFP</span></a></li>
                </div>
                @elseif($item->log_status=="offline")
                <div class = "center checkboxes">
                  <li><a  id='{{$item->position}}'   data-toggle="modal" data-target="#offline" class="btn btn-danger dispatch-btn"><img src = "/img/fire.png" class = "img-responsive"/><span>BFP</span></a></li>
                </div>
                @endif
            @endforeach
        </div>
        <div class = "dispatch-sidebar-header color1" >
            <span>BARANGAY</span>
        </div>

        <div class = "dispatch " style="height:17vh; background:#1e2846">
            <div class = "center checkboxes">
          @foreach($usersbrgy as $item)
              @if($item->log_status=="online")
              <div class = "alert-brgy1">
                <li ><a  id='{{$item->position}}'   onClick="sendToDept(this)" class="btn btn-info alert-brgy1-btn"><span style="font-size: 20px;">{{$item->position}}</span></a></li>
              </div>
              @elseif($item->log_status=="offline")
              <div class = "alert-brgy1">
                <li ><a  id='{{$item->position}}'   data-toggle="modal" data-target="#offline2" class="btn btn-danger alert-brgy1-btn"><span style="font-size: 20px;">{{$item->position}}</span></a></li>
              </div>
              @endif
          @endforeach


            {{-- <div class = "button-container nopadding">
                 <button class="btn dispatch-btn" onclick="send()">Alert Action Centers</button>
             </div>--}}
        </div>

      </div>
    </div>
    <div class = "map-container-track" style="background-image: url('/vendor/dashtreme/assets/images/bg-themes/2.png');">

        <div class = "endbtn1 disabled-dv" id = "endbtn1">
            <ul>
                <li> <a  id='END' onClick="end()" class="btn btn-danger"><span>END TRACKING</span><img src = "/img/end.png" /></a></li>
            </ul>
        </div>

        <div id="map" style="border-radius: 10px; border: 2px solid white"></div>



       {{-- <div  class = "incident-timeline">
            <div class = "info-header" id = "details-header">
                <span>Incident Timeline</span>
            </div>
            <div id ="incident-timeline-content">
                <table id="incident-timeline-table" class = "compact row-border">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>17:55</td>
                            <td>Emergency Alarm Received</td>
                            <td>Caller</td>
                        </tr>
                        <tr>
                            <td>17:56</td>
                            <td>Emergency Team Dispatched</td>
                            <td>Response Team</td>
                        </tr>
                        <tr>
                            <td>17:58</td>
                            <td>Location Changed</td>
                            <td>Caller</td>
                        </tr>
                        <tr>
                            <td>17:59</td>
                            <td>Location Changed</td>
                            <td>Caller</td>
                        </tr>
                        <tr>
                            <td>18:02</td>
                            <td>Location Changed</td>
                            <td>Caller</td>
                        </tr>
                        <tr>
                            <td>18:03</td>
                            <td>Rescue Team Arrival</td>
                            <td>Response Team</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>--}}
        @foreach($alertinfo as $alertinfo2)
            <input id="appusers" type="text" name="" value="{{$alertinfo2->fname}} {{$alertinfo2->mname}} {{$alertinfo2->lname}}" hidden="hidden">
          @endforeach
    </div>
    <script src="https://code.jquery.com/jquery.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

     <!-- Bootstrap core JavaScript-->
    <!-- <script src="/vendor/dashtreme/assets/js/jquery.min.js"></script>
    <script src="/vendor/dashtreme/assets/js/popper.min.js"></script>
    <script src="/vendor/dashtreme/assets/js/bootstrap.min.js"></script> -->
  

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script>
       var imei = '{{$imei}}';
       var act_center = '{{$acname}}';
       var appuser = document.getElementById("appusers").value;;
       console.log(appuser);
       console.log({{$imei}});
       // var marshall = '{{$marshall}}';
       // console.log({{$marshall}});

    </script>
    <script>  $('#flash-overlay-modal').modal();</script>
    <?php
      include('../resources/views/socket.php');
    ?>
    <script src="/js/track.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script>
</body>


</html>
