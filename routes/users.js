var express = require('express');
var router = express.Router();
//var token = require('../config/token');
var pool = require('../config/config');
/* var hash = require('password-hash');

var gcm = require('node-gcm');
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource in users');
});
router.get('/all',function(req,res){
	var sql = "SELECT * FROM user ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			
			res.json({		
				status : true,
				data : result[0],
				message : "done"			
			});		
			 
		}		
		
	});
});
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	var sql = "SELECT user.* ,(SELECT AVG(value) FROM rate where rate.user_id=user.user_id and user_type='skill') as skill_rate ,(SELECT AVG(value) FROM rate where rate.user_id=user.user_id and user_type='service') as service_rate FROM user where user_email=? and user_password=?";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : {},
				message : err				
			});			
		}else{
			if (result.length > 0) {
			var o ={};
				o.id = result[0].user_id ;
				o.name = result[0].user_name;
				o.user_phone = result[0].user_phone;
				o.email = result[0].user_email;
				o.password = result[0].user_password;
				o.skillrate = result[0].skill_rate;
				o.servicerate = result[0].service_rate;
			res.json({		
				status : true,
				data : o,
				message : "done"			
			});		
			}else{
				res.json({			
				status : false,
				data : {},
				message : "invalid email or password"			
			});	
			}
		}		
		
	});
});
router.post('/signup',function(req,res){
	var user_name=req.body.name
	var email=req.body.email
	var password= req.body.password
	var pic= req.body.pic
	var values = [user_name,email,password,pic];
	var sql = "insert into user (user_name,user_email,user_password,user_pic) values(?,?,?,?)";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			var sql = "SELECT user.* ,(SELECT AVG(value) FROM rate where rate.user_id=user.user_id and user_type='skill') as skill_rate ,(SELECT AVG(value) FROM rate where rate.user_id=user.user_id and user_type='service') as service_rate FROM user where user_email=? and user_password=?";
			var sqlValues = [email,password];
			pool.query(sql,sqlValues,function(err,result){
			var user ={};
				user.id = result[0].user_id ;
				user.name = result[0].user_name;
				user.email = result[0].user_email;
				user.password = result[0].user_password;
				user.city = result[0].user_pic;
				user.skillrate = result[0].skill_rate;
				user.servicerate = result[0].service_rate;

			res.json({		
				status : true,
				data : user,
				message : "done"			
			});
			});
		}		
		
	});
});

module.exports = router;
