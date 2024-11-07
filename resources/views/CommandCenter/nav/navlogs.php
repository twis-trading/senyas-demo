<!--Start sidebar-wrapper-->
   <div id="sidebar-wrapper" style="background-color: #1e2846">
     <div class="brand-logo" style="border: none">
      <a href="/">
       <img src="/img/logo2.png" class="logo-icon" alt="logo icon">
       <!-- <h5 class="logo-text">Admin</h5> -->
     </a>
   </div>
   <ul class="sidebar-menu do-nicescrol">
      <li class="sidebar-header dashtreme-border-top">MAIN NAVIGATION</li>
      <li class="dashtreme-border">
        <a href="/ADMIN/dashboard">
          <i class="zmdi zmdi-view-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>

      <li class="dashtreme-border-bot">
        <a href="/ADMIN/app_user/">
          <i class="zmdi zmdi-accounts-alt"></i> <span>App Users</span>
          <small class="badge float-right badge-light" id="pending_request"></small>
        </a>
      </li>

      <li class="dashtreme-border-bot">
        <a href="/ADMIN/reports/">
          <i class="zmdi zmdi-assignment"></i> <span>Reports</span>
        </a>
      </li>

      <li class="active dashtreme-border-bot">
        <a href="/ADMIN/logs/">
          <i class="zmdi zmdi-assignment-account"></i> <span>Logs</span>
        </a>
      </li>

      <li class="dashtreme-border-bot">
        <a href="/ADMIN/map/">
          <i class="zmdi zmdi-google-maps"></i> <span>Map</span>
        </a>
      </li>

      <!-- <li class="dashtreme-border-bot">
        <a href="/ADMIN/point_of_interest/">
          <i class="zmdi zmdi-videocam"></i> <span>CCTV Mapping</span>
        </a>
      </li> -->

      <li class="dashtreme-border-bot">
        <a href="/ADMIN/announcements/">
          <i class="zmdi zmdi-info-outline"></i> <span>Info Blast</span>
        </a>
      </li>

      <li class="dashtreme-border-bot">
        <a href="/ADMIN/updateApp/">
          <i class="zmdi zmdi-android"></i> <span>Update</span>
        </a>
      </li>

       <li>
        <a href="/logout">
          <i class="icon-power"></i> <span>Logout</span>
        </a>
      </li>
    </ul>

   </div>
   <!--End sidebar-wrapper-->

   <!--Start topbar header-->
<header class="topbar-nav">
 <nav class="navbar navbar-expand fixed-top" style="background-color: #1e2846">
  <ul class="navbar-nav mr-auto align-items-center">
    <li class="nav-item">
      <a class="nav-link toggle-menu" href="javascript:void();">
       <i class="icon-menu menu-icon"></i>
     </a>
    </li>
  </ul>

  <ul class="navbar-nav align-items-center right-nav-link">
    <li class="nav-item">
      <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
        <span class="user-profile"><img src="/img/user_profile.png" class="img-circle" alt="user avatar"></span>
      </a>
      <ul class="dropdown-menu dropdown-menu-right">
       <li class="dropdown-item user-details">
        <a href="javaScript:void();">
           <div class="media">
             <div class="avatar"><img class="align-self-start mr-3" src="/img/user_profile.png" alt="user avatar"></div>
            <div class="media-body">
            <h6 class="mt-2 user-title">Admin</h6>
            <p class="user-subtitle">CALAMBAGO 911</p>
            </div>
           </div>
          </a>
        </li>
        <li class="dropdown-divider"></li>
        <li class="dropdown-item user-pointer" data-toggle="modal" data-target="#myModal1"><i class="zmdi zmdi-lock mr-2"></i> Change Password</li>
        <li class="dropdown-divider"></li>
        <a href="/logout">
        <li class="dropdown-item"><i class="icon-power mr-2"></i> Logout</li>
        </a>
      </ul>
    </li>
  </ul>
</nav>
</header>



<!--End topbar header-->
