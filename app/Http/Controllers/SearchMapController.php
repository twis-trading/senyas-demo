<?php

namespace App\Http\Controllers;
//
// use Illuminate\Http\Request;
// use App\Http\Requests;

use Illuminate\Http\Request;
use App\User;
use Validator;
use DB;
use DateTime;
use DateTimeZone;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;



class SearchMapController extends Controller
{
    //

    public function home(Request $request) {
        $this->data['page'] = "home";
        $current_password = \Auth::User()->password;
        $current_user = \Auth::User()->username;

        if($request->get('submit')) {

            /*echo $assmun;*/
            $id = \Auth::user('id')->where('municipality','masa');
            $current_password = \Auth::User()->password;
            /*echo Hash::check($request->get('old_pass'),$current_password);*/
            if(Hash::check($request->get('old_pass'),$current_password)){
                 // echo $current_password;

                if(($request->get('Confirm_Pass')==($request->get('New_Password')))){
                    \Auth::user()
                    ->where('username', $current_user)
                    ->update(['password' => Hash::make($request->get('Confirm_Pass'))
                    ]);

                    /*alert("SUCCESS");*/

                    echo "SUCCESS";
                    return redirect("/logout");

                }
                else{

                      echo "New Password did not match";
                    //Alert::message('New Password did not match!');
                }


                /*\Auth::User('password')->where('municipality',$assmun)->update(['password',Hash::make($request->get('Confirm_Pass')),]);*/

            }
            else{
                /*alert( "Invalid Old Password");*/

                echo "INVALID OLD PASSWORD";
                //Alert::message('Invalid Old Password');
            }
        }

        return $this->view();
    }
}
