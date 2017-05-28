var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');

var index = require('./routes/index');
var authenticate = require('./routes/authenticate');
var config = require('./config/config');
var requests = require('./routes/requests');
var register = require('./routes/register');
var requestCreate = require('./routes/requestCreate');

var app = express();
var apiRoutes = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', 'secret');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', apiRoutes);
app.use('/authenticate', authenticate);
app.use('/api/requests', requests);
app.use('/requestCreate', requestCreate);
app.use('/register',register);

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.json({ flag: 101, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            flag: 101,
            message: 'No token provided.'
        });

    }
});

// apply the routes to our application with the prefix /api

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
