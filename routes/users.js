var express = require('express');
var router = express.Router();

var pool = require('../config/config');

router.get('/', function(req, res, next) {
  res.send('respond with a resource in users');
});
router.get('/all',function(req,res){
	var sql = "SELECT * FROM user ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				allUsers : null,
				message : err				
			});			
		}else{
			
			res.json({		
				status : true,
				allUsers : result,
				message : "done"			
			});		
			 
		}		
		
	});
});
router.post('/login',function(req,res){
	var email=req.body.email
	var password= req.body.password
	var values = [email,password];
	
	var sql = "SELECT user.* ,(SELECT AVG((SELECT AVG(value) FROM rate where skill_id=s.skill_id)) FROM skill s where user_id=user.user_id) as rates FROM user where user_email=? and user_password=?";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				login : {},
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
				o.rate = result[0].rates;
				if(!o.rate){
					o.rate=-1
				}
			res.json({		
				status : true,
				userlogined : o,
				message : "done"			
			});		
			}else{
				res.json({			
				status : false,
				userlogined : {},
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
				signup : null,
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
				userdata : user,
				message : "done"			
			});
			});
		}		
		
	});
});

module.exports = router;
