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
	
	var sql = "SELECT user.* ,(SELECT COUNT(skill_id) from skill where user_id=user.user_id) as skills,(SELECT AVG((SELECT AVG(value) FROM rate where skill_id=s.skill_id)) FROM skill s where user_id=user.user_id) as rates FROM user where user_email=? and user_password=?";
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
				o.pic = result[0].user_pic;
				o.rate = result[0].rates;
				if(!o.rate){
					o.rate=0
				}
				if(result[0].skills==0){
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
			var sql = "SELECT user.*  FROM user where user_id=?";
			pool.query(sql,[result["insertId"]],function(err,result){
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
						o.rate = -1;
						o.pic = result[0].user_pic;
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
		}
	
});
})
module.exports = router;
