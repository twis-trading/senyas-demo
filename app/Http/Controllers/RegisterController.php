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
use Illuminate\Support\Facades\Hash;


class RegisterController extends Controller
{
    use AuthenticatesAndRegistersUsers;

    public function registerform(Request $request) {

        if ($request->get('submit')) {
            $rules = array(
                'username' => 'required|max:255|unique:users',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required',

            );
            $validator = \Validator::make(\Input::all(), $rules);
            if ($validator->fails()) {
                return \Redirect::to('/register')
                    ->withErrors($validator) // send back all errors to the login form
                    ->withInput(\Input::except('password')); // send back the input (not the password) so that we can repopulate the form
            }else {

                switch ($request->get('user_type')) {
                  case '0':
                    $user = new User();
                    $user->user_type = $request->get('user_type');
                    $user->fname = 'fname';
                    $user->mname = 'mname';
                    $user->lname = 'lname';
                    $user->street = 'street';
                    $user->barangay = 'barangay';
                    $user->municipality = 'calambago911';
                    $user->province = 'laguna';
                    $user->position = $request->get('position');
                    $user->ass_mun = 'calambago911';
                    $user->username = $request->get('username');
                    $user->password = bcrypt($request->get('password'));
                    $user->email = $request->get('email');
                    // $user->birthdate = $request->get('birthdate');
                    $user->user_tag = '0';
                    $user->save();
                    return redirect("/");

                    break;
                  case '2':
                  if($request->get('position') == "POLICE" || $request->get('position') == "FIRE" || $request->get('position') == "MEDICAL"){
                    $user = new User();
                    $user->user_type = $request->get('user_type');
                    $user->fname = 'fname';
                    $user->mname = 'mname';
                    $user->lname = 'lname';
                    $user->street = 'street';
                    $user->barangay = 'barangay';
                    $user->municipality = 'calambago911';
                    $user->province = 'laguna';
                    $user->position = $request->get('position');
                    $user->ass_mun = 'calambago911';
                    $user->username = $request->get('username');
                    $user->password = bcrypt($request->get('password'));
                    $user->email = $request->get('email');
                    // $user->birthdate = $request->get('birthdate');
                    $user->user_tag = '0';
                    $user->save();
                    return redirect("/");
                  }
                  else{
                    $user = new User();
                    $user->user_type = $request->get('user_type');
                    $user->fname = 'fname';
                    $user->mname = 'mname';
                    $user->lname = 'lname';
                    $user->street = 'street';
                    $user->barangay = 'barangay';;
                    // $user->municipality = $request->get('municipality');
                    $user->municipality = 'calambago911';
                    $user->province = 'laguna';
                    $user->position = $request->get('position');
                    $user->ass_mun = 'calambago911';
                    $user->username = $request->get('username');
                    $user->password = bcrypt($request->get('password'));
                    $user->email = $request->get('email');
                    // $user->birthdate = $request->get('birthdate');
                    $user->user_tag = '1';
                    $user->save();
                    return redirect("/");
                  }
                    break;
                  case '1':
                    $user = new User();
                    $user->user_type = $request->get('user_type');
                    $user->fname = 'fname';
                    $user->mname = 'mname';
                    $user->lname = 'lname';
                    $user->street = 'street';
                    $user->barangay = 'barangay';
                    $user->municipality = 'calambago911';
                    $user->province = 'laguna';
                    $user->position = $request->get('position');
                    $user->ass_mun = 'calambago911';
                    $user->username = $request->get('username');
                    $user->password = bcrypt($request->get('password'));
                    $user->email = $request->get('email');
                    // $user->birthdate = $request->get('birthdate');
                    $user->user_tag = '0';
                    $user->save();
                    return redirect("/");

                    break;
                  default:
                    // code...
                    break;
                }

            }
        }


        return $this->view();


    }


    public function resetpassword(Request $request) {

      if($request->get('submit')) {
        User::where('username', $request->get('username'))->update(['password' => Hash::make($request->get('password'))]);
        return redirect("/");
      }

      return $this->view();
    }

}
