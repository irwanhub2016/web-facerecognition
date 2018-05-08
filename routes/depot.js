var express = require('express');
var router = express.Router();
var moment = require('moment');
var randomstring = require('randomstring');
var md5 = require('md5');
var authentication_mdl = require('../middlewares/authentication');
var apiKey = 'kCGM6nsJ6XUHt8FclKDFywoLixMnMrhB15Ll75Fuc9Z'; //untuk IFTTT
/*
kCGM6nsJ6XUHt8FclKDFywoLixMnMrhB15Ll75Fuc9Z -> irwansyarifudin16@gmail.com

*/
var IFTTTMaker = require('iftttmaker')(apiKey);
var session_store;
var notif_pesanan_proses="pesanan sedang diproses";
var notif_tangki_full="Tangki air masih penuh";


router.get('/account',authentication_mdl.is_login, function(req, res, next) {
	
	console.log(req.session.is_login_email);

	var SessionEmail = req.session.is_login_email;

	var valueAdmin = {
			email:SessionEmail
		}

	var select_admin = 'SELECT * FROM admin where ?';
	req.getConnection(function(err,connection){
		var query = connection.query(select_admin,valueAdmin,function(err,rows, fields)
		{
			if(err)
			{	var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			}

			else if(rows.length ==0)
			{res.render('depot/list',{title:"Depot Air Minum",pass:notif_tangki_full,data:rows,session_store:req.session});
			}

			else if(rows.length >=1)
			{res.render('depot/list',{title:"Depot Air Minum",pass:notif_pesanan_proses,data:rows,session_store:req.session});
			}
		});
     });
});

router.get('/getPengisian', function(req, res, next) {

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
			berat: '50'
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

res.send(req.params);
next();
});

router.get('/getTangkiAirData', function(req, res) {

moment.locale('id');
var v_sensor1 = req.param('sensor1');
var v_sensor2 = req.param('sensor2');
var v_status_full = req.param('order');

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

var kontenSMSUpdate = {
			status_sms: 'full'
		}

console.log("Status SMS : " + v_status_full + "\r");

if(v_sensor1!=0 && v_sensor2!=0 && v_status_full=='full')
{

				var insert_data_toren_kecil = 'INSERT INTO toren SET ?';
				req.getConnection(function(err,connection){
					var queryTorenSedang = connection.query(insert_data_toren_kecil, kontenTorenKecil,function(err,result)
					{
						if(err)
						{
							console.log("Gagal ambil dan simpan data Toren sedang\r");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren sedang\r");
						}						

					});
			        console.log(queryTorenSedang.sql);
			     });

				var insert_data_toren_besar = 'INSERT INTO toren SET ?';
				req.getConnection(function(err,connection){
					var queryTorenBesar = connection.query(insert_data_toren_besar, kontenTorenBesar,function(err,result)
					{
						if(err)
						{
							console.log("Gagal ambil dan simpan data Toren besar\r");
						}
						else
						{
							console.log("Sukses kirim dan simpan data Toren besar\r");
						}						

					});
			        console.log(queryTorenBesar.sql);
			     });				

	        	var select_sms_pass = 'SELECT * FROM sms_pengirim where status_sms="pass"';	
				var insert_update_status_sms = 'update sms_pengirim SET ? where status_sms ="pass"';
				req.getConnection(function(err,connection){
				var querySelectFull = connection.query(select_sms_pass,function(err,result,fields)
				{
						if(err)
						{
								console.log("Gagal Eksekusi Database!\r");
						}

						else if( result.length <=0 )
						{
								console.log("SMS sudah di-update. Kondisi Tangki Belum Habis.\r");
						}

						else if( result.length >=1 )	
						{

								var queryUpdateFull = connection.query(insert_update_status_sms, kontenSMSUpdate,function(err,result,fields)
								{
										if(err)
										{
										console.log("Gagal update SMS");
										}
										else
										{

										console.log("Sukses update status SMS\r");
										}
								});							
						}							

						else
						{
								console.log("Null\r");
						}
					});	

  		     	});
}

else
{
console.log("Ups, parameter ada yang salah\r");		
}
res.send("yess !");
//next()
});

