var express = require('express');
var router = express.Router();

var pool = require('../config/config');


router.post('/',function(req,res){
  var user = req.body.user
  var date = req.body.date
	var sql = "SELECT DISTINCT u.*,s.skill_name,(SELECT GROUP_CONCAT(date) FROM skill_schedule where learner_id=sch.learner_id and skill_id=sch.skill_id) as schedule FROM user u INNER JOIN skill_schedule sch ON u.user_id=sch.learner_id INNER JOIN skill s ON sch.skill_id=s.skill_id where sch.last_updated=? and s.user_id=? ORDER BY sch.last_updated";
	pool.query(sql,[date,user],function(err,apply){
				if(err){
			res.json({			
				status : false,
				notifications : null,
				message : err				
			});			
		}else{
			if(apply.length>0){
        apply=apply.map(function(element){
          element["schedule"] = element["schedule"].split(",")
          return element
        })
      }
			res.json({		
				status : true,
				notifications : apply,
				message : "done"			
			});		
			 
		}		
		
	});
});
module.exports = router;