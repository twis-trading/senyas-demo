const pool = require('../config/database.js');

module.exports = (socket) => {
    socket.on('get_accounts', onGetAccounts);
    socket.on('activate_account', onActivateAccount);
    socket.on('delete_account', onDeleteAccount);

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
}