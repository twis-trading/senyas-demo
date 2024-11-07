<!DOCTYPE HTML>

<html>
    <head>
        <title>CALAMBAGO 911</title>

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
    </head>

    <body onClose="sessionClose()">
        {{--@include('flash::message')--}}
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">New Responder</h4>
                        </div>
                        <div class="modal-body">
                            <input type = "text" id = "fname" class="form-control" placeholder="First Name">
                            <input style = "margin-top:15px;" type = "text" id = "mname" class="form-control" placeholder="Middle Name">
                            <input style = "margin-top:15px;" type = "text" id = "lname"  class="form-control" placeholder="Last Name">
                            <input style = "margin-top:15px;" type = "text" id = "imei"  class="form-control" placeholder="Gadget IMEI" maxlength="15">
                            <select id = "slctdept" style = "margin-top:15px;" name = "department" class="form-control" onchange="populate('slctdept','slcttype')">
                                <option disabled selected value="">Choose Department</option>
                                <!-- <option value="MEDICAL">MEDICAL</option>
                                <option value="FIRE">FIRE</option>
                                <option value="POLICE">POLICE</option> -->
                                <option value="AMBULANCE">AMBULANCE</option>
                                <!-- <option value="MARSHALL">MARSHALL</option>
                                <option value="FIRE AUXILIARY">FIRE AUXILIARY</option> -->


                                <!-- <option value="BARANGAY">BARANGAY</option> -->
                            </select>
                            <select id = "slcttype" style = "margin-top:15px;" name = "type" class="form-control">
                              <option  disabled selected value="">Responder Type</option>
                            </select>
                        </div>
                        <div class="modal-footer">                          
                            <button type="button" name="submit" class="btn btn-info" value="SAVE" onclick="submit1()" data-dismiss="modal">SAVE</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div id="myModal2" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Medical</h4>
                        </div>
                        <div class="modal-body">
                            @foreach($med as $meditem)
                                <button id="1" style = "margin-top:15px;" type="button" name="submit" class="form-control btn-danger" onclick="dispatch(this)" data-dismiss="modal" value ="{{$meditem->barangay}}">{{$meditem->barangay}}</button>
                            @endforeach
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div id="myModal3" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <form method="POST"  accept-charset="UTF-8" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">FIRE</h4>
                        </div>
                        <div class="modal-body">
                            @foreach($fire as $fireitem)
                                <button id="2" style = "margin-top:15px;" type="button" name="submit" class="form-control btn-danger" onclick="dispatch(this)" data-dismiss="modal" value ="{{$fireitem->barangay}}">{{$fireitem->barangay}}</button>
                            @endforeach
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


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
            <div class = "sidebar" style="background:#1e2846">
                <div class = "sidebar-header color1">
                    <span>ALERTS</span>
                </div>
                <div class = "sidebar-alert-container">
                    <div id="alert-container" class = "alert-action"></div>
                    {{-- <div class = "button-container">
                    <button class="btn endtrack-btn" onclick="send()">Request End Tracking</button>
                    </div>--}}
                </div>
                <div class = "sidebar-header color1">
                    <span>On-Going</span>
                </div>
                <div id = "ongoing-container" class = "notif-container">

                </div>
                <div id = "hidden-ongoing-container" class = "notif-container" hidden="hidden">

                </div>
            </div>
            <div class = "map-container" style="background-image: url('/vendor/dashtreme/assets/images/bg-themes/2.png');" >

                <div class = "control-panel">
                  <ul style="margin-top: 17px">
                      <li id="sms-rcvr" title=""><a href="javaScript:void(0)"><i id="sms-receiver" style="color:white" class="fa fa-fw fa-mobile control-panel-item"></i></a></li>
                  </ul>
                    <ul style="margin-top: 0px">
                        <li id="account" title="Account"><a href="/{{$acname}}/appuser"><i id="nottif" class="fa fa-fw fa-user control-panel-item"></i></a></li>
                        <!-- <li title="Logout"><a id="lo" href="/logout"><i class="fa fa-fw fa-times"></i></a></li> -->
                    </ul>
                    <ul style="margin-top: 0px">
                      <li title="Logout"><a id="lo" href="/logout"><i class="fa fa-fw fa-power-off control-panel-item"></i></a></li>
                    </ul>
                </div>

                <div id="map" style="border-radius: 10px; border: 2px solid white"></div>
            </div>
        </div>

       <script src="../js/sweetalert2-8.min.js"></script>

        <!-- lupau -->
        <script>
        var userlogin = '{{Auth::User()->username}}';
        </script>
        <!-- lupau -->
        <script>

            var act_center = '{{$acname}}';
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

            function updatepicture(pic) {
                document.getElementById("image").setAttribute("src", pic);
            }

            function nameee() {
                var x = document.getElementById("file").value;
                document.getElementById("demo").innerHTML = x;
            }

            $('#flash-overlay-modal').modal();
        </script>
                        
        <?php
         include('../resources/views/socket.php');
        ?>
        <script src="/js/ActionCenter/event.js"></script>


        <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script> -->
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAIC8AGTDYajtF7ps1F4BzHSP8o4-W8_I&callback=initMap"> </script>
        <script src="//code.jquery.com/jquery.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>


        <script type="text/javascript">


        $('#confirm').keyup(function(){
                var pass1 = document.forms["cp"]["New_Password"].value;
                var pass2 = document.forms["cp"]["Confirm_Pass"].value;
        // $('#error_pass')
                console.log(pass1);
                console.log(pass2);
                if(pass2 != ""){
                  if(pass2 != pass1){
            // console.log("invalid");
          ///  error_pass = "error";
                  $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
                }
                else{
          //  error_pass = "";
                  $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
                }
              }
              else {
                $('#error_pass').html("");
              }

        });

        $('#newpass').keyup(function(){
                      var pass1 = document.forms["cp"]["New_Password"].value;
                      var pass2 = document.forms["cp"]["Confirm_Pass"].value;
                      // $('#error_pass')
                       console.log(pass1);
                       console.log(pass2);
                      if(pass1 != "" && pass2 != ""){
                        if(pass1 != pass2){
                          // console.log("invalid");
                        ///  error_pass = "error";
                          $('#error_pass').html("<p style='color:red'><i class='fa fa-times-circle fa-fw'></i> Password not match</p>");
                        }
                        else{
                        //  error_pass = "";
                          $('#error_pass').html("<p style='color:green'><i class='fa fa-check-circle fa-fw'></i> Password match</p>");
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
