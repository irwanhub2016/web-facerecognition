var express = require('express');
var router = express.Router();
var moment = require('moment');
var authentication_mdl = require('../middlewares/authentication');
var apiKey = 'kCGM6nsJ6XUHt8FclKDFywoLixMnMrhB15Ll75Fuc9Z'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
/* GET Customer page. */

router.get('/',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM admin where id_admin= 5',function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/main_page',{title:"Depot Air Minum",data:rows,session_store:req.session});
	        console.log('The solution is: ', rows[0].username);
	        if((rows[0].username)=='admin') //tes baca rows database
	        	{console.log("Your Success ! " + moment().format('dddd'));}
		});
        console.log(query.sql);
     });
});

router.get('/getPengisian', function(req, res, next) {

v_berat = req.param('berat');
v_status_lampu = req.param('status_lampu'); //toren besar

console.log("Ambil Data : " + v_berat + v_status_lampu);
res.send("You are alive!");
});

router.get('/getTangkiAirCoba', function(req, res, next) {


v_sensor1 = req.param('sensor1');
v_sensor2 = req.param('sensor2'); //toren besar

console.log("Ambil Data : " + v_sensor1 + v_sensor2);
res.send("You are alive!");
});

router.get('/getIFTTT/:order', function(req, res) {

var ambil_sensor = req.param('order');

		if(ambil_sensor=='send')
		{ 
		        console.log("Data ID : " + ambil_sensor);
		        res.send("Data ID : "+ ambil_sensor);

				req.getConnection(function(err,connection){
					var query = connection.query('SELECT * FROM sms_pengirim where status_sms="pass"',function(err,rows, fields)
					{
						//if(err)
						//	var errornya  = ("Error Selecting : %s ",err );   
						//req.flash('msg_error', errornya);   
						//res.render("You are alive!");
						//res.render('customer/list',{title:"depot",data:rows,session_store:req.session});
				        console.log('The solution is: ', rows[0].status_sms);
				        if((rows[0].status_sms)=='pass') //tes baca rows database
				        	{console.log("Data Muncul");}
				        else
				        {
				        	{console.log("Data Ga ada");}				        	
				        }
					});
			        console.log(query.sql);
			     });

		        /*var request = {
		          event: 'pesangalon',
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
} 

else
{
        console.log("uppps ");
        res.send("uppps");
}
});

router.get('/getTangkiAir', function(req, res, next) {

//router.get('/watchdog/(:id)/(:username)/(:password)/(:full_name)', function(req, res) {

//v_id = req.params.id;

v_sms = req.param('sms');
v_sensor1 = req.param('sensor1'); //toren besar
v_sensor2 = req.param('sensor2'); //toren sedang
//v_full_name = req.params.full_name;

v_id_admin = "1";
v_id_torenBesar= "TR001";
v_id_torenSedang= "TR002";
v_date="";
v_time="";

var torenBesar = {
//			id: v_id,
			ketinggian: v_sensor1,
			time:v_time,
			date:v_date,
			id_toren: v_id_torenBesar,
			id_admin: v_id_admin
		}

var torenSedang = {
//			id: v_id,
			ketinggian: v_sensor2,
			time:v_time,
			date:v_date,
			id_toren: v_id_torenSedang,
			id_admin: v_id_admin
		}		

var SMS = {
//			id: v_id,
			ketinggian: v_sensor1,
			time:v_time,
			date:v_date,
			id_toren: v_id_torenBesar,
			id_admin: v_id_admin
		}

		var insert_sql_toren_besar = 'INSERT INTO toren SET ?';
		var insert_sql_toren_sedang = 'INSERT INTO toren SET ?';
		var insert_sql_konten_sms = 'INSERT INTO sms_pengirim SET ?';
		req.getConnection(function(err,connection){
			var queryTorenBesar = connection.query(insert_sql_toren_besar, torenBesar, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Toren Besar");
					/*var errors_detail  = ("Error Insert : %s ",err );   
					req.flash('msg_error', errors_detail);
					//req.send("Maaf error"); 
					res.render('customer', 
					{ 
						/*name: req.param('name'), 
						address: req.param('address'),
						email: req.param('email'),
						phone: req.param('phone'),*/
					//});
				}
				else
				{
				console.log("Sukses ambil dan simpan data Toren Besar");
					//req.flash('msg_info', 'Create customer success'); 
					//res.redirect('/depot');
				}		
			});

			var queryTorenSedang = connection.query(insert_sql_toren_sedang, torenSedang, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Toren Sedang");
				}
				else
				{
				console.log("Sukses ambil dan simpan data Toren Sedang");
					//req.flash('msg_info', 'Create customer success'); 
					//res.redirect('/depot');
				}		
			});

			var querySms = connection.query(insert_sql_konten_sms, SMS, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data SMS");
				}
				else
				{
				console.log("Sukses ambil dan simpan data SMS");
					//req.flash('msg_info', 'Create customer success'); 
					//res.redirect('/depot');
				}		
			});
		});
