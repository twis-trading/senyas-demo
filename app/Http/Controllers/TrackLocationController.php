<?php namespace App\Http\Controllers;
/**
 * Created by PhpStorm.
 * User: ADSOPH CROWN
 * Date: 4/11/2017
 * Time: 3:29 PM
 */
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\File;

use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Department;
use App\Responder_response;
use App\Alerts;
use App\Barangay;
use App\App_user;
use App\Alerts_ac;
use App\ActionCenter;
use DB;

class TrackLocationController extends Controller
{

    public function trackLocation($assmun, $imei)
    {
        $this->data['acname'] = $assmun;
        $this->data['imei'] = $imei;

        $userid = ActionCenter::select('id')->where('name',$assmun)->get();


        foreach($userid as $t){

            $idd =$t->id;

        }


        //$brgy = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',4)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        //$this->data['brgy'] = $brgy;
		    $brgy = DB::table('department')->where('id', '>', 3)->where('id', '<', 4)->orderby('department', 'asc')->get();
		    $this->data['brgy'] = $brgy;

        $userspnp = DB::table('users')->where('position', 'POLICE')->orderBy('username', 'asc')->get();
        $this->data['userspnp'] = $userspnp;

        $usersfire = DB::table('users')->where('position', 'FIRE')->orderBy('username', 'asc')->get();
        $this->data['usersfire'] = $usersfire;

        $usersbrgy = $usersfire = DB::table('users')->where('user_tag', 1)->orderBy('username', 'asc')->get();
        $this->data['usersbrgy'] = $usersbrgy;

        $med = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',5)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        $this->data['med'] = $med;

        $pnp = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',3)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        $this->data['pnp'] = $pnp;

        $marshall = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',4)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        $this->data['marshall'] = $marshall;

        $ambulance = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',6)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        $this->data['ambulance'] = $ambulance;

        $appuser = App_user::join('alerts','alerts.imei',"=",'app_users.imei')->where('app_users.imei',$imei)->where('alerts.status',0 or 1)->get();
        $this->data['alertinfo']=$appuser;
        return $this->view();

    }


}