router.get('/getIFTTT', function(req, res, next) {

var v_sensor1 = req.param('sensor1');
var v_sensor2 = req.param('sensor2');
var ambil_sensor = req.param('order');

v_date	= moment().format('LL');
v_time = moment().format('LTS');

var kontenSMSPass = {

			no_telp_pengirim: '123',
			time:v_time,
			date:v_date,
			isi_sms: 'halohaloooo',
			status_sms: 'pass'
		}

var updateNilaiTorenBesar = {
			ketinggian: v_sensor1
		}

var updateNilaiTorenSedang = {
			ketinggian: v_sensor2
		}

if(ambil_sensor=='pass')
{ 
        console.log("Status : " + ambil_sensor);
        console.log("Toren 1 : " + v_sensor1);
        console.log("Toren 2 : " + v_sensor2);
        res.send("Status : "+ ambil_sensor);

		var insert_konten_sms = 'INSERT INTO sms_pengirim SET ?';
		req.getConnection(function(err,connection)
		{
				
				if(err)
				var errornya  = ("Error Selecting : %s ",err );   
				req.flash('msg_error', errornya);
				
						var query = connection.query('SELECT * FROM sms_pengirim where status_sms="pass"',function(err,rows, fields)
						{
						    if(rows.length >=1 )
							{

								var QueryUpdateNilaiTorenBesar = connection.query('update toren set ? where jenis_toren="Toren 1" order by id_admin desc limit 1',updateNilaiTorenBesar,function(err,rows, fields)
								{

										if(err)
										{
										console.log("Gagal update Tinggi Toren Besar");
										}
										else
										{

										console.log("Sukses update Tinggi Toren Besar");
										}
								});

								var QueryUpdateNilaiTorenSedang = connection.query('update toren set ? where jenis_toren="Toren 1" order by id_admin desc limit 1',updateNilaiTorenSedang,function(err,rows, fields)
								{

										if(err)
										{
										console.log("Gagal update Tinggi Toren Sedang");
										}
										else
										{

										console.log("Sukses update Tinggi Toren Sedang");
										}
								});
								console.log("SMS sedang diproses kirim");
							}

							else if (rows.length <= 0)
							{	
								console.log("Belum ada kiriman sms");

								var queryInsert = connection.query(insert_konten_sms, kontenSMSPass,function(err,result, fields)
								{
										if(err)
										{

										console.log("Gagal ambil dan simpan data SMS");

										}

										else
										{

											var QueryUpdateNilaiTorenBesar = connection.query('update toren set ? where jenis_toren="Toren 1" order by id_admin desc limit 1',updateNilaiTorenBesar,function(err,rows, fields)
											{

													if(err)
													{
													console.log("Gagal update Tinggi Toren Besar");
													}
													else
													{

													console.log("Sukses update Tinggi Toren Besar");
													}
											});

											var QueryUpdateNilaiTorenSedang = connection.query('update toren set ? where jenis_toren="Toren 2" order by id_admin desc limit 1',updateNilaiTorenSedang,function(err,rows, fields)
											{

													if(err)
													{
													console.log("Gagal update Tinggi Toren Sedang");
													}
													else
													{

													console.log("Sukses update Tinggi Toren Sedang");
													}
											});

											console.log("Sukses kirim dan simpan data SMS");

											var validasiJam = moment().format('HH');
											
											if(validasiJam < 11 && validasiJam >= 1)
											{
												console.log("Selamat Pagi. Pengiriman SMS Otomatis pemesanan air akan dikirim");												
												
												var waktuPagi = 'pagi';

												var request = {
										          event: 'pesangalon',
										          values: {
										            value1: waktuPagi
										          }
										        };
      											triggerIFTTT();
											}

											else if (validasiJam < 15 && validasiJam > 11) 

											{
											console.log("Selamat Siang. Pengiriman SMS Otomatis pemesanan air akan dikirim");

												var waktuSiang = 'siang';

												var request = {
										          event: 'pesangalon',
										          values: {
										            value1: waktuSiang
										          }
										        };
												triggerIFTTT();										        
											}	

											else if (validasiJam < 19 && validasiJam > 15) 

											{
											console.log("Selamat Sore. Pengiriman SMS Otomatis pemesanan air akan dikirim");												
												
												var waktuSore = 'sore';

												var request = {
										          event: 'pesangalon',
										          values: {
										            value1: waktuSore
										          }
										        };

												triggerIFTTT();	
											}

											else if (validasiJam < 24 && validasiJam >= 19) 

											{
											console.log("Selamat Malam. Pengiriman SMS Otomatis pemesanan air akan dikirim");

												var waktuMalam = 'malam';

												var request = {
										          event: 'pesangalon',
										          values: {
										            value1: waktuMalam
										          }
										        };
												triggerIFTTT();
											}

											function triggerIFTTT()
											{

												/*var request = {
										          event: 'pesangalon2018',
										          values: {
										            value1: 'siang'
										          }
										        };*/

										        IFTTTMaker.send(request, function (error) {
										          if (error) 
										          {
										            console.log('Maaf. Request pengiriman SMS gagal:', error);
										          } 
										          else 
										          {
										            console.log('Selamat ! SMS otomatis berhasil dikirim ke distributor air.');
										          }  
									        	}); 												
											}

										}
								});

							}

							else
							{
								console.log("SMS isn't work to showed");
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

router.get('/',authentication_mdl.is_login,function(req, res, next) {
	var personList = [];
	var SessionEmail = req.session.is_login_email;
	var SessionPhoto = req.session.is_login_photo;

 	req.getConnection(function(err,connection)
	 {
		var sql = "SELECT * FROM toren limit 4;SELECT * FROM pengisian limit 4;SELECT * FROM lampu where id_lampu = 1;SELECT * FROM pengisian;SELECT SUM(harga) as 'Count' FROM pengisian;SELECT * FROM sms_pengirim WHERE status_sms = ?;SELECT * FROM admin where email = ?";
		var query = connection.query(sql,['pass',SessionEmail],function(err,rows, fields)
		{
			console.log("Photo Records: " + SessionPhoto);
			console.log("pengisian Records: " + rows[0]);
			console.log("toren Records: " + rows[1]);
			console.log("lampu Records: " + rows[2]);
			console.log("Count Pengisian Records: " + rows[3].length);
			console.log("Sum Pengisian Records: " + fields[4]);
			console.log("Records Admin : " + rows[6]);

			var count_transaksi = rows[3].length;
			var sum_transaksi = rows[4];

			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );   
				req.flash('msg_error', errornya);
			}
			else if(rows[5].length>=1)
			{	
			res.render('depot/main_page',{title:"DAIM PINTAR",data_photo:SessionPhoto,showAdmin:rows[6],pass:notif_pesanan_proses,data_toren:rows[0],data_pengisian:rows[1],data_lampu:rows[2],count_transaksiData:count_transaksi,count_transaksiSum:sum_transaksi,session_store:req.session});   
			}
			else if(rows[5].length==0)
			{	
			res.render('depot/main_page',{title:"DAIM PINTAR",data_photo:SessionPhoto,showAdmin:rows[6],pass:notif_tangki_full,data_toren:rows[0],data_pengisian:rows[1],data_lampu:rows[2],count_transaksiData:count_transaksi,count_transaksiSum:sum_transaksi,session_store:req.session});
			}			
		});
     });
});

router.get('/tangki_air',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	var SessionEmail = req.session.is_login_email;
	var SessionPhoto = req.session.is_login_photo;
	
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM toren;select ketinggian from toren where jenis_toren='Toren 2' order by id_admin desc limit 1;select ketinggian from toren where jenis_toren='Toren 1' order by id_admin desc limit 1;SELECT * FROM sms_pengirim where status_sms='pass';SELECT * FROM admin where email = ?";		
		var query = connection.query(sql,[SessionEmail],function(err,rows, fields)
		{
			console.log("List Records:- " + rows[0]);
			console.log("Toren Besar Records:- " + rows[1]);
			console.log("Toren Sedang Records:- " + rows[2]);
			console.log("SMS Records:- " + rows[3]);
			console.log("Records Admin : " + rows[4]);

			// bikin validasi kalo status air diproses, tinggi air harusnya kurang dari 10 
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errornya);
			}

			else if(rows[3].length>=1)
			{	
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data_photo:SessionPhoto,showAdmin:rows[4],pass:notif_pesanan_proses,data1:rows[0],data2:rows[1],data3:rows[2],session_store:req.session});   
			console.log(req.session.is_login_email);
			}
			else if(rows[3].length==0)
			{	
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data_photo:SessionPhoto,showAdmin:rows[4],pass:notif_tangki_full,data1:rows[0],data2:rows[1],data3:rows[2],session_store:req.session});
			console.log(req.session.is_login_email);
			}
        	
		});
		console.log(query.sql);
     });
});

