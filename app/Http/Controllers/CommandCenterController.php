<?php namespace App\Http\Controllers;
/**
 * Created by PhpStorm.
 * User: ADSOPH CROWN
 * Date: 4/7/2017
 * Time: 4:56 PM
 */
use Illuminate\Http\Request;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Department;
use App\Responder_response;
use App\Alerts;
use App\Alerts_ac;
use App\ActionCenter;
use App\App_user;
use DB;
use App\Barangay;
use Illuminate\Support\Facades\Hash;

class CommandCenterController extends Controller
{

    public function home(Request $request) {

        $this->data['page'] = "home";

        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        $this->data['current_password'] = $current_password;
        return $this->view();




    }

      public function call() {
            $this->data['page'] = "home";
            return $this->view();
      }

      public function announcements(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function pointOfInterest(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function dashboard(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function appUsers(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function reports(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function map(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function updateApp(Request $request){
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }
        return $this->view();
      }

      public function responder() {
        $this->data['page'] = "home";

        $marshall = Barangay::where('ac_id', 1)->where('dept_id', 4)->where('status', 0)->orderby('barangay', 'asc')->get();
        $this->data['marshall'] = $marshall;

        $fireaux = Barangay::where('ac_id', 1)->where('dept_id', 5)->where('status', 0)->orderby('barangay', 'asc')->get();
        $this->data['fireaux'] = $fireaux;

        $ambulance = Barangay::where('ac_id', 1)->where('dept_id', 6)->where('status', 0)->orderby('barangay', 'asc')->get();
        $this->data['ambulance'] = $ambulance;
        return $this->view();
      }

      public function upload(){
        $this->data['acmun']="calambago911";
        if($_FILES['file']['size']>0){
            if($_FILES['file']['size']<=500000000){
                if(move_uploaded_file($_FILES['file']['tmp_name'],public_path('img')."/".$_FILES['file']['name'])){
                    $publicpath = public_path('img')."/".$_FILES['file']['name'];
                    $this->data['publicpath']= $publicpath;
                    ?>
                    <script type="text/javascript">

                        parent.document.getElementById("message").innerHTML="";
                        parent.document.getElementById("file").value="";
                        window.parent.uploadedfile("Announcement Sent!");
                    </script>
                    <?php
                  }
              }
          }
      }


      public function uploadapk(){
        $this->data['acmun']="calambago911";
        if($_FILES['file']['size']>0){
            if($_FILES['file']['size']<=500000000){
                if(move_uploaded_file($_FILES['file']['tmp_name'],public_path('img')."/".$_FILES['file']['name'])){
                    $publicpath = public_path('img')."/".$_FILES['file']['name'];
                    $this->data['publicpath']= $publicpath;
                    ?>
                    <script type="text/javascript">
                        parent.document.getElementById("message").innerHTML="";
                        parent.document.getElementById("file").value="";
                        window.parent.uploadedapk("Successfully uploaded apk!");
                    </script>
                    <?php
                  }
              }
          }
      }

      public function logs(Request $request) {
        $activity_logs = DB::table('activity_logs')->orderBy('id', 'desc')->get();
        $this->data['activity_logs'] = $activity_logs;

        // $users1 = User::where('user_type','=', 0)->orderBy('username', 'asc')->get();
        // $this->data['users1'] = $users1;

        $userson = User::where('user_tag','=', 0)->where('user_type','!=', 1)->where('log_status','=','online')->orderBy('username', 'asc')->get();
        $this->data['userson'] = $userson;

        $usersoff = User::where('user_tag','=', 0)->where('user_type','!=', 1)->where('log_status','=','offline')->orderBy('username', 'asc')->get();
        $this->data['usersoff'] = $usersoff;


        $brgyon = User::where('user_tag','=', 1)->where('log_status','=','online')->orderBy('username', 'asc')->get();
        $this->data['brgyon'] = $brgyon;

        $brgyoff = User::where('user_tag','=', 1)->where('log_status','=','offline')->orderBy('username', 'asc')->get();
        $this->data['brgyoff'] = $brgyoff;


        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {
            $id = \Auth::user('id')->where('municipality','calambago911');
            $current_password = \Auth::User()->password;
            if(Hash::check($request->get('old_pass'),$current_password)){
                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);
                    echo "SUCCESS";
                    return redirect("/logout");
                }
                else{
                      echo "New Password did not match";
                }
            }
            else{
                echo "INVALID OLD PASSWORD";
            }
        }

        return $this->view();
      }




}
