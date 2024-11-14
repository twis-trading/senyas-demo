const pool = require('../config/database.js');

module.exports = (socket) => {

    // appuser
    socket.on('get_pending_request', onGetPendingRequest);
    socket.on('admin_send_confirm', onAdminSendConfirms);
    socket.on('admin_deactivate_user', onAdminDeactivateUser);
    socket.on('admin_delete_user', onAdminDeleteUser);

    // dashboard
    socket.on('get_total_user', onGetTotalUser);
    socket.on('get_latest_version', onGetLatestVersion);

    // infoblast
    socket.on('get_notif', onGetNotif);
    socket.on('notif_trash', onTrashNotif);
    socket.on('notif_delete', onDeleteNotif);
    socket.on('restore_trash_notif', onRestoreTrashNotif)
    socket.on('send_notification', onSendNotification);
    socket.on('notif_details', onGetNotifDetails);

    // logs
    socket.on('get_activity_logs', ongetActivityLogs);
    socket.on('get_accounts', onGetAccounts);
    socket.on('activate_account', onActivateAccount);
    socket.on('delete_account', onDeleteAccount);

    // maps
    socket.on('load_markers', onLoadMarkers);

    // reports
    socket.on('reports', onReports);
    socket.on('report_info', onReportInfo);

    // responder
    socket.on('resp_reg', onRespRegister);

    // update apk
  	socket.on('update_apk', onUpdateApk);

    function onGetPendingRequest(){
        console.log("onGetPendingRequest");
        pool.getConnection(function(error, connection){
          if (error) throw error;
          connection.query("SELECT * FROM app_users WHERE status = 0", function(err, result){
            // console.log(result);
          socket.emit('result_pending_request', result);
          });
  
          connection.query("SELECT * FROM app_users WHERE status = 1", function(err, result2){
          socket.emit('result_verified_users', result2);
          });
          // connection.release();
          connection.release(error => error ? reject(error) : resolve());
        });
    
    }

    function onAdminSendConfirms(data){
        console.log("=========== SMS CONFIRM ================");
         console.log("a"+data+'a');

        pool.getConnection(function (error, connection) {
            if (error) throw error;
            connection.query("SELECT password FROM app_users WHERE contact='" + data + "'", function (err, result) {
                if(result.length !== 0){
                  console.log(result[0].password);
                  socket.to(sms.socket_id).emit('act_number', {mobile: data, password: result[0].password});
                }
            });

            connection.query("UPDATE app_users SET status=1 WHERE contact='" + data + "'", function(err){
                if (err) throw err;
            });

            connection.query("SELECT * FROM app_users WHERE status=0", function (err, result2) {
                if (err) throw err;
                var count = result2.length;
                  socket.emit('reg_nottifs', count);
                  socket.emit('result_pending_request', result2);
                  socket.broadcast.emit('result_pending_request', result2);
            });

            connection.query("SELECT * FROM app_users WHERE status = 1", function(err, result3){
            socket.emit('result_verified_users', result3);
            socket.broadcast.emit('result_verified_users', result3);
            });

            connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onAdminDeactivateUser(data){
        pool.getConnection(function(error, connection){
          if (error) throw error;
  
          connection.query("UPDATE app_users SET status=0 WHERE contact='" + data + "'", function(err){
              if (err) throw err;
          });
  
          connection.query("SELECT * FROM app_users WHERE status=0", function (err, result2) {
              if (err) throw err;
              var count = result2.length;
                socket.emit('reg_nottifs', count);
                socket.emit('result_pending_request', result2);
                socket.broadcast.emit('result_pending_request', result2);
          });
  
          connection.query("SELECT * FROM app_users WHERE status = 1", function(err, result3){
          socket.emit('result_verified_users', result3);
          socket.broadcast.emit('result_verified_users', result3);
          });
  
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onAdminDeleteUser(data){
        pool.getConnection(function(error, connection){
          if (error) throw error;
  
          connection.query("DELETE FROM app_users WHERE contact='" + data + "'", function(err){
              if (err) throw err;
          });
  
          connection.query("SELECT * FROM app_users WHERE status=0", function (err, result2) {
              if (err) throw err;
              var count = result2.length;
                socket.emit('reg_nottifs', count);
                socket.emit('result_pending_request', result2);
          });
  
          connection.query("SELECT * FROM app_users WHERE status = 1", function(err, result3){
          socket.emit('result_verified_users', result3);
          });
  
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    // dashboard
    function onGetTotalUser(){
        console.log("onGetTotalUser");
        pool.getConnection(function(error, connection){
          if (error) throw error;
  
          connection.query("SELECT barangay, COUNT(barangay) as total FROM app_users WHERE status = 1 GROUP BY barangay", function(err, result){
          socket.emit('result_total_user', result);
          });
          connection.release(error => error ? reject(error) : resolve());
  
        });
    }

    function onGetLatestVersion(){
        console.log("onGetLatestVersion");
        pool.getConnection(function(error, connection){
          if (error) throw error;
          connection.query("SELECT * FROM apk_update ORDER BY id DESC", function(err, result){
          socket.emit('result_latest_version', result);
          });
          // connection.release();
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    // infoblast
    function onGetNotif(data){
        console.log("onGetNotif");
        pool.getConnection(function(error, connection){
          if (error) throw error;
          connection.query("Select id, title, content, DATE_FORMAT(date, '%Y-%m-%d %H-%i-%s') AS date, image FROM notification WHERE status=0 ORDER BY id DESC", function(err, result){
            connection.query("Select id, title, content, DATE_FORMAT(date, '%Y-%m-%d %H-%i-%s') AS date, image FROM notification WHERE image<>'' AND status=0 ORDER BY id DESC", function(err, result2){
              connection.query("Select id, title, content, DATE_FORMAT(date, '%Y-%m-%d %H-%i-%s') AS date, image FROM notification WHERE status=1 ORDER BY id DESC", function(err, result3){
                console.log("==================== INBOX ======================");
                console.log(result);
                console.log("==================== ATTACHMENT ======================");
                console.log(result2);
                console.log("==================== TRASH ======================");
                console.log(result3);
                socket.emit('notif_result', result, result2, result3, data);
              });
            });
          });
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onTrashNotif(data){
        pool.getConnection(function(error, connection){
          if (error) throw error;
          for (var i = 0; i < data.length; i++) {
          connection.query("UPDATE notification SET status = 1 WHERE id = "+data[i]+"", function(err, result){
          console.log(result);
          });
          }
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onDeleteNotif(data){
        pool.getConnection(function(error, connection){
          if (error) throw error;
          for (var i = 0; i < data.length; i++) {
          connection.query("DELETE FROM notification WHERE id = "+data[i]+"", function(err, result){
          console.log(result);
          });
          }
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onRestoreTrashNotif(data){
        pool.getConnection(function(error, connection){
          if (error) throw error;
          for (var i = 0; i < data.length; i++) {
          connection.query("UPDATE notification SET status = 0 WHERE id = "+data[i]+"", function(err, result){
          console.log(result);
          });
          }
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onSendNotification(data){
        console.log(data);
        var info_blast = [];
        pool.getConnection(function (error, connection) {
           if (error) throw error;

           connection.query("INSERT INTO notification (title, content, image, status) VALUES (?,?,?,?)",[data.title, data.content, data.image, 0], function (err) {
               if (err) throw err;
           });

           connection.query("SELECT * FROM notification WHERE status = 0 ORDER BY id DESC LIMIT 5", function (err, result) {
               if (err) throw err;
               console.log("============= send infoblast ==============");
               console.log(result);
               connection.query("SELECT socket_id FROM app_users WHERE socket_id<>''", function (err, result2) {
                   if (err) throw err;
                   if (result2 !== null){
                       console.log(result);
                       console.log("==================== info blast data null filter ===============");
                       console.log(info_blast);
                       console.log("====================================================");
                       for (var i = 0; i <= result2.length - 1; i++){
                           socket.to(result2[i].socket_id).emit('receive_notification', result);
                       }
                   }
                   connection.release(error => error ? reject(error) : resolve());
               });
           });

        });
    }

    function onGetNotifDetails(data){
        console.log("onGetNotifDetails");
        pool.getConnection(function(error, connection){
          if (error) throw error;
  
          connection.query("Select id, title, content, DATE_FORMAT(date, '%Y-%m-%d %H-%i-%s') AS date, image FROM notification WHERE id="+data+"", function(err, result){
          console.log(result);
  
          socket.emit('get_notif_details', result);
          });
          connection.release(error => error ? reject(error) : resolve());
  
        });
  
    }

    // logs
    function ongetActivityLogs(){
        console.log("ongetActivityLogs");
        pool.getConnection(function(error, connection){
          if (error) throw error;
          connection.query("SELECT users.username as user_name, department, log_in, log_out FROM activity_logs,users WHERE users.username IN(SELECT username FROM users WHERE username = activity_logs.user_name AND status = 1 )", function(err, result){
          socket.emit('result_activity_logs', result);
          });
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onGetAccounts(){
        pool.getConnection(function(error, connection){
          if (error) throw error;
          connection.query("SELECT * FROM users WHERE status = 0 AND user_type != 1", function(err, result){
            console.log(err);
            console.log("============= USER =====================");
            console.log(result);
            socket.emit('result_accounts', result);
          });
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onActivateAccount(data){
        pool.getConnection(function(error, connection){
          if(error) throw error;
          connection.query("UPDATE users SET status = 1 WHERE id ='"+data+"'", function(err, result){
            console.log(err);
            console.log(result);
            socket.emit('activated_user');
          });
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onDeleteAccount(data){
        pool.getConnection(function(error, connection){
          if(error) throw error;
          connection.query("DELETE FROM users WHERE id = '"+data+"'", function(err, result){
            console.log(err);
            console.log(result);
            socket.emit('deleted_user');
          });
          connection.release(error => error ? reject(error) : resolve());
        });
    }

    // maps
    function onLoadMarkers(data){
        console.log(data);
        if(data.alert_type == "POLICE"){
          pool.getConnection(function (error, connection) {
              if (error) throw error;
              connection.query("SELECT * FROM alerts WHERE alert_type='"+data.alert_type+"' AND incident='"+data.incident+"' AND YEAR(time)='"+data.year+"' AND MONTH(time)='"+data.month+"' AND lat > 1 AND lng > 1", function (err, result) {
                    socket.emit('display_markers', result);
              });
              connection.release(error => error ? reject(error) : resolve());
          });
        }
        else{
          pool.getConnection(function (error, connection) {
              if (error) throw error;
              connection.query("SELECT * FROM alerts WHERE alert_type='"+data.alert_type+"' AND YEAR(time)='"+data.year+"' AND MONTH(time)='"+data.month+"' AND lat > 1 AND lng > 1", function (err, result) {
                    socket.emit('display_markers', result);
              });
              connection.release(error => error ? reject(error) : resolve());
          });
        }
    }

    // reports
    function onReports(){
        console.log("reports");
        pool.getConnection(function (error, connection) {
        if (error) throw error;
        connection.query("SELECT alerts.imei AS imei, app_users.fname as fname, app_users.mname AS mname, app_users.lname AS lname, alert_type AS alert, lat, lng, DATE_FORMAT(alerts.time, '%Y-%m-%d %H-%i-%s') AS starttime, DATE_FORMAT(alerts.end_time, '%Y-%m-%d %H-%i-%s') AS endtime, app_users.barangay AS barangay, app_users.municipality AS municipality, app_users.province AS province FROM `alerts`, `app_users` WHERE app_users.imei = alerts.imei AND alerts.status = 2", function (err, result) {
              socket.emit('report_result', result);
              console.log(result);
        });
        connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onReportInfo(data){

        console.log("=========== REPORT INFO ================");
         console.log({data});

        pool.getConnection(function (error, connection) {
          var imgpath, user, alert, incidents, appuser, patient, pstatus, hospital, remarks;
          var resp = "";
          appuser = data.apkuser;
            if (error) throw error;
            connection.query("SELECT * FROM alerts WHERE imei='" + data.imei + "' AND time='" + data.time + "'", function (err, result) {
                if(result.length !== 0){
                console.log(result[0].id);
                img = result[0].imgpath;
                user = result[0].logged_user;
                incidents = result[0].incident;
                alert = result[0].alert_type;

                patient = result[0].patient;
                pstatus = result[0].pstatus;
                hospital = result[0].hospital;
                remarks = result[0].remarks;

                  connection.query("SELECT barangay FROM barangay WHERE barangay.id IN (SELECT st_id FROM alert_resp WHERE alert_id='"+result[0].id+"')", function (err, result2) {

                          var info = {
                              imgpath : img,
                              user : user,
                              apk_user: appuser,
                              incident: incidents,
                              alert_type: alert,
                              patient: patient,
                              pstatus: pstatus,
                              hospital: hospital,
                              remarks: remarks
                          };

                    console.log(info, result2);
                    socket.emit('retrieve_info', info, result2);

                  });

                }
            });

            connection.release(error => error ? reject(error) : resolve());
        });
    }

    // responder
    function onRespRegister(data){
        console.log(data);
        pool.getConnection(function(error, connection) {
            connection.query("INSERT INTO responder(imei, fname, mname, lname, resp_unique_id, st_id,  dep_id, ac_id, status) VALUES ('" + data.imei + "','" + data.fname + "','" + data.mname + "','" + data.lname + "','" + uniqueID() + "',(SELECT id FROM barangay where barangay = '" + data.st_id + "'),(SELECT id from department WHERE department ='" + data.department + "'),'1','inactive')", function (err, result){
                if (err) throw err;
		console.log("============== REGISTER RESPONDER ==================================");
		console.log(result);
		console.log("============== END REGISTER RESPONDER ==================================");
            });
            connection.query("UPDATE barangay SET status=1 WHERE barangay='"+data.st_id+"'", function (err) {
                console.log("barngay updated");
                if (err) throw err.message;
            });
            connection.release(error => error ? reject(error) : resolve());
        });
    }

    // update apk
    function onUpdateApk(data){
        pool.getConnection(function (error, connection) {
            if (error) throw error;
            connection.query("INSERT INTO `apk_update` (`version`) VALUES ('"+data+"')", function (err, result) {
            });
            connection.release(error => error ? reject(error) : resolve());
        });
    }

}