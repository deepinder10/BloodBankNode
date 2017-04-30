var express = require('express');
var router = express.Router();
var con = require('../config/config.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

    con.query('SELECT * FROM requestes',function (err,rows) {
        if(err) throw err;
        console.log(rows);
        res.json(rows);

    })
});

module.exports = router;
