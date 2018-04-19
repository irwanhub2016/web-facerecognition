var express = require('express');
var router = express.Router();
var moment = require('moment');
var randomstring = require('randomstring');
var md5 = require('md5');
var authentication_mdl = require('../middlewares/authentication');
var apiKey = 'dM3b9lcUMk6YMLbW1a2_EvjdpyqvpkZVpfTJp23vRJv'; //untuk IFTTT
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
/* GET Customer page. */

router.get('/account',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM admin',function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			res.render('depot/list',{title:"Depot Air Minum",data:rows,session_store:req.session});

		});
        console.log(query.sql);
     });
});

router.get('/getPengisian/:berat/:status_lampu', function(req, res) {

moment.locale('id');
var v_berat = req.param('berat');
var v_status_lampu = req.param('status_lampu'); //toren besar
v_harga = 5000;
v_jam = moment().format('LTS');
v_tanggal = moment().format('LL');
v_id_admin = 5; 

var id_unik = "Peng-";
var lasttime = v_jam.substr(v_jam.length - 1);
var random = randomstring.generate(7);

v_id_pengisian = id_unik + random+ lasttime ;

var valuePengisian = {
			id_pengisian: v_id_pengisian,
			id_admin: '5',
			date_pengisian:v_tanggal,
			time:v_jam,
			harga: '5000',
			berat: v_berat
		}
var valueLampu = {
			time:v_jam,
			status_lampu: v_status_lampu
		}

		var insert_pengisian = 'INSERT INTO pengisian SET ?';
		var update_lampu = 'update lampu SET ? where id_lampu=1';

		req.getConnection(function(err,connection){
			var queryPengisian = connection.query(insert_pengisian, valuePengisian, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Pengisian");
				}
				else
				{
				console.log("Sukses ambil dan simpan data Pengisian");
				}		
			});
			var queryLampu = connection.query(update_lampu, valueLampu, function(err, result){
				if(err)
				{
				console.log("Gagal ambil dan simpan data Lampu");
				}
				else
				{
				console.log("Sukses ambil dan simpan data Lampu");
				}		
			});
		});

console.log("Ambil Data : " +"| Berat : " + v_berat + "| Lampu : " + v_status_lampu 
	+ "| Harga : " + v_harga + "| Tanggal : " + v_tanggal + "| Jam : " + v_jam + " " + v_id_pengisian);
res.send("You are alive!");
});

router.get('/getPengisian2/:berat/:status_lampu', function(req, res) {

moment.locale('id');
var v_berat = req.param('berat');
var v_status_lampu = req.param('status_lampu'); //toren besar
v_harga = 5000;
v_jam = moment().format('LTS');
v_tanggal = moment().format('LL');
v_id_admin = 5; 

var id = "Peng-";
var lasttime = v_jam.substr(v_jam.length - 1);
var random = randomstring.generate(7);

/*v_id_pengisian = id + random+ lasttime ; 

var valuePengisian = {
			id: v_id,
			id_pengisian: v_id_pengisian,
			id_admin: '5',
			date_pengisian:v_tanggal,
			time:v_jam,
			harga: '5000',
			berat: v_berat
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
		});*/


//console.log("Ambil Data : " +"| Berat : " + v_berat + "| Lampu : " + v_status_lampu + "| Harga : " + v_harga + "| Tanggal : " + v_tanggal
//	+ "| Jam : " + v_jam + " " + v_id_pengisian);

res.send("You are alive!");
});

router.get('/getTangkiAirData/:sensor1/:sensor2', function(req, res, next) {

var v_sensor1 = req.params.sensor1;
var v_sensor2 = req.params.sensor2;
v_jam = moment().format('LTS');
v_tanggal = moment().format('LL');


var kontenTorenKecil = {
			ketinggian:v_sensor2,
			time:v_jam,
			date:v_tanggal,
			id_admin:'5',
			jenis_toren: 'Toren 2'
		}

var kontenTorenBesar = {
			ketinggian:v_sensor1,
			time:v_jam,
			date:v_tanggal,
			id_admin:'5',
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
							console.log("Gagal ambil dan simpan data Toren sedang");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren sedang");
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
							console.log("Gagal ambil dan simpan data Toren besar");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren besar");
						}						

					});
			        console.log(query.sql);
			     });				
}

