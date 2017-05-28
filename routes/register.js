/**
 * Created by deepindersingh on 28/05/17.
 */
var express = require('express');
var router = express.Router();
var con = require('../config/config.js');

router.post('/', function(req, res, next) {

    let email = (req.body.email);
    let pwd = (req.body.password);
    let name = (req.body.donorName);
    let gender = (req.body.gender);
    let age = (req.body.age);
    let b_id = (req.body.blood_group);
    let mobile = (req.body.mobile);
    let state_id = (req.body.state);
    let city_id = (req.body.city);
    let district_id = (req.body.district);

    var print = console.log;
    var sqlQuery = "INSERT INTO donarregistration (`name`,`gender`,`age`,`mobile`,`b_id`,`state_id`,`district_id`," +
        "`city_id`,`email`,`pwd`) VALUES (?,?,?,?,?,?,?,?,?,?);";

    var arr = [name,gender,age,mobile,b_id,state_id,district_id,city_id,email,pwd];
    print(arr);
    var q = con.query(sqlQuery, [arr], function (err,rows) {
        print(q.sql);
        if(err)
            return res.json({ flag: 144, message: 'Failed to register.', error: err });

        res.json({
            flag: 143,
            message: 'User Registered Successfully'
        });


    });
});

module.exports = router;