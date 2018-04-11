var express = require('express');
var router = express.Router();
var moment = require('moment');
var randomstring = require('randomstring');
var authentication_mdl = require('../middlewares/authentication');
var apiKey = 'dM3b9lcUMk6YMLbW1a2_EvjdpyqvpkZVpfTJp23vRJv'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
/* GET Customer page. */

/*router.get('/',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM pengisian where id_admin= 5',function(err,rows, fields)
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
});*/

router.get('/getPengisian', function(req, res, next) {

moment.locale('id');
v_berat = req.param('berat');
v_status_lampu = req.param('status_lampu'); //toren besar
v_harga = 5000;
v_jam = moment().format('LTS');
v_tanggal = moment().format('LL');
v_id_admin = 5; 

var id = "Peng-";
var lasttime = v_jam.substr(v_jam.length - 1);
var random = randomstring.generate(7);

v_id_pengisian = id + random+ lasttime ; 


console.log("Ambil Data : " +"| Berat : " + v_berat + "| Lampu : " + v_status_lampu + "| Harga : " + v_harga + "| Tanggal : " + v_tanggal
	+ "| Jam : " + v_jam + " " + v_id_pengisian);

res.send("You are alive!");


var valuePengisian = {
			id: v_id,
			id_pengisian: v_id_pengisian,
			id_admin: '5',
			date_pengisian:'123',
			time:'1231',
			harga: '123',
			berat: '123'
		}

		var insert_pengisian = 'INSERT INTO pengisian SET ?';

		req.getConnection(function(err,connection){
			var queryTorenBesar = connection.query(insert_pengisian, valuePengisian, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Toren Besar");
				}
				else
				{
				console.log("Sukses ambil dan simpan data Toren Besar");
				}		
			});
		});
});

router.get('/getTangkiAirData/:sensor1/:sensor2', function(req, res, next) {


v_sensor1 = req.param('sensor1');
v_sensor2 = req.param('sensor2');

var kontenTorenKecil = {
			ketinggian:v_sensor2,
			time:4,
			date:5,
			id_admin:1,
			jenis_toren: 'Toren 2'
		}

var kontenTorenBesar = {
			ketinggian:v_sensor1,
			time:4,
			date:5,
			id_admin:1,
			jenis_toren: 'Toren 1'
		}

if(v_sensor1!=0 && v_sensor2!=0)
{
				var insert_data_toren_kecil = 'INSERT INTO toren SET ?';
				req.getConnection(function(err,connection){
					var query = connection.query(insert_data_toren_kecil, kontenTorenKecil,function(err,result)
					{
						if(err)
						{
							console.log("Gagal ambil dan simpan data Toren");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren");
						}						

					});
			        //console.log(query.sql);
			     });

				var insert_data_toren_besar = 'INSERT INTO toren SET ?';
				req.getConnection(function(err,connection){
					var query = connection.query(insert_data_toren_besar, kontenTorenBesar,function(err,result)
					{
						if(err)
						{
							console.log("Gagal ambil dan simpan data Toren");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren");
						}						

					});
			        //console.log(query.sql);
			     });				
}

else
{
console.log("Tidak ada nilai sensor yang diterima");		
}
res.send("You are alive!");
});

router.get('/getIFTTT/:order', function(req, res) {

var ambil_sensor = req.param('order');

v_date	= moment().format('LL');
v_time = moment().format('LTS');

var kontenSMSPass = {
//			id: v_id,
			no_telp_pengirim: '123',
			time:v_time,
			date:v_date,
			isi_sms: 'halohaloooo',
			status_sms: 'pass'
		}

var kontenSMSUpdate = {
			status_sms: 'full'
		}

var kontenSMSFull = {
//			id: v_id,
			no_telp_pengirim: '123',
			time:v_time,
			date:v_date,
			isi_sms: 'halohaloooo',
			status_sms: 'full'
		}

if(ambil_sensor=='pass')
{ 
		        console.log("Data ID : " + ambil_sensor);
		        res.send("Data ID : "+ ambil_sensor);

				var insert_konten_sms = 'INSERT INTO sms_pengirim SET ?';
				req.getConnection(function(err,connection){
					var query = connection.query('SELECT * FROM sms_pengirim where status_sms="pass"',function(err,rows)
					{
					    if(rows.length >=1 )
						{
							console.log("SMS sedang diproses kirim");
						}

						else if (rows.length <= 0)
						{	
							console.log("Belum ada kiriman sms");

							var queryInsert = connection.query(insert_konten_sms, kontenSMSPass,function(err,result)
							{
									if(err)
									{
									console.log("Gagal ambil dan simpan data SMS");
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

										var request = {
								          event: 'apa',
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
											console.log("Sukses kirim dan simpan data SMS");
								            console.log('Request was sent');
								          }  
							        });
									}
							});
						}

						else
						{
							console.log("SMS isn't work to showed");
						}

				        /*if(((rows[0].status_sms)=='pass') < 2) //tes baca rows database
				        	{console.log("Data Muncul");}

				        else if (((rows[0].status_sms)=='pass') > 1 )
				        {
				        	console.log("Banyak Data");
				        }
				        else
				        {
				        	{console.log("Data Ga ada");}				        	
				        }*/
					});
			        //console.log(query.sql);
			     });
}

else if(ambil_sensor=='full') 
{
		        console.log("Data ID : " + ambil_sensor);
		        res.send("Data ID : "+ ambil_sensor);

				var insert_konten_sms = 'INSERT INTO sms_pengirim SET ?';	
				var insert_update_status_sms = 'update sms_pengirim SET ? where status_sms ="pass"';
				req.getConnection(function(err,connection){
				var queryInsert = connection.query(insert_konten_sms, kontenSMSFull,function(err,result)
				{
						if(err)
							{
								console.log("Gagal ambil dan simpan data SMS");

							}
						else
							{
								console.log("Sukses kirim dan simpan data SMS");

							}
					});

				var queryUpdate = connection.query(insert_update_status_sms, kontenSMSUpdate,function(err,result)
				{
						if(err)
							{
								console.log("Gagal update data SMS");

							}
						else
							{
								console.log("Sukses update status SMS");

							}
					});
			        //console.log(query.sql);
			     });
}


else
{
        console.log("uppps parameter salah");
        res.send("uppps parameter salah");
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
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data:rows,session_store:req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/inbox',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM sms_pengirim',function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/inbox',{title:"DAIM Otomatis",data:rows,session_store:req.session});
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
			res.render('depot/pengisian',{title:"DAIM Otomatis",data:rows,session_store:req.session});   
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

router.get('/',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM pengisian limit 4',function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			res.render('depot/main_page',{title:"DAIM Otomatis",data:rows,session_store:req.session});   
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
		var query = connection.query('SELECT * FROM toren limit 4',function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			res.render('depot/main_page',{title:"DAIM Otomatis",data:rows,session_store:req.session});   
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
        //console.log(query.sql);
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
					console.log(rows.username);
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
	}
	else{

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
