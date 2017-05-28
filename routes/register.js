const express = require('express');
const router = express.Router();
const con = require('../config/config.js');

router.post('/', function(req, res) {

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

    let sqlQuery = `INSERT INTO 
                        donarregistration 
                        (
                         name,
                         gender, 
                         age,
                         mobile, 
                         b_id, 
                         state_id, 
                         district_id, 
                         city_id, 
                         email, 
                         pwd)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let arr = [name,gender,age,mobile,b_id,state_id,district_id,city_id,email,pwd];
    let responseStatement = {};
    arr.map(x => responseStatement[x] = x);
    let q = con.query(sqlQuery, arr, function (err, result) {

        if (err) {
            return res.send({flag: 144, message: 'Failed to register.', error: err});
        }

        return res.send({
            flag: 143,
            message: 'User Registered Successfully',
            data : responseStatement,

        });


    });
});

module.exports = router;