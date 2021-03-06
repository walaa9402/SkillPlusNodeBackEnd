
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const app = express()


var http = require('http');
const https = require("https");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var skillRouter = require('./routes/skill');
var needRouter = require('./routes/need');
var notificationRouter = require('./routes/notification');

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/category',categoryRouter);
app.use('/skill',skillRouter);
app.use('/need',needRouter);
app.use('/notification',notificationRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// for authentication
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});
	
	
	
app.listen(1200, function () {
  console.log('Example app listening on port 1200!')
})


module.exports = app;