else
{
console.log("Tidak ada nilai sensor yang diterima");		
}
res.send("You are alive!");
next();
});

router.get('/getIFTTT/:order', function(req, res, next) {

var ambil_sensor = req.params.order;

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

										console.log("Sukses kirim dan simpan data SMS");

										/*var request = {
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
								            console.log('Request was sent');
								          }  
							        	  });*/
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
			     console.log(query.sql);
			     });
}


else
{
        console.log("uppps parameter salah");
        res.send("uppps parameter salah");
}

});


/*router.get('/tangki_air', function(req, res, next) {
	//var personList = [];
	/*req.getConnection(function(err,connection){
	var sql = 'select *from toren where id_monitoring_toren = 7;';
		var query = connection.query(sql,function(err,rows3, fields)
		{

		var person;

	  	if (err) 
	  	{
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} 
	  	else 
	  	{

	  		if(rows3.length==1) 
	  		{

	  			var person = {
		  			'ketinggian':rows3[0].ketinggian,
		  			'date':rows3[0].date,
		  			'time':rows3[0].time,
		  			'id':rows3[0].id_monitoring_toren
		  		}

		  		res.render('depot/tangki_air', {"person": person});
	  		} 
	  		else 
	  		{
	  			res.status(404).json({"status_code":404, "status_message": "Not found"});
	  		}
	  	}
		});
     });*/
	
	/*req.getConnection(function(err,connection){
	var sql = 'select *from toren where id_monitoring_toren = 7;';
	var sql_lampu = 'select *from lampu where id_admin = 5;';
		var query2 = connection.query(sql_lampu,function(err,rows4, fields)
		{

		var person2;

	  	if (err) 
	  	{
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} 
	  	else 
	  	{

	  		if(rows4.length==1) 
	  		{

	  			var person2 = {
		  			'id_admin':rows4[0].id_admin,
		  			'time':rows4[0].time,
		  			'status_lampu':rows4[0].status_lampu,
		  			'id_lampu':rows4[0].id_lampu
		  		}

		  		res.render('depot/tangki_air', {"person2": person2});
	  		} 
	  		else 
	  		{
	  			res.status(404).json({"status_code":404, "status_message": "Not found"});
	  		}
	  	}
		});

		var query = connection.query(sql,function(err,rows3, fields)
		{

		var person;

	  	if (err) 
	  	{
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} 
	  	else 
	  	{

	  		if(rows3.length==1) 
	  		{

	  			var person = {
		  			'ketinggian':rows3[0].ketinggian,
		  			'date':rows3[0].date,
		  			'time':rows3[0].time,
		  			'id':rows3[0].id_monitoring_toren
		  		}

		  		res.render('depot/tangki_air', {"person": person});
	  		} 
	  		else 
	  		{
	  			res.status(404).json({"status_code":404, "status_message": "Not found"});
	  		}
	  	}
		});
	});

	req.getConnection(function(err,connection){
		var query1 = connection.query('SELECT * FROM toren',function(err,rows1, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			console.log(rows1[0]);
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data1:rows1,session_store:req.session});
		});
        //console.log(query.sql);
     });

});*/

router.get('/', function(req, res, next) {
	var personList = [];
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM toren limit 4;SELECT * FROM pengisian limit 4;SELECT * FROM lampu where id_lampu = 1;SELECT * FROM pengisian;SELECT SUM(harga) as 'Count' FROM pengisian";
		var query = connection.query(sql,function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			console.log("pengisian Records:- " + rows[0]);
			console.log("toren Records:- " + rows[1]);
			console.log("lampu Records:- " + rows[2]);
			console.log("Count Pengisian Records:- " + rows[3].length);
			console.log("Sum Pengisian Records:- " + fields[4]);
			var count_transaksi = rows[3].length;
			var sum_transaksi = rows[4];
			res.render('depot/main_page',{title:"DAIM PINTAR",data_toren:rows[0],data_pengisian:rows[1],data_lampu:rows[2],count_transaksiData:count_transaksi,count_transaksiSum:sum_transaksi,session_store:req.session});   
		});
        console.log(query.sql);
     });
});

