var mysql = require('mysql');

var pool = mysql.createPool({

connectionLimit : 10,
host : 'localhost',
user : 'root',
password : '',
charset: 'utf8',
database : 'skillplus'
});



module.exports = pool;