//  var t = moment.duration(parseInt(req.param('uptime')), 'milliseconds')
  //var _message = req.param('ip') + " uptime " + t.hours() + "h " + t.minutes() + "m " + t.seconds() +"s";
console.log("watchdog from " + v_username + v_password + v_full_name);
res.send("You are alive!");
});

/*router.get('/pengisian',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM tbl_users',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/pengisian',{title:"depot",data:rows});
		});
         //console.log(query.sql);
     });
});*/

router.get('/tangki_air',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM toren',function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/tangki_air',{title:"depot",data:rows,session_store:req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/inbox',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM toren',function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/tangki_air',{title:"depot",data:rows,session_store:req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/pengisian',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM pengisian',function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			res.render('depot/pengisian',{title:"depot",data:rows,session_store:req.session});   
			/*for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var person = {
		  			'id_pengisian':rows[i].id_pengisian,
		  			'date':rows[i].date,
		  			'time':rows[i].time,
		  			'harga':rows[i].harga,		  					  			
		  			'berat':rows[i].berat,
		  			'id_admin':rows[i].id_admin
		  		}
		  		// Add object into array
		  		personList.push(person);
	  	}
	  	res.render('customer/pengisian', {"personList": personList});*/
		});
         console.log(query.sql);
         //console.log('The solution is: ', rows[0].username)
     });
  //res.render('customer/pengisian', { title: ' Pengisian Air' });
});

router.delete('/delete/:id_admin',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var admin = {
			id_admin: req.params.id_admin,
		}
		
		var delete_sql = 'delete from admin where ?';
		req.getConnection(function(err,connection){
			var query = connection.query(delete_sql, admin, function(err, result){
				if(err)
				{
					var errors_detail  = ("Error Delete : %s ",err);
					req.flash('msg_error', errors_detail); 
					res.redirect('/depot');
				}
				else{
					req.flash('msg_info', 'Delete Success'); 
					res.redirect('/depot');
				}
			});
		});
	});
});

router.get('/edit/(:id_admin)',authentication_mdl.is_login, function(req,res,next){
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM admin where id_admin='+req.params.id_admin,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );  
				req.flash('msg_error', errors_detail); 
				res.redirect('/depot'); 
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Admin can't be find!"); 
					res.redirect('/depot');
				}
				else
				{	
					console.log(rows);
					res.render('depot/edit',{title:"Edit ",data:rows[0]});

				}
			}

		});
	});
});
router.put('/edit/(:id)',authentication_mdl.is_login, function(req,res,next){
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		v_name = req.sanitize( 'name' ).escape().trim(); 
		v_email = req.sanitize( 'email' ).escape().trim();
		v_address = req.sanitize( 'address' ).escape().trim();
		v_phone = req.sanitize( 'phone' ).escape();

		var depot = {
			name: v_name,
			address: v_address,
			email: v_email,
			phone : v_phone
		}

		var update_sql = 'update tbl_users SET ? where id = '+req.params.id;
		req.getConnection(function(err,connection){
			var query = connection.query(update_sql, depot, function(err, result){
				if(err)
				{
					var errors_detail  = ("Error Update : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('depot/edit', 
					{ 
						name: req.param('name'), 
						address: req.param('address'),
						email: req.param('email'),
						phone: req.param('phone'),
					});
				}else{
					req.flash('msg_info', 'Update success'); 
					res.redirect('/depot/edit/'+req.params.id);
				}		
			});
		});
	}else{

		console.log(errors);
		errors_detail = "<p>Sory there are error</p><ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		req.flash('msg_error', errors_detail); 
		res.render('depot/add-admin', 
		{ 
			name: req.param('name'), 
			address: req.param('address')
		});
	}
});

router.post('/add',authentication_mdl.is_login, function(req, res, next) {
	req.assert('username', 'Please fill the name').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {

		v_username = req.sanitize( 'username' ).escape().trim(); 
		v_password = req.sanitize( 'password' ).escape().trim();
		v_email = req.sanitize( 'email' ).escape().trim();
		v_full_name = req.sanitize( 'full_name' ).escape();

		var depot = {
			username: v_username,
			password: v_password,
			email: v_email,
			full_name : v_full_name
		}

		var insert_sql = 'INSERT INTO tbl_users SET ?';
		req.getConnection(function(err,connection){
			var query = connection.query(insert_sql, depot, function(err, result){
				if(err)
				{
					var errors_detail  = ("Error Insert : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('depot/add-admin', 
					{ 
						name: req.param('name'), 
						address: req.param('address'),
						email: req.param('email'),
						phone: req.param('phone'),
					});
				}else{
					req.flash('msg_info', 'Create success'); 
					res.redirect('/depot');
				}		
			});
		});
	}
	else
	{

		console.log(errors);
		errors_detail = "<p>Sory there are error</p><ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		req.flash('msg_error', errors_detail); 
		res.render('depot/add-admin', 
		{ 
			name: req.param('name'), 
			address: req.param('address')
		});
	}

});

router.get('/add', function(req, res, next) {
	res.render(	'depot/add-admin', 
	{ 
		title: 'Add New Admin',
		name: '',
		email: '',
		phone:'',
		address:''
	});
});

module.exports = router;
