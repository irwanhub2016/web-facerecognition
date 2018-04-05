var express = require('express');
var router = express.Router();
var modul = require('../modul/modul');
var authentication_mdl = require('../middlewares/authentication');
var moment = require('moment');
var apiKey = 'pd-rA0kgBEZ5jGgnAS_EePIGmhnY-yZTCTVZZAFxviR'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Depot Air Minum Isi Ulang' });
});

router.get('/logout', function(req, res)
{ 
	req.session.destroy(function(err)
	{ 
		if(err)
		{ 
			console.log(err); 
		} 
		else 
		{ 
			res.redirect('/login'); 
		} 
	}); 
});

router.get('/login',function(req,res,next)
{

		if (req.session.is_login) 
		{ 
			return res.redirect('/depot'); 
		}
		else
		{res.render('main/login',{title:"Login Page"});} 
		//next(); 
});

router.post('/login',function(req,res,next){
	session_store=req.session;
	req.assert('txtEmail', 'Please fill the Username').notEmpty();
	req.assert('txtEmail', 'Email not valid').isEmail();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim(); 
			v_email = req.sanitize( 'txtEmail' ).escape().trim();
			
			var query = connection.query('select * from admin where email="'+v_email+'" and password=md5("'+v_pass+'")',function(err,rows)
			{
				if(err)
				{

					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					req.flash('msg_error', errornya); 
					res.redirect('/login'); 
				}else
				{
					if(rows.length <=0)
					{

						req.flash('msg_error', "Wrong email address or password. Try again."); 
						res.redirect('/login');
					}
					else
					{	
						session_store.is_login = true;
						res.redirect('/depot');
					}
				}

			});
		});
	}
	else
	{
		errors_detail = "<p>Sory there are error</p><ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/login'); 
	}
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Depot Air Minum Isi Ulang' });
});

/*router.get('/monitor', function(req, res, next) {
  res.render('monitoring', { title: 'Depot Air Minum Isi Ulang' });
});*/

router.get('/blankpage', function(req, res, next) {
var waktu = moment().format('MMMM Do YYYY, h:mm:ss a');	//tes waktu
  res.render('blankpage', { title: waktu }); //variabel waktu
});



module.exports = router;
/**/