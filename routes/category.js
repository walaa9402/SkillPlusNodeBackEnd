var express = require('express');
var router = express.Router();

var pool = require('../config/config');

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource in users');
// });
router.get('/all',function(req,res){
	var sql = "SELECT * FROM category ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				categories : null,
				message : err				
			});			
		}else{
			
			res.json({		
				status : true,
				categories : result,
				message : "done"			
			});		
			 
		}		
		
	});
});
router.get('/name',function(req,res){
	var sql = "SELECT cat_name FROM category ";
	pool.query(sql,function(err,result){
				if(err){
			res.json({			
				status : false,
				categoriesName : null,
				message : err				
			});			
		}else{
			
			res.json({		
				status : true,
				categoriesName : result,
				message : "done"			
			});		
			 
		}		
		
	});
});
router.post('/',function(req,res){
	var categoryId = req.body.id
	var sql = "SELECT *, (SELECT AVG(value) FROM rate where skill_id=skill.skill_id) as rate,(SELECT user_name FROM user where user_id=skill.user_id) as user_name, (SELECT GROUP_CONCAT(date) FROM skill_schedule where skill_id=skill.skill_id and learner_id IS NULL) as schedule FROM skill WHERE cat_id=? ORDER BY adding_date DESC";
	pool.query(sql,[categoryId],function(err,result){
				if(err){
			res.json({			
				status : false,
				skillsAndNeeds : null,
				message : err				
			});			
		}else{
			if(result.length>0){
				var skills = result.map(function(element){
					if(element["schedule"]){
						element["schedule"]=element["schedule"].split(",")
					}
					if(!element["rate"]){
						element["rate"]=0
					}
					return element
				})
			}
			var needsql = "SELECT *,(SELECT user_name FROM user where user_id=needs.user_id) as user_name FROM needs WHERE cat_id=? ORDER BY adding_date DESC";		
			pool.query(needsql,[categoryId],function(err,result){
				if(err){
					res.json({			
						status : false,
						data : null,
						message : err				
					});			
				}else{
					var needs = result
					res.json({		
						status : true,
						skillsAndNeeds : {skills,needs},
						message : "done"			
					});
			 
				}		
		
			});
			
		}		
		
	});
});
router.post('/add/skill',function(req,res){
	var name=req.body.name
	var desc=req.body.desc
	var session_no=req.body.session_no
	var price=req.body.price
	var duration=req.body.duration
	var pic=req.body.pic
	var extra=req.body.extra
	var user_id=req.body.user_id
	var cat_id=req.body.cat_id
	var schedule = req.body.schedule
	var date = new Data().getTime()
	var values = [name, desc, session_no, price, pic, duration, extra, user_id, cat_id,date]
	var sql = "insert into skill (skill_name,skill_desc,session_no,skill_price,photo_path,duration,extra_fees,user_id,cat_id,adding_date) values(?,?,?,?,?,?,?,?,?,?)";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				categoriesName : null,
				message : err				
			});			
		}else{
			var id = result["insertId"]
			var date = new Date().getTime()
			var sql = "insert into skill_schedule (skill_id,date,last_updated) values ?";
			var values = schedule.map(function(element){
				return [id,element,date]
			})
			pool.query(sql,[values],function(err,result){
				if(err){
					res.json({			
						status : false,
						categoriesName : null,
						message : err				
					});			
				}else{
					
					res.json({		
						status : true,
						categoriesName : result,
						message : "skilladded"			
					});		
						
				}		
				
			});		
			 
		}		
		
	});
});
router.post('/add/need',function(req,res){
	var name=req.body.name
	var desc=req.body.desc
	var pic=req.body.pic
	var cat_id=req.body.cat_id
	var user_id=req.body.user_id
	var date =new Date().getTime()
	var values = [name, desc, pic, cat_id, user_id, date]
	var sql = "insert into need (need_name,need_desc,need_photo,cat_id,user_id,adding_date) values(?,?,?,?,?,?)";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				categoriesName : null,
				message : err				
			});			
		}else{
			res.json({		
				status : true,
				categoriesName : result,
				message : "needadded"			
			});		
			 
		}		
		
	});
});

router.post('/favorite',function(req,res){
	var userId =req.body.user_id
	var sql = "SELECT *, (SELECT AVG(value) FROM rate where skill_id=skill.skill_id) as rate,(SELECT user_name FROM user where user_id=skill.user_id) as user_name, (SELECT GROUP_CONCAT(date) FROM skill_schedule where skill_id=skill.skill_id) as schedule FROM skill WHERE skill_id=(SELECT skill_id FROM favorite WHERE user_id=?) ORDER BY adding_date DESC" ;
	pool.query(sql,[userId],function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			if(result.length>0){
				var result = result.map(function(element){
					if(element["schedule"]){
						element["schedule"]=element["schedule"].split(",")
					}
					if(!element["rate"]){
						element["rate"]=0
					}
					return element
				})
			}
			res.json({		
				status : true,
				data : result,
				message : "done"			
			});		
			
		}		
		
	});
});
router.post('/favorite/update',function(req,res){
	var userId = req.body.user_id
	var skillId = req.body.skill_id
	var values = [userId, skillId]
	var sql = "SELECT * FROM favorite WHERE user_id=? and skill_id=?";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
				message : err				
			});			
		}else{
			if(result.length>0){
				var values = [userId, skillId]
				var sqlRemove = "DELETE FROM favorite WHERE user_id=? and skill_id=?";
				pool.query(sqlRemove,values,function(err){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
						res.json({		
							status : true,
							message : " package deleted from favorite"			
						});
					}
				})
			} else {
				var values = [userId,skillId]
				var sqlAdd = "INSERT INTO favorite (user_id,skill_id) VALUES (?, ?);";
				pool.query(sqlAdd,values,function(err,result){
					if(err){
						res.json({			
							status : false,
							data : null,
							message : err				
						});			
					} else {
						res.json({		
							status : true,
							message : " package added to favorite"			
						});
					}
				})
			}	
			
		}		
		
	});
});
module.exports = router;