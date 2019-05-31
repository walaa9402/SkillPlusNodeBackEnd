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
    var schedule = req.body.schedule
    var date = new Date().getTime()
    var values = [sessions, duration, price, extra, need, date]
	var sql = "INSERT INTO forms (session_no,duration,need_price,extra_fees,need_id,last_updated) values (?,?,?,?,?,?)";
	pool.query(sql,values,function(err,result){
				if(err){
			res.json({			
				status : false,
				data : null,
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
                        data : null,
                        message : err
                    });
                } else {
                    res.json({		
                        status : true,
                        data : result,
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
                data : null,
                message : err
            })
        } else {
            var sql2 = "DELETE FROM forms WHERE need_id=? and flag=0"
           pool.query(sql2,[need],function(err,result2){
                if(err){
                    res.json({
                        status : false,
                        data : null,
                        message : err
                    })
                } else {
                    var sql3 = "DELETE FROM need_schedule WHERE need_id=? and NOT IN (?)"
                    pool.query(sql3,[need_id,schedule],function(err,result3){
                        if(err){
                            res.json({
                                status : false,
                                data : null,
                                message : err
                            })
                        } else {
                            res.json({
                                status: true,
                                data : {result1,result2,result3},
                                message : "done"
                            })
                        }
                    })
                }
           })
        }
    })
});
module.exports = router;