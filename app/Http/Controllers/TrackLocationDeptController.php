<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
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

class TrackLocationDeptController extends Controller
{
    //
    public function trackLocation($assmun, $department, $imei)
    {
        $this->data['acname'] = $assmun;
        $this->data['imei'] = $imei;
        $this->data['dep'] = $department;

        $userid = ActionCenter::select('id')->where('name',$assmun)->get();
        $depid = Department::select('id')->where('department', $department)->get();
        foreach($userid as $t){
            $idd2 =$t->id;
        }
        foreach ($depid as $did){
            $dpid = $did->id;
        }


        //$brgy = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',4)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        //$this->data['brgy'] = $brgy;
		    // $brgy = DB::table('department')->where('id', '>', 3)->where('id', '<', 28)->orderby('department', 'asc')->get();
		    // $this->data['brgy'] = $brgy;
        //
        // $med = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',1)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        // $this->data['med'] = $med;
        //
        // $pnp = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',3)->where('responder.ac_id',$idd)->groupby('barangay.barangay')->orderby('barangay', 'asc')->get();
        // $this->data['pnp'] = $pnp;
        $deptid = DB::table('users')->where('position', $department)->get();
        $this->data['deptid']= $deptid;

        $appuser = App_user::join('alerts','alerts.imei',"=",'app_users.imei')->where('app_users.imei',$imei)->where('alerts.status',0 or 1)->get();
        $this->data['alertinfo']=$appuser;

        $resp2 = Barangay::join('responder','responder.st_id',"=", 'barangay.id')->where('responder.dep_id',$dpid)->where('responder.ac_id',$idd2)->groupby('barangay.id')->orderby('barangay', 'asc')->get();
        $this->data['resp2'] = $resp2;

        return view('TrackLocationDept.trackLocation',$this->data );



    }
}
