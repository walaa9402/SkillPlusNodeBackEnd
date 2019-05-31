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
				data : null,
				message : err				
			});			
		}else{
            var values = [skill,learner]
            var sql2= "INSERT INTO learner (skill_id,learner_id) values (?,?)";
			pool.query(sql2,values,function(err,result2){
				if(err){
                    res.json({			
                        status : false,
                        data : null,
                        message : err				
                    });			
                }else{
                    
                    res.json({		
                        status : true,
                        data : [result1,result2],
                        message : "applyed"			
                    });		
                    
                }		
                
	        });	
			 
		}		
		
	});
});
module.exports = router;