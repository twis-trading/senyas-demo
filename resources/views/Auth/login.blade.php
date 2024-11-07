<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Calambago 911</title>

    <!-- simplebar CSS-->
    <link href="/vendor/dashtreme/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
    <!-- Bootstrap core CSS-->
    <link href="/vendor/dashtreme/assets/css/bootstrap.min.css" rel="stylesheet" />
    <!-- animate CSS-->
    <link href="/vendor/dashtreme/assets/css/animate.css" rel="stylesheet" type="text/css" />
    <!-- Icons CSS-->
    <link href="/vendor/dashtreme/assets/css/icons.css" rel="stylesheet" type="text/css" />
    <!-- Sidebar CSS-->
    <link href="/vendor/dashtreme/assets/css/sidebar-menu.css" rel="stylesheet" />
    <!-- Custom Style-->
    <link href="/vendor/dashtreme/assets/css/app-style.css" rel="stylesheet" />
    <!-- skins CSS-->
    <link href="/vendor/dashtreme/assets/css/skins.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/views/login/index.css">

</head>

<body class="bg-theme bg-theme2">

    <!-- start loader -->
    <div id="pageloader-overlay" class="visible incoming">
        <div class="loader-wrapper-outer">
            <div class="loader-wrapper-inner">
                <div class="loader"></div>
            </div>
        </div>
    </div>
    <!-- end loader -->

    <!-- Start wrapper-->
    <div id="wrapper">
        <div class="loader-wrapper">
            <div class="lds-ring">

            </div>
        </div>




        <!--Start Content -->
        <div class="login__main mx-auto my-5" style="position:relative; top:20vh">
            @if (!Auth::check())
                <div class="card-body">
                    <div class="card-content p-2">
                        <div class="login__logo">
                            <img src="/img/logo.png" class="logo__login" alt="logo icon">
                        </div>
                        <div class="login__title  text-center py-3"> </div>
                        <form id="loginform" class="form-horizontal" role="form" method="POST"
                            action="{{ url('/handlelogin') }}">
                            {{ csrf_field() }}
                            @if (count($errors))
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            <div class="form-group">
                                <!-- <label for="exampleInputUsername" class="sr-only">Username</label> -->
                                <div class="position-relative has-icon-right">
                                    <input type="text" id="username" name="username"
                                        class="form-control input-shadow input" required>
                                        <label id="label_username" class="placeholder">Username</label>
                                    <div class="form-control-position">
                                        <i class="icon-user"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group { $errors->has('password') ? ' has-error' : '' }}">
                                <!-- <label for="exampleInputPassword" class="sr-only">Password</label> -->
                                <div class="position-relative has-icon-right">
                                    <input type="password" name="password" id="password"
                                        class="form-control input-shadow input" required>
                                        <label id="label_password" class="placeholder">Password</label>
                                        <div class="form-control-position">
                                        <i class="icon-lock"></i>
                                    </div>
                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-row">
                                <input id="login" type="submit" value="LOG IN" name="submit"
                                    class="login__button btn btn-info btn-block waves-effect waves-light m-1">
                            </div>

                            <div class="form-group text-center my-4">
                                <a href="/resetpassword">Forgotten password?</a>
                            </div>

                        </form>
                    </div>
                </div>

                {{-- <div class="card-footer text-center py-3">
                    <p class="mb-0">Do not have an account? <a href="/register"> Sign Up here</a></p>
                </div> --}}
            @endif
        </div>

        <!--End Content-->

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
    include '../resources/views/socket.php';
    ?>
    <script src="/js/Auth/login.js"></script>

</body>

</html>
