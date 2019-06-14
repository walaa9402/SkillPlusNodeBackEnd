var express = require('express');
var router = express.Router();
var pool = require('../config/config');

router.get('/', function(req, res, next) {
  res.send('respond with a resource in skill');
});
router.post('/apply',function(req,res){
    var learner = req.body.learner
    var skill = req.body.skill
    var schedule = req.body.schedule
    var date = new Date().getTime()
    var values = [learner,date,skill,schedule]
    var sql = "UPDATE skill_schedule SET learner_id=?,last_updated=? where skill_id=? and date IN (?)";
    
	pool.query(sql,values,function(err,result1){
				if(err){
			res.json({			
				status : false,
				sqlresponse : null,
				message : err				
			});			
		}else{
            var values = [skill,learner]
            var sql2= "INSERT INTO learner (skill_id,learner_id) values (?,?)";
			pool.query(sql2,values,function(err,result2){
				if(err){
                    res.json({			
                        status : false,
                        sqlresponse : null,
                        message : err				
                    });			
                }else{
                    
                    res.json({		
                        status : true,
                        sqlresponse : result2,
                        message : "applyed"			
                    });		
                    
                }		
                
	        });	
			 
		}		
		
	});
});
router.post('/mine',function(req,res){
    var user = req.body.id
	var sql = "SELECT *,(SELECT AVG(value) FROM rate where skill_id=skill.skill_id) as rate,(SELECT GROUP_CONCAT(date) FROM skill_schedule where skill_id=skill.skill_id) as schedule FROM skill where user_id=?";
	pool.query(sql,[user],function(err,result){
        if(err){
            res.json({			
                status : false,
                skills : null,
                message : err				
            });			
        }else{
            if(result.length>0){
				result = result.map(function(element){
					if(element["schedule"]){
						if(element["schedule"].indexOf(",")<0){
						element["schedule"]=[element["schedule"]]
						} else{
						element["schedule"] = element["schedule"].split(",")
						}
					}
					if(!element["schedule"]){
						element["schedule"]=[]
                    }
                    if(!element["rate"]){
                        element["rate"]=0
                    }
					element["schedule"]=element["schedule"].map(function(element){
						element=JSON.parse(element)
						return element
					})
					return element
				})
			}
            res.json({		
                status : true,
                skills : result,
                message : "done"			
            });
        }
    })

});
router.post('/learners',function(req,res){
    var skill = req.body.id
	var sql = "SELECT user_name,user_pic,(SELECT GROUP_CONCAT(date) FROM skill_schedule where skill_id=? and learner_id=user.user_id) as schedule FROM user where user_id=(SELECT DISTINCT learner_id from learner where skill_id=? and learner_id=user.user_id)";
	pool.query(sql,[skill,skill],function(err,result){
        if(err){
            res.json({			
                status : false,
                sqlresponse : null,
                message : err				
            });			
        }else{
            if(result.length>0){
				result = result.map(function(element){
					if(element["schedule"]){
						if(element["schedule"].indexOf(",")<0){
						element["schedule"]=[element["schedule"]]
						} else{
						element["schedule"] = element["schedule"].split(",")
						}
					}
					if(!element["schedule"]){
						element["schedule"]=[]
                    }
					element["schedule"]=element["schedule"].map(function(element){
						element=JSON.parse(element)
						return element
					})
					return element
				})
			}
            res.json({		
                status : true,
                skills : result,
                message : "done"			
            });
        }
    })

});
module.exports = router;