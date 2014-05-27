var express = require('express');
var mongoose= require('mongoose');
var router = express.Router();
/*
 * @param {repoter} a Schema ,The it's structure is declared from the ./model/db.js document.
 */
var repoter=mongoose.model('data');
router.get('/', function(req, res) {
	var	result = repoter.find({});
		
		if(req.query.fileName!=null)
		{
			result.find({fileName:req.query.fileName});
		}
		if(req.query.range!=null){
			//result = repoter.find({})
			var now=new Date();
			var dayOfMonth = now.getDate();
			now.setDate(dayOfMonth - req.query.range);
			var test=now.getFulelYear()+"-"+(now.getMonth()<10 ? '0' : '')+(now.getMonth()+1)+"-"+ now.getDate();
			result.where('date').gte(test);
			result.sort('-date');
			
		}

		result.limit(req.query.count);
		result.sort('-errCount');
		result.exec(function(err,result){	
			res.send(result);
			//console.dir(result);
		});
});

module.exports = router;

