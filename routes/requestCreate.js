/**
 * Created by deepindersingh on 29/05/17.
 */
const express = require('express');
const router = express.Router();
const con = require('../config/config.js');
var twilio = require('twilio');

router.post('/', function(req, res) {

    let email = (req.body.email);
    let hospital = (req.body.hospital);
    let name = (req.body.donorName);
    let gender = (req.body.gender);
    let age = (req.body.age);
    let b_id = (req.body.blood_group);
    let mobile = (req.body.mobile);

    let sqlQuery = `INSERT INTO 
                        requestes 
                        (
                         name,
                         gender, 
                         age,
                         mobile, 
                         bgroup, 
                         hospital_name,
                         email)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;


    let arr = [name,gender,age,mobile,b_id,hospital,email];
    let responseStatement = {};
    arr.map(x => responseStatement[x] = x);
    let q = con.query(sqlQuery, arr, function (err, result) {

        let blood_id;
        switch (b_id){
            case "O+":
                blood_id = 13;
                break;
            case "O-":
                blood_id = 14;
                break;
            case "AB+":
                blood_id = 15;
                break;
            case "AB-":
                blood_id = 16;
                break;
            case "A+":
                blood_id = 17;
                break;
            case "A-":
                blood_id = 18;
                break;
            case "B+":
                blood_id = 19;
                break;
            case "B-":
                blood_id = 20;
                break;
        }

        if (err) {
            return res.send({flag: 144, message: 'Failed to add request.', error: err});
        }

        try {
            twilioMessage(blood_id,b_id,hospital,name);
        }catch (e){

        }
        return res.send({
            flag: 143,
            message: 'Request Created Successfully'

        });

        

    });
});

function twilioMessage(blood_id,b_id,hospital,name) {
    let c = con.query("select `mobile` from donarregistration where b_id =" + blood_id,function (err,result) {

        if(result.length){
            result.forEach(function (item) {
                try{
                    var accountSid = 'ACffcf0765818b6e7d666378d49f9cc019'; // Your Account SID from www.twilio.com/console
                    var authToken = '72d2556f58d4b1a482fa98ef67d1d8ce';   // Your Auth Token from www.twilio.com/console

                    var twilio = require('twilio');
                    var client = new twilio(accountSid, authToken);

                    client.messages.create({
                        body: 'Mr. ' + name + ' is in need of Blood ' + b_id + ' at ' + hospital + '. Kindly login to view more' +
                        ' details. Regards Any Time Blood Chandigarh',
                        to: '+91'+item.mobile,  // Text this number
                        from: '+14402204590' // From a valid Twilio number
                    }), function(err, message) {
                        if (err) {
                            console.error('Text failed because: ' + err.message);
                        } else {
                            console.log('Text sent! Message SID: ' + message.sid);
                        }
                    }
                }catch(e){
                    console.log(e)
                }
            })
        }


    })

}
module.exports = router;