router.get('/tangki_air',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM toren;select ketinggian from toren where jenis_toren='Toren 2' order by id_admin desc limit 1;select ketinggian from toren where jenis_toren='Toren 1' order by id_admin desc limit 1";		
		var query = connection.query(sql,['','',''],function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			console.log("List Records:- " + rows[0]);
			console.log("Toren Besar Records:- " + rows[1]);
			console.log("Toren Sedang Records:- " + rows[2]);
			req.flash('msg_error', errornya);
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data1:rows[0],data2:rows[1],data3:rows[2],session_store:req.session});          	
		});
		console.log(query.sql);
		//limit ketinggian toren besar select ketinggian from toren where jenis_toren='Toren 1' order by id_admin desc limit 1;
		//limit ketinggia toren sedang select ketinggian from toren where jenis_toren='Toren 2' order by id_admin desc limit 1;
     });
});

router.get('/inbox',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM sms_pengirim WHERE status_sms = ?;SELECT * FROM sms_pengirim";
		var query = connection.query(sql,['full',''],function(err,rows, fields)
		{
			if(err)
				var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);   
			console.log("Count Records:- " + rows[0].length);
			console.log("Select Records:- " + rows[1]);
			var count_stat = rows[0].length;
			res.render('depot/inbox',{title:"DAIM Otomatis",count:count_stat,data:rows[1],session_store:req.session});
		});
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
			res.render('depot/pengisian',{title:"DAIM PINTAR",data:rows,session_store:req.session});  
		});
         console.log(query.sql);
     });
});

router.get('/',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM toren limit 4;SELECT * FROM pengisian limit 4;SELECT * FROM lampu where id_lampu = 1;SELECT * FROM pengisian;SELECT SUM(harga) as 'Count' FROM pengisian";
		var query = connection.query(sql,function(err,rows, fields)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			console.log("pengisian Records:- " + rows[0]);
			console.log("toren Records:- " + rows[1]);
			console.log("lampu Records:- " + rows[2]);
			console.log("Count Pengisian Records:- " + rows[3].length);
			console.log("Sum Pengisian Records:- " + fields[4]);
			var count_transaksi = rows[3].length;
			var sum_transaksi = rows[4];
			res.render('depot/main_page',{title:"DAIM PINTAR",data_toren:rows[0],data_pengisian:rows[1],data_lampu:rows[2],count_transaksiData:count_transaksi,count_transaksiSum:sum_transaksi,session_store:req.session});   
		});
        console.log(query.sql);
         //console.log('The solution is: ', rows[0].username)
     });
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

router.put('/edit/(:id_admin)',authentication_mdl.is_login, function(req,res,next){
	req.assert('email', 'Please fill the email').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		v_username = req.sanitize( 'username' ).escape().trim(); 
		v_email = req.sanitize( 'email' ).escape().trim();
		v_passwordX = req.sanitize( 'password' ).escape().trim();
		v_password = md5(v_passwordX);
		console.log(v_password);
		
		var admin = {
			username: v_username,
			email: v_email,
			password: v_password
		}

		var update_sql = 'update admin SET ? where id_admin = '+req.params.id_admin;
		req.getConnection(function(err,connection){
			var query = connection.query(update_sql, admin, function(err, result){
				if(err)
				{
					var errors_detail  = ("Error Update : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('depot/edit', 
					{ 
						username: req.param('username'), 
						email: req.param('email'),
						password: req.param('password'),
					});
				}
				else
				{
					req.flash('msg_info', 'Update success'); 
					res.redirect('/depot/edit/'+req.params.id_admin);
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
			email: req.param('email'), 
			username: req.param('username')
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

/*router.get('/add', function(req, res, next) {
	res.render(	'depot/add-admin', 
	{ 
		title: 'Add New Admin',
		name: '',
		email: '',
		phone:'',
		address:''
	});
});*/

module.exports = router;
