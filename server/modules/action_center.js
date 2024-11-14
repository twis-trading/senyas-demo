const pool = require('../config/database.js');

module.exports = (socket) => {

    // app user
    socket.on('admin_send_confirm', onAdminSendConfirms);

    // department
    socket.on('dept_login', onDeptLogin);
    socket.on('track_alert', onTrackAlert);
    socket.on('send_alert_resp', onSendAlertResp);
    socket.on('resp_reg', onRespRegister);
    socket.on('logs', onLog);

    // event
    socket.on('track_resp2', onTrackresp2);
    socket.on('user_login', onUserLogin);
    socket.on('checkNottif', onCheckNottif);
    socket.on('checksms', onCheckSms);
    socket.on('disconnect', onDisconnect);
    socket.on('send_confirm', onSendConfirms);
    socket.on('accept_alert', onAcceptAlert);
    socket.on('on_alert_accepted', onAccepted);
    socket.on('close_tab', close_Tab);
    socket.on('pause_sound', onPauseSound);
    socket.on('send_notification', onSendNotification);
    socket.on('logs', onLog);

    // app user
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

    // department
    function onDeptLogin(data){
        pool.getConnection(function (error, connection) {
          console.log("------------------------ dept login ------------------");
            console.log(data);
            if (error) throw error;
            if (data.dept.toLowerCase() === "police") police.police = socket.id;
            if (data.dept.toLowerCase() === "fire") fire.fire = socket.id;
            connection.query("UPDATE users SET log_status='online', socket_id='" + socket.id + "' WHERE position='" + data.dept + "' AND municipality='" + data.name + "'", function (err) {
                if (err) throw err;
            });
                connection.query("SELECT alerts.alert_type, alerts.imei, CONCAT(app_users.fname, ' ', app_users.lname) as name, app_users.contact, CONCAT(app_users.street, ', ', app_users.barangay) AS address, alert_dept.status FROM alerts JOIN app_users on alerts.imei = app_users.imei LEFT JOIN alert_dept ON alerts.id=alert_dept.alert_id WHERE  alert_dept.dept_id IN (SELECT id FROM users WHERE municipality='" + data.name + "' AND position='" + data.dept + "') AND alert_dept.status IN (0,1)", function (err, result) {
                  if (err) throw err;
                socket.emit('alerts_ac', result);
            });
            //-------------------- idol login dept ------------------------
            connection.query("SELECT username, position, log_status as status, user_type as type, user_tag as tag FROM users WHERE socket_id='" + socket.id + "'", function(err, result){
                if (err) throw err;
                socket.broadcast.emit('change_userStatus', result);
            });
            connection.query("SELECT * FROM users WHERE 1 ORDER BY username ASC", function(err, result){
                if (err) throw err;

                socket.broadcast.emit('change_status_logs', result);
            });
            //--------------------------------------------------------------
            connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onTrackAlert(room, dept, date){ //change from join to track_alert
        socket.join(room, function() {
            console.log('ontrackAlert room');
            console.log(room);
            pool.getConnection(function (error, connection) {
                if (error) throw  error;
                connection.query("SELECT tracking.lat, tracking.lng, alerts.alert_type, alerts.imgpath FROM tracking JOIN alerts ON tracking.alert_id=alerts.id WHERE imei='" + room + "' AND status=1 ORDER BY tracking.id DESC LIMIT 1", function(err, result){
                    if (err) throw err;
                    //console.log(result);
                    if (result.length !== 0){
                        console.log(result[0]);
                        socket.emit('init_track', result[0]);
                    }
                });
                connection.query("SELECT lat, lng, ar.resp_id AS id, resp.dep_id AS type FROM tracking_resp tr JOIN alert_resp ar ON tr.ar_id=ar.id LEFT JOIN responder resp ON ar.resp_id=resp.id WHERE ar.resp_id<>0 AND tr.id IN (SELECT MAX(id) FROM tracking_resp WHERE alert_id =(SELECT id FROM alerts WHERE imei='" + room + "' AND status=1) GROUP BY ar_id)", function (err, result) {
                    if (err) throw err;
                    socket.emit('init_resp', result);
                });
                console.log(socket.id);
                connection.query("UPDATE alert_ac SET status=1, accept_time ='"+ date +"' WHERE alert_id IN (SELECT id FROM alerts WHERE imei='" + room + "' AND status=1) AND ac_id IN (SELECT id FROM action_center WHERE socket_id='" + socket.id + "') AND status=0", function (err, result) {
                });
                console.log('ontrackAlert room update');
                console.log(room);
                console.log('position');
                console.log(dept);
                console.log('------------------ DTATE ----------------------');
                console.log(date);
                console.log('------------------ DTATE END ----------------------');
                connection.query("UPDATE alert_dept SET status=1, accept_time ='"+ date +"' WHERE alert_id IN (SELECT id FROM alerts WHERE imei='" + room + "' AND status=1) AND dept_id IN (SELECT id FROM users WHERE position='" + dept + "') AND status=0", function (err, result) {
                    if (err) throw err;
                    console.log('update result');
                    console.log(result);
                });
                connection.release(error => error ? reject(error) : resolve());
            });
        });
    }

    function onSendAlertResp(data){
        console.log("Responder ");
        console.log({data});
        var sid = [];
        var st_id;
        pool.getConnection(function(error, connection) {
            if(error) throw error;
            connection.query("SELECT st_id, socket_id FROM responder WHERE st_id=(SELECT id FROM barangay WHERE ac_id=(SELECT id FROM action_center WHERE name='" + data.name + "') AND dept_id='" + data.type + "' AND barangay='"+ data.value + "') AND status='active'", function (err, result) {
                if (err) throw err;
                if (result.length !==0){
                    st_id = result[0].st_id;
                    sid = result;
                    connection.query("SELECT id FROM alert_resp WHERE resp_id=0 AND status=0 AND status<>2", function (err, result) {
                        if (err) throw err;
                        if (result.length === 0){
                            connection.query("INSERT INTO alert_resp (alert_id, st_id, resp_id, status) VALUES ((SELECT IF(id IS NULL,0,id) AS id FROM alerts WHERE imei= '" + data.imei +"' AND status=1),?,?,?)", [st_id, 0, 0], function (err, result) {
                                if (err) throw err;
                            });
                            console.log(data.imei);
                        }else    {
                            socket.emit('no_resp', {message: "No responder accept the alert."});
                        }
                        connection.query("SELECT alerts.alert_type as alert_type, alerts.imei as imei, CONCAT(app_users.fname,' ',app_users.lname) as name, app_users.contact as contact,  CONCAT(app_users.street, ', ', app_users.barangay) AS address FROM alerts JOIN app_users on alerts.imei = app_users.imei WHERE alerts.id=(SELECT id FROM alerts WHERE imei='" + data.imei + "' AND status=1)", function (err, result) {
                            if (err) throw err.message;
                            console.log(result);
                            for (var i = 0; i<=sid.length-1;i++){
                                console.log("alert send to " + data.value);
                                var img = {
                                  alert_type : result[0].alert_type,
                                  imei : result[0].imei,
                                  name : result[0].name,
                                  contact : result[0].contact,
                                  address : result[0].address,
                                  imgpath : data.imgpath
                                }
                                socket.to(sid[i].socket_id).emit('SEND_RESP', img);
                            }
                            connection.release(error => error ? reject(error) : resolve());
                        });
                    });
                }else {
                    connection.release(error => error ? reject(error) : resolve());
                    socket.emit('no_resp', {message: "No available responder."});
                }
            });
        });
    }

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

    function onLog(userlogin){
        console.log("logout: "+userlogin);
    }

    function onTrackresp2(){
        console.log("RESP_RELOAD: ++++++--------");
        pool.getConnection(function (error, connection) {
            var barangay;
            var dept_id;
            var resp_id;
            var lat;
            var lng;
            var status;
            var battery;
            var gps;
            if (error) throw error.message;
            connection.query("SELECT resp_id, dept_id, lat, lng FROM track_resp WHERE resp_id IN (SELECT id FROM responder)", function (err, result) {
                if (err) throw err.message;
                console.log("result ********************");
                console.log(result.length);
                if (result.length !==0){

                  for (i = 0; i <result.length; i++) {
                    console.log("result ********************" + i);
                    console.log(result[i].resp_id);
                    connection.query("SELECT barangay, track_resp.resp_id as resp_id, track_resp.dept_id as dept_id, track_resp.lat as lat, track_resp.lng as lng, responder.status as status, responder.battery as battery, responder.gps as gps FROM barangay, track_resp, responder WHERE barangay.id IN (SELECT st_id FROM responder WHERE id = '"+ result[i].resp_id +"') AND track_resp.resp_id ='"+ result[i].resp_id +"' AND responder.id ='"+ result[i].resp_id +"'", function (err, result2) {
                    if (err) throw err.message;
                    barangay = result2[0].barangay;
                    resp_id = result2[0].resp_id;
                    dept_id = result2[0].dept_id;
                    lat = result2[0].lat;
                    lng = result2[0].lng;
                    status = result2[0].status;
                    battery = result2[0].battery;
                    gps = result2[0].gps;

                    var newLoc = {
                        type: dept_id,
                        id  : resp_id,
                        lat : lat,
                        lng : lng,
                        label : barangay,
                        status : status,
                        battery : battery,
                        gps : gps
                    };
                    console.log("resp load sam--------------------");
                    console.log(newLoc);
                    socket.emit('resp_update2', newLoc);
                    socket.emit('RESP_UPDATE3', newLoc);
                      socket.broadcast.emit('RESP_UPDATE3', newLoc);
                    socket.broadcast.emit('resp_update2', newLoc);
                      console.log("resp load emit s--------------------");
                    });
                  }
                  connection.release(error => error ? reject(error) : resolve());

                }else{
                    connection.release(error => error ? reject(error) : resolve());
                }
            });

        });
    }

    function onUserLogin(data){
        console.log(data);
        console.log("------------ username -----------");
        console.log(data.username);
        //check user that login is Command Center
        if (data.name === 'CommandCenter'){
            //set cc.CommandCenter = new socket.id
            cc.CommandCenter = socket.id;
            console.log(cc.CommandCenter);
            pool.getConnection(function(error, connection){
                if (error) throw error;
                connection.query("SELECT alerts.id, tr.id, alerts.imei, tr.lat, tr.lng, alerts.alert_type, CONCAT(app_users.fname, ' ', app_users.lname) as name, app_users.contact FROM alerts JOIN app_users ON alerts.imei=app_users.imei LEFT JOIN tracking tr ON alerts.id=tr.alert_id WHERE alerts.status=0 ORDER BY tr.id DESC", function(err, result){
                    if (err) throw err;
                    console.log(result);
                    socket.emit('init_alert', result);
                });

                connection.query("SELECT alerts.imei, alerts.alert_type, CONCAT(app_users.fname, ' ', app_users.lname) as name, app_users.contact FROM alerts JOIN app_users ON alerts.imei=app_users.imei WHERE alerts.status=1 and alerts.logged_user = '" + data.username + "'", function(err, result){
                    if (err) throw err;
                    socket.emit('init_ongoing', result);
                  });
                  connection.query("UPDATE users SET log_status='online', socket_id='" + cc.CommandCenter + "' WHERE username='" + data.username + "'", function (err) {
                    // connection.query("UPDATE users SET socket_id='" + cc.CommandCenter + "' WHERE position='AC'", function (err) { old code
                  if (err) throw err;
                  console.log("update success");
                  });
                //-------------------- idol login ac ------------------------
                connection.query("SELECT * FROM users WHERE 1 ORDER BY username ASC", function(err, result){
                    if (err) throw err;
                    // console.log(result);

                    socket.broadcast.emit('change_status_logs', result);
                });

                //--------------------------------------------------------------
                connection.release(error => error ? reject(error) : resolve());
            });
        }else {
            pool.getConnection(function(error, connection){
                if (error) throw error;
                connection.query("UPDATE action_center SET socket_id='" + socket.id + "' WHERE name='" + data.name + "'", function(err, result){
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
                connection.query("SELECT alerts.alert_type, alerts.imei, CONCAT(app_users.fname, ' ', app_users.lname) as name, app_users.contact, alert_ac.status FROM alerts JOIN app_users on alerts.imei = app_users.imei LEFT JOIN alert_ac ON alerts.id=alert_ac.alert_id WHERE  alert_ac.ac_id IN (SELECT id FROM action_center WHERE name='" + data.name + "') AND alert_ac.status IN (0,1)", function (err, result) {
                    if (err) throw err;
                    socket.emit('alerts_ac', result);
                });

                connection.release(error => error ? reject(error) : resolve());
            });
        }
    }

    function onCheckNottif(){
        pool.getConnection(function (error, connection) {
            if (error) throw error;
            connection.query("SELECT id FROM app_users WHERE status=0", function (err, result) {
                if (err) throw err;
                var count = result.length;
                  socket.emit('reg_nottifs', count);
            });
            connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onCheckSms(){
        console.log("onCheckSms");
        console.log(sms.socket_id);
        if (sms.socket_id === "") {
          socket.emit('sms_disconnected');
        }
        else {
          socket.emit('sms_connected');
        }
    }

    function onDisconnect(){
        console.log('Device is disconnected android: ' + socket.id);
        console.log(cc.CommandCenter);
        if (socket.id === cc.CommandCenter){
            console.log('CommandCenter');
            cc.CommandCenter = '';

            //-------------- idol offline user --------------
            pool.getConnection(function (error, connection) {
                if (error) throw error;
                connection.query("UPDATE users SET log_status='offline' WHERE socket_id='" + socket.id + "'", function(err){
                    if (err) throw err;
                });

                connection.query("SELECT * FROM users WHERE 1 ORDER BY username ASC", function(err, result){
                    if (err) throw err;

                    socket.broadcast.emit('change_status_logs', result);
                });


                connection.release(error => error ? reject(error) : resolve());
            });
            //-----------------------------------------------
        }
        else if (socket.id === sms.socket_id) {
          sms = {socket_id: ''}
          socket.broadcast.emit('sms_disconnected');
        }

        else{
          console.log(socket.id);
            pool.getConnection(function(error, connection){
                if (error) throw error;
                connection.query("SELECT id, dep_id, status FROM responder WHERE socket_id=?",[socket.id], function (err, result) {
                  console.log("#################");
                    if (result.length !== 0){
                        if (result[0].status !== 'occupied'){
                            change_status(result[0], 'inactive');
                            socket.broadcast.emit('disconnect_resp2', result[0].id);
                        }
                          socket.broadcast.emit('disconnect_resp2', result[0].id);
                        change_marker(result[0], 'offline');

                    }
                });
                connection.query("UPDATE responder SET socket_id='', status='inactive' WHERE socket_id='" + socket.id + "' AND status!='occupied'", function(err, result){
                    if (err) throw err;

                });

                connection.query("UPDATE users SET log_status='offline' WHERE socket_id='" + socket.id + "'", function(err){
                    if (err) throw err;
                });

                connection.query("SELECT username, position, log_status as status FROM users WHERE socket_id='" + socket.id + "'", function(err, result){
                    if (err) throw err;

                    socket.broadcast.emit('change_userStatus', result);

                });

                connection.query("SELECT * FROM users WHERE 1 ORDER BY username ASC", function(err, result){
                    if (err) throw err;

                    socket.broadcast.emit('change_status_logs', result);
                });

                connection.query("UPDATE app_users SET socket_id='' WHERE socket_id='" + socket.id + "'", function(err){
                    if (err) throw err;
                    console.log("################# users login");
                });
                trackThis([socket.id, '', 'disconnect']);
                connection.release(error => error ? reject(error) : resolve());
            });
        }
    }

    function onSendConfirms(data){
        console.log("=========== SMS CONFIRM ================");
         console.log({data});

        pool.getConnection(function (error, connection) {
            if (error) throw error;
            connection.query("SELECT password FROM app_users WHERE contact='" + data + "'", function (err, result) {
                if(result.length !== 0){
                  console.log(result[0].password);
                  socket.to(sms.socket_id).emit('act_number', {mobile: data, password: result[0].password});
                }
            });
            connection.query("SELECT id FROM app_users WHERE status=0", function (err, result) {
                if (err) throw err;
                var count = result.length;
                  socket.emit('reg_nottifs', count);
            });
            connection.release(error => error ? reject(error) : resolve());
        });
    }

    function onAcceptAlert(data){
        var alert_id, fullname, alert_type, lat, lng;
          pool.getConnection(function(error, connection){
              console.log(data.user_name);
              connection.query("UPDATE alerts SET status=1, logged_user = '" + data.user_name + "' WHERE imei='" + data.id + "' AND status=0", function (err, result) {
                  if (err) console.log(err);
                  if (result.affectedRows === 1){
                      socket.emit('alert_accepted');
                      connection.query("SELECT socket_id, contact FROM app_users WHERE imei=?",[data.id], function (err, result) {
                          var info = {
                              contact : result[0].contact
                          };
  
                          socket.to(sms.socket_id).emit('alert_accepted', info);
  
                      });
                        connection.query("SELECT CONCAT(app_users.fname, ' ', app_users.lname) as name, contact FROM app_users WHERE imei='" + data.id + "'", function(err, info){
                          fullname = info[0].name;
                          if(info.length !== 0){
                            connection.query("SELECT * FROM alerts WHERE imei='" + data.id + "'", function(err, info2){
                              if(info2.length !== 0){
                                 for (var i = 0; i <= info2.length - 1; i++){
                                   alert_id = info2[i].id;
                                   alert_type = info2[i].alert_type;
                                   lat = info2[i].lat;
                                   lng = info2[i].lng;
                                }
  
                                var infomayor = {
                                  name : fullname,
                                  id : alert_id,
                                  alert_type : alert_type,
                                  lat : lat,
                                  lng : lng
                                }
                                console.log(infomayor);
                                socket.to(mayor.socket_id).emit('alert_mayor', infomayor);
                                socket.to(eut.socket_id).emit('alert_eut', infomayor);
                                socket.to(kobe.socket_id).emit('alert_kobe', infomayor);
                              }
  
                            });
                            connection.release(error => error ? reject(error) : resolve());
                          }
                      });
  
                  }
  
              });
          });
    }

    function onAccepted(data){
        socket.broadcast.emit('on_alert_acceptede', data);
    }

    function close_Tab(data){
        socket.broadcast.emit('closettab', data);
    }

    function onPauseSound(){
        socket.broadcast.emit('pause_alert');
        console.log("===========pause");
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
}
