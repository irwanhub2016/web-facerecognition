var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var depot = require('./routes/depot');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var multer = require("multer");
var moment = require('moment');
var md5 = require('md5');
var connection  = require('express-myconnection');
var mysql = require('mysql');

var upload = multer({ dest: 'uploads/' })

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(expressValidator());

app.use(methodOverride(function(req, res){

 if (req.body && typeof req.body == 'object' && '_method' in req.body)
  {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
<<<<<<< HEAD
      user: 'root',
      host: 'localhost',
      password : '',
      port : 3306,
      database:'monitoring_depot',
=======
      user: 'phpmyadmin', 
      host: 'localhost',
      password : 'B79cLqirBkMA', 
      port : 3306, 
      database:'monitoring_depot', 
>>>>>>> ca88a5d3146cfbfaf9a85647af0086a30a3fa06b
      debug: false,
      multipleStatements: true
    },'single')

);


app.use('/', index);

app.use('/depot', depot);
app.use('/users', users);

var requestTime = function (req, res, next) {
  req.requestTime = Date.now('asasassas')

  next()
}


app.get('/route', function (req, res, next) {
   var pdf = require('./routes/services').create();
   pdf.pipe(res);
   pdf.end();
});

app.use(requestTime)

app.get('/ReqTime', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + moment().format('dddd') + '</small>'
  res.send(responseText);
})


app.get('/halo/:halo', function (req, res, next) {
    var halo = req.param('halo');
    console.log(halo);
    console.log(md5(halo));
})


app.use(function(err, req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
