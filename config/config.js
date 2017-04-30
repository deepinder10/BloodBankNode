/**
 * Created by deepindersingh on 05/05/17.
 */
var sql = require('mysql');

var con = sql.createConnection({
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9172740',
    password : 'HBFbHvEzFq',
    database : 'sql9172740'
})

module.exports = con;
