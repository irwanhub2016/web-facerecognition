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
var apiKey = 'pd-rA0kgBEZ5jGgnAS_EePIGmhnY-yZTCTVZZAFxviR'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var moment = require('moment');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'pug');
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

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    connection(mysql,{
      user: 'root', // your mysql user
        host: 'localhost',
        password : '', // your mysql password
        port : 3306, //port mysql
        database:'monitoring_depot' // your database name
    },'pool') //or single

);

/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : 3306,
  database : 'db_users'
});

connection.connect()

connection.query("SELECT *from tbl_users", function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].username)
})

connection.end()*/

app.use('/', index);
app.use('/depot', depot);
//app.use('/customers', customers);
app.use('/users', users);
app.use('/watchdog2/:id/:username/:password/:full_name', function (req, res, next) {

var ambil_id = req.params.id;
var username = req.params.username;
var password = req.params.password;
var full_name = req.params.full_name;

//  var t = moment.duration(parseInt(req.param('uptime')), 'milliseconds')
//var _message = req.param('ip') + " uptime " + t.hours() + "h " + t.minutes() + "m " + t.seconds() +"s";
//console.log("watchdog from " + ambil_id + username + password);

/*var customer = {
      username: username,
      password: password,
      full_name: full_name
    }

    var insert_sql = 'INSERT INTO tbl_users SET ?';
      var query = connection.query(insert_sql, customer, function(err, result){
        if(err)
        {
          var errors_detail  = ("Error Insert : %s ",err );   
          //req.send('msg_error', errors_detail); 
         }
         else
         {
          //req.send('msg_info', 'Create customer success'); 
          //res.redirect('/customers');
        }   
    });*/
    res.send("You are alive!"+password);
});

app.use('/monitoring', function (req, res, next) {
  var _message = req.param('ip');
  console.log("watchdog from " + _message);
  res.send("You are alive!");
});


app.use('/getIFTTT/:order', function (req, res, next) {

var ambil_sensor = req.param('order');

if(ambil_sensor=='send')
        //  var t = moment.duration(parseInt(req.param('uptime')), 'milliseconds')
        //var _message = req.param('ip') + " uptime " + t.hours() + "h " + t.minutes() + "m " + t.seconds() +"s";

        console.log("Data ID : " + ambil_sensor);
        res.send("You are alive! "+ambil_sensor);
        /*var request = {
          event: 'PesanGalon',
          values: {
            value1: 'hello',
            value2: 'world'
          }
        };

        IFTTTMaker.send(request, function (error) {
          if (error) 
          {
            console.log('The request could not be sent:', error);
          } 
          else 
          {
            console.log('Request was sent');
          }  
        });*/

});

var requestTime = function (req, res, next) {
  req.requestTime = Date.now('asasassas')
  next()
}

app.use(requestTime)

app.get('', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + moment().format('dddd') + '</small>'
  res.send(responseText);
})

//test query
app.get('/halo', function (req, res) {
    console.log(req.query.name);
    res.send('Response send to client : '+ req.requestTime);
})

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
