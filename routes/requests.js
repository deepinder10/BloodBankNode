/**
 * Created by deepindersingh on 05/05/17.
 */
var express = require('express');
var router = express.Router();
var con = require('../config/config.js');
var jwt    = require('jsonwebtoken');

router.post('/', function(req, res, next) {


    con.query("SELECT * FROM requestes ORDER BY `req_id` DESC;",function (err,rows) {
        if(err) throw err;
        if (!rows.length) {
            res.json({ flag: 144, message: 'Error Fetching data' });
        } else if (rows.length) {
            res.json({
                flag: 143,
                message: 'Successfully fetched',
                data: rows
            });
        }
    });
});

module.exports = router;