<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/login', function () {
    return view('Auth.login')->middleware('guest');
});
Route::post('/handlelogin', ['as' => 'handlelogin', 'uses' => 'AuthController@handleLogin']);
Route::get('/logout', ['as' => 'logout', 'uses' => 'ActionCenterController@logout']);
Route::post('/mobile_upload', 'ActionCenterController@mobile_upload');
$router->group(['middleware' => 'guest'], function () {
    Route::get('/', function () { return view('Auth.login'); });
    Route::any('/register','RegisterController@registerform');
    Route::any('/resetpassword','RegisterController@resetpassword');
});


Route::group(['middleware' => ['ActionCenter']], function () {
    Route::group(['middleware' => ['auth']], function() {
        Route::any('/actioncenter/{assmun}', 'ActionCenterController@homeaction');
        Route::any('/actioncenter/{assmun}/reports', 'ActionCenterController@reports');
        Route::any('/{assmun}/appuser', 'ActionCenterController@mgausers');
        Route::any('/actioncenter/{assmun}/{department}', 'ActionCenterController@department');
        Route::any('/{assmun}/infoblast', 'ActionCenterController@infoblast');
        Route::any('/{assmun}/trackLocation/{imei}', 'TrackLocationController@trackLocation');
        Route::any('/{assmun}/{department}/trackLocationDept/{imei}', 'TrackLocationDeptController@trackLocation');

    });
});

Route::group(['middleware' => ['CommandCenter']], function () {

    Route::group(['middleware' => ['auth']], function() {;
        Route::any('/ADMIN', 'CommandCenterController@home');
        Route::any('/ADMIN/reports/', 'CommandCenterController@reports');
        Route::any('/ADMIN/app_user/', 'CommandCenterController@appUsers');
        Route::any('/ADMIN/logs/','CommandCenterController@logs');
        Route::any('/ADMIN/announcements/','CommandCenterController@announcements');
        Route::any('/ADMIN/upload', 'CommandCenterController@upload')->name('auth.upload');
        Route::any('/ADMIN/responder/', 'CommandCenterController@responder');
        Route::any('/ADMIN/updateApp/', 'CommandCenterController@updateApp');
        Route::any('/ADMIN/uploadapk', 'CommandCenterController@uploadapk')->name('auth.uploadapk');
        Route::any('/ADMIN/point_of_interest/', 'CommandCenterController@pointOfInterest');
        Route::any('/ADMIN/dashboard/', 'CommandCenterController@dashboard');
        Route::any('/ADMIN/map/', 'CommandCenterController@map');

    });
});

Route::group(['middleware' => ['CallCenter']], function () {
    Route::group(['middleware' => ['auth']], function() {
        Route::any('/CALLCENTER', 'SearchMapController@home');
    });
});

Route::any('/503', function(){
    //return view('errors.503');
    return $this->view();
});
