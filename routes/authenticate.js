/**
 * Created by deepindersingh on 05/05/17.
 */
var express = require('express');
var router = express.Router();
var con = require('../config/config.js');
var jwt    = require('jsonwebtoken');
var app = require('../app.js');

router.post('/', function(req, res, next) {


    con.query("SELECT * FROM donarregistration where email = " + JSON.stringify(req.body.email) + ' and pwd = ' + JSON.stringify(req.body.password) + "",function (err,rows) {
        if(err) throw err;
        if (!rows.length) {
            res.json({ flag: 144, message: 'Authentication failed. User not found.' });
        } else if (rows.length) {

            // create a token
            var token = jwt.sign(rows[0].name, 'secret', {
            });

            // return the information including token as JSON
            res.json({
                flag: 143,
                message: 'Login Successfull',
                token: token
            });
        }
    });
});

module.exports = router;