router.get('/inbox',authentication_mdl.is_login, function(req, res, next) {

	var SessionEmail = req.session.is_login_email;	
	var SessionPhoto = req.session.is_login_photo;
	
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM sms_pengirim where status_sms='pass';SELECT * FROM sms_pengirim;SELECT * FROM admin where email = ?;SELECT * FROM sms_pengirim where status_sms='full'";
		var query = connection.query(sql,[SessionEmail],function(err,rows, fields)
		{

			console.log("SMS Records:- " + rows[0]);
			console.log("List Records:- " + rows[1]);
			console.log("Admin Records:- " + rows[2]);
			var count_stat = rows[3].length;

			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errornya);
			}

			else if(rows[0].length>=1)
			{	
			res.render('depot/inbox',{title:"DAIM Otomatis",data_photo:SessionPhoto,pass:notif_pesanan_proses,showAdmin:rows[2],count:count_stat,data:rows[1],session_store:req.session});
			}

			else if(rows[0].length==0)
			{	
			res.render('depot/inbox',{title:"DAIM Otomatis",data_photo:SessionPhoto,pass:notif_tangki_full,showAdmin:rows[2],count:count_stat,data:rows[1],session_store:req.session});
			}
		});
         console.log(query.sql);
     });
});

router.get('/pengisian',authentication_mdl.is_login, function(req, res, next) {
	var SessionEmail = req.session.is_login_email;	
	var SessionPhoto = req.session.is_login_photo;

	var personList = [];
	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM pengisian;SELECT * FROM sms_pengirim where status_sms='pass';SELECT * FROM admin where email = ?";
		var query = connection.query(sql,[SessionEmail],function(err,rows, fields)
		{
			console.log("List Records:- " + rows[0]);
			console.log("SMS Records:- " + rows[1]);
			console.log("Admin Records:- " + rows[2]);

			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errornya);
			}

			else if(rows[1].length>=1)
			{	

			res.render('depot/pengisian',{title:"DAIM PINTAR",data_photo:SessionPhoto,showAdmin:rows[2],pass:notif_pesanan_proses,data1:rows[0],session_store:req.session});   
			console.log(req.session.is_login_email);
			}

			else if(rows[1].length==0)
			{	
			res.render('depot/pengisian',{title:"DAIM PINTAR",data_photo:SessionPhoto,showAdmin:rows[2],pass:notif_tangki_full,data1:rows[0],session_store:req.session});
			console.log(req.session.is_login_email);
			}
		});
         console.log(query.sql);
     });
});

router.get('/tangki_air',authentication_mdl.is_login, function(req, res, next) {
	var personList = [];
	var SessionEmail = req.session.is_login_email;
	var SessionPhoto = req.session.is_login_photo;

	req.getConnection(function(err,connection){
		var sql = "SELECT * FROM toren;select ketinggian from toren where jenis_toren='Toren 2' order by id_admin desc limit 1;select ketinggian from toren where jenis_toren='Toren 1' order by id_admin desc limit 1;SELECT * FROM sms_pengirim where status_sms='pass';SELECT * FROM admin where email = ?";		
		var query = connection.query(sql,[SessionEmail],function(err,rows, fields)
		{
			console.log("List Records:- " + rows[0]);
			console.log("Toren Besar Records:- " + rows[1]);
			console.log("Toren Sedang Records:- " + rows[2]);
			console.log("SMS Records:- " + rows[3]);
			console.log("Records Admin : " + rows[4]);

			// bikin validasi kalo status air diproses, tinggi air harusnya kurang dari 10 
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errornya);
			}

			else if(rows[3].length>=1)
			{	
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data_photo:SessionPhoto,showAdmin:rows[4],pass:notif_pesanan_proses,data1:rows[0],data2:rows[1],data3:rows[2],session_store:req.session});   
			console.log(req.session.is_login_email);
			}
			else if(rows[3].length==0)
			{	
			res.render('depot/tangki_air',{title:"DAIM Otomatis",data_photo:SessionPhoto,showAdmin:rows[4],pass:notif_tangki_full,data1:rows[0],data2:rows[1],data3:rows[2],session_store:req.session});
			console.log(req.session.is_login_email);
			}
        	
		});
		console.log(query.sql);
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

	var SessionEmail = req.session.is_login_email;
	var paramAdmin = req.params.id_admin;
	var SessionPhoto = req.session.is_login_photo;

	req.getConnection(function(err,connection){

		var sql = "SELECT * FROM admin where id_admin=?;SELECT * FROM sms_pengirim WHERE status_sms = ?;SELECT * FROM admin where email = ?";
		var query = connection.query(sql,[paramAdmin,'full',SessionEmail],function(err,rows,fields)
		{

			console.log("Admin Records: " + rows[0]);
			console.log("SMS Records: " + rows[1]);
			console.log("Admin Select Records: " + rows[2]);
	
			// bikin validasi kalo status air diproses, tinggi air harusnya kurang dari 10 
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errornya);
			}

			else if(rows[1].length>=1)
			{	
			res.render('depot/edit',{title:"Edit ",data_photo:SessionPhoto,data:rows[2], showAdmin:rows[2], pass:notif_pesanan_proses});   
			console.log(req.session.is_login_email);
			}
			else if(rows[1].length==0)
			{	
			res.render('depot/edit',{title:"Edit ",data_photo:SessionPhoto,data:rows[2], showAdmin:rows[2], pass:notif_tangki_full});   
			console.log(req.session.is_login_email);
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
		console.log("Password Admin : " + v_passwordX);
		
		var admin = {
			username: v_username,
			email: v_email,
			password: v_password,
			photo:''
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
						username: req.params.username, 
						email: req.params.email,
						password: req.params.password,
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
