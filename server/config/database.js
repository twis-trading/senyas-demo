var mysql = require('mysql');
var MysqlPoolBooster = require('mysql-pool-booster');
mysql = MysqlPoolBooster(mysql);

var pool = mysql.createPool({
    // connectionLimit : 100,
    maxIdle : 0,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host : 'localhost',
    user : 'senyasdemo', // senyas
    password : 'senyasdemo123', //senyas123
    database : 'senyasdemo' //senyascalamba
});

module.exports = pool