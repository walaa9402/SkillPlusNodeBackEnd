var express = require('express');
var router = express.Router();

var pool = require('../config/config');


router.post('/',function(req,res){
  var user = req.body.user
  var date = req.body.date
	var sql = "SELECT DISTINCT u.user_name,u.user_pic,u.user_id,s.skill_name,s.skill_id,(SELECT GROUP_CONCAT(date) FROM skill_schedule where learner_id=u.user_id and skill_id=s.skill_id) as schedule FROM user u INNER JOIN skill_schedule sch ON u.user_id=sch.learner_id INNER JOIN skill s ON sch.skill_id=s.skill_id where sch.last_updated>? and s.user_id=? ORDER BY sch.last_updated";
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
      var sql2 = "SELECT u.user_name,u.user_pic,n.need_name,n.need_id,f.form_id FROM user u INNER JOIN forms f ON u.user_id=f.user_id INNER JOIN needs n ON f.need_id=n.need_id where f.last_updated>? and n.user_id=?";
      pool.query(sql2,[date,user],function(err,forms){
        if(err){
          res.json({			
            status : false,
            notifications : null,
            message : err				
          });			
        } else {
          var sql3="SELECT u.user_name,u.user_pic,u.user_id,n.need_name,f.form_id,(SELECT GROUP_CONCAT(date) FROM need_schedule where form_id=f.form_id) as schedule FROM user u INNER JOIN needs n ON u.user_id=n.user_id INNER JOIN forms f ON n.need_id=f.need_id where f.last_updated>? and flag=1 and f.user_id=?";
          pool.query(sql3,[date,user],function(err,accept){
            if(err){
              res.json({			
                status : false,
                notifications : null,
                message : err				
              });	
            }else{
              if(forms.length>0){
                accept = accept.map(function(element){
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
                  return element;
                })
              }
              res.json({		
                status : true,
                notifications : [...apply,...forms,...accept],
                message : "done"			
              });
            }
          })
          
        }
      })
					
			 
		}		
		
	});
});
module.exports = router;