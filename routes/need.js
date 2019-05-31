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
            var sql = "INSERT INTO need_schedule values ?"
            var values = schedule.map(function(element){
                return [need,form_id,element]
            })
			pool.query(sql,values,function(err,result){
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

});
module.exports = router;