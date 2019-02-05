var express = require('express');
var router = express.Router();
var modul = require('../modul/modul');
var authentication_mdl = require('../middlewares/authentication');
var moment = require('moment');
var apiKey = 'pd-rA0kgBEZ5jGgnAS_EePIGmhnY-yZTCTVZZAFxviR'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
var orm    = require('orm');
var PDFDocument = require('pdfkit');
var multer  = require('multer');
var x;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        console.log(file.originalname);
        global.y=file.originalname;
        x=y;
  }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/edit/(:id_admin)', upload.single('imageupload'),function(req, res) {

var valuePhoto = {
			photo:x
		}

		var update_lampu = 'update admin SET ? where id_admin= ' + req.params.id_admin;

		req.getConnection(function(err,connection){
			var queryPengisian = connection.query(update_lampu, valuePhoto, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Photo");
				}
				else
				{

					if (req.session.is_login) 
					{ 
						console.log(req.session.is_login_email);
						return res.redirect('/logout'); 
					}

					else
					{
						console.log(req.session.v_email);
						res.render('main/login',{title:"Login | DAIM PINTAR"});}

				console.log("Sukses ambil dan simpan data Photo");
				}		
			});
		});

console.log({status: true,
          message: "Succesfully upload"});
});

router.get('/logout/(:state)', function(req, res)
{ 
	req.session.destroy(function(err)
	{ 
		if(err)
		{ 
			console.log(err); 
		} 
		else 
		{ 
			var get_state = req.params.state;

			if(get_state == 1)
			{
				console.log("State : ", get_state);
				res.redirect('/login_dosen'); 				
			}

			else if (get_state == 2)
			{
				console.log("State : ", get_state);
				res.redirect('/login'); 				
			}

			else
			{
				res.render('error');
			}
		} 
	}); 
});

router.get('/login',function(req,res,next)
{

		if (req.session.is_login) 
		{ 
			console.log("Session aktif : ", req.session.is_login_nik);
			return res.redirect('/depot/auth_akademik'); 
		}
		else
		{
			res.render('main/login',{title:"Login | DAIM PINTAR"});} 
		//next(); 
});

router.get('/login_dosen',function(req,res,next)
{

		if (req.session.is_login) 
		{ 
			console.log("Session aktif : ", req.session.is_login_nik);
			return res.redirect('/depot/auth_dosen');  
		}
		else
		{

			res.render('main/login_dosen',{title:"Login | DAIM PINTAR"});} 
		//next(); 
});

router.post('/login_dosen',function(req,res,next){
	session_store=req.session;
	session_nik=req.session;
	session_password = req.session;

	req.assert('txtNik', 'Please fill the Username').notEmpty();
	req.assert('txtNik', 'NIK not valid').isNumeric();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim(); 
			v_nik = req.sanitize( 'txtNik' ).escape().trim();
			
			var query = connection.query('select * from table_dosen where nik_dosen="'+v_nik+'" and password=md5("'+v_pass+'")',function(err,rows)
			{

				if(err)
				{

					//jika error
					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					console.log("NIK Dosen : " + v_nik);
					console.log("Password Dosen : " + v_pass);
					req.flash('msg_error', errornya); 
					res.redirect('/login_dosen'); 
				}

				else
				{
					//jika berhasil login

					if(rows.length <=0)
					{

						req.flash('msg_error', "Wrong NIK address or password. Try again."); 
						console.log(err.code);
						console.log("NIK Dosen : " + v_nik);
						console.log("Password Dosen : " + v_pass);
						res.redirect('/login_dosen');
					}

					else

					{	
						console.log("NIK Dosen : " + rows[0].nik_dosen);
						console.log("Password : " + rows[0].password);
						console.log("Status : " + rows[0].status);

						session_store.is_login = true;
						session_nik.is_login_nik = v_nik;
						
						var ex_password_dosen = rows[0].password;
						session_password.is_login_password = ex_password_dosen;

						res.redirect('/depot/auth_dosen');
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
		res.redirect('/login_dosen'); 
	}
});

router.post('/login',function(req,res,next){
	session_store=req.session;
	session_nik=req.session;
	session_password = req.session;

	req.assert('txtNik', 'Please fill the Username').notEmpty();
	req.assert('txtNik', 'NIK not valid').isNumeric();
	req.assert('txtPassword', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();
	if (!errors) 
	{
		req.getConnection(function(err,connection)
		{
			v_pass = req.sanitize( 'txtPassword' ).escape().trim(); 
			v_nik = req.sanitize( 'txtNik' ).escape().trim();
			
			var query = connection.query('select * from table_akademik where nik_akademik="'+v_nik+'" and password=md5("'+v_pass+'")',function(err,rows)
			{

				if(err)
				{

					//jika error
					var errornya  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					console.log("NIK Akademik : " + v_nik);
					console.log("Password Akademik : " + v_pass);
					req.flash('msg_error', errornya); 
					res.redirect('/login'); 
				}

				else
				{
					//jika berhasil login

					if(rows.length <=0)
					{

						req.flash('msg_error', "Wrong NIK address or password. Try again."); 

						console.log("NIK Akademik : " + v_nik);
						console.log("Password Akademik : " + v_pass);
						res.redirect('/login');
					}

					else

					{	
						console.log("NIK Akademik : " + rows[0].nik_akademik);
						console.log("Password Akademik : " + rows[0].password);
						console.log("Status : " + rows[0].status);

						session_store.is_login = true;
						session_nik.is_login_nik = v_nik;
						
						var ex_password_akademik = rows[0].password;
						session_password.is_login_password = ex_password_akademik;

						res.redirect('/depot/auth_akademik');
					}
				}

			});


		});
	}

	else
	{
		errors_detail = "<p>Sory there are error ya</p><ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/login_dosen'); 
	}
});

router.get('/blankpage', function(req, res, next) {
var waktu = moment().format('MMMM Do YYYY, h:mm:ss a');	
  res.render('blankpage', { title: waktu }); 
});

module.exports = router;