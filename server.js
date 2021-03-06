// dependencies
var express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	favicon = require('serve-favicon');

	bodyParser = require('body-parser'),
	expressSession = require('express-session'),
	hash = require('bcrypt-nodejs'),
	path = require('path'),
	passport = require('passport'),
	localStrategy = require('passport-local' ).Strategy;

var User = require('./server/models/User.js');
require('./server/config/mongoose.js');
require('./server/config/passport.js');


var twilioNotifications = require('./server/middleware/twilioNotifications.js')


var routes = require('./server/config/routes.js');

//invoke express, require mongoose.js, require routes
var app = express();

//defining middleware
app.use(express.static(path.join(__dirname, './client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//for some reason twilio notifes error when error
app.use(twilioNotifications.notifyOnError);



//error handlers
app.use(routes)
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

var debug = require('debug')('passport-mongo');
app.listen('8100', function(){
	console.log('8100')
})