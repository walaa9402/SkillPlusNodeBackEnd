var express = require('express');
var router = express.Router();

var pool = require('../config/config');

router.get('/', function(req, res, next) {
  res.send('respond with a resource in need');
});
router.post('/form/add',function(req,res){
    var sessions = req.body.sessions_no
    var duration = req.body.duration
    var price = req.body.price
    var extra = req.body.extra
    var need = req.body.need_id
    var user = req.body.user
    var schedule = req.body.schedule
    var date = new Date().getTime()
    var values = [sessions, duration, price, extra, need, date,user]
	var sql = "INSERT INTO forms (session_no,duration,need_price,extra_fees,need_id,last_updated,user_id) values (?,?,?,?,?,?,?)";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				sqlresponse : null,
				message : err				
			});			
		}else{
            var form_id = result["insertId"]
            var sql = "INSERT INTO need_schedule(need_id,form_id,date) values ?"
            var values = schedule.map(function(element){
                return [need,form_id,element]
            })
			pool.query(sql,[values],function(err,result){
                if(err){
                    res.json({			
                        status : false,
                        sqlresponse : null,
                        message : err
                    });
                } else {
                    res.json({		
                        status : true,
                        sqlresponse : result,
                        message : "form inserted with schedules"			
                    });
                }
            })
					
			 
		}		
		
	});
});
router.post('/form/approve',function(req,res){
    var form = req.body.form_id
    var need = req.body.need_id
    var schedule = req.body.schedule
    var date = new Date().getTime()
    var sql = "UPDATE forms SET last_updated=?,flag=1 where form_id=?"
    pool.query(sql,[date,form],function(err,result1){
        if(err){
            res.json({
                status : false,
                sqlresponse : null,
                message : err
            })
        } else {
            var sql2 = "DELETE FROM need_schedule WHERE need_id=? and NOT IN (?)"
           pool.query(sql2,[need_id,schedule],function(err,result2){
                if(err){
                    res.json({
                        status : false,
                        sqlresponse : null,
                        message : err
                    })
                } else {
                    var sql3 = "DELETE FROM forms WHERE need_id=? and flag=0"
                    pool.query(sql3,[need],function(err,result3){
                        if(err){
                            res.json({
                                status : false,
                                sqlresponse : null,
                                message : err
                            })
                        } else {
                            res.json({
                                status: true,
                                sqlresponse : result3,
                                message : "done"
                            })
                        }
                    })
                }
           })
        }
    })
});
router.post('/mine',function(req,res){
    var user = req.body.id
    var sql = "SELECT * FROM needs where user_id=?"
    pool.query(sql,[user],function(err,result1){
        if(err){
            res.json({
                status : false,
                sqlresponse : null,
                message : err
            })
        } else {
            res.json({
                status : true,
                sqlresponse : result1,
                message : "done"
            }) 
        }
    })
});
router.post('/forms',function(req,res){
    var need = req.body.id
    var sql = "SELECT u.user_name,u.user_pic,f.*,(SELECT GROUP_CONCAT(date) from need_schedule where form_id=f.form_id) as schedule FROM user u INNER JOIN forms f ON u.user_id=f.user_id where f.need_id=?"
    pool.query(sql,[need],function(err,result1){
        if(err){
            res.json({
                status : false,
                sqlresponse : null,
                message : err
            })
        } else {
            if(result1.length>0){
				result1 = result1.map(function(element){
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
                sqlresponse : result1,
                message : "done"
            }) 
        }
    })
});
router.post('/current/details',function(req,res){
    var form = req.body.id
	var sql = "SELECT *,(SELECT DISTINCT need_name FROM needs where need_id=forms.need_id) as need,(SELECT GROUP_CONCAT(date) FROM need_schedule where form_id=?) as schedule FROM forms where form_id=?";
	pool.query(sql,[form,form],function(err,result){
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
                data : result[0],
                message : "done"			
            });
        }
    })

});
router.post('/current',function(req,res){
    var user = req.body.id
	var sql = "SELECT f.flag,n.need_name,n.need_photo,(SELECT GROUP_CONCAT(date) FROM need_schedule where form_id=f.form_id) as schedule FROM forms f INNER JOIN needs n ON f.need_id=n.need_id where f.user_id=?"
	pool.query(sql,[user],function(err,result){
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
                    if(element["flag"]==0){
                        element["flag"]=false
                    }else{
                        element["flag"]=true
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
    })

});
module.exports = router;