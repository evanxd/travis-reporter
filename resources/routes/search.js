var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
/*
 * @param {repoter} a Schema ,The it's structure is declared from the ./model/db.js document.
 */
var repoter = mongoose.model('data');
router.get('/',function(req, res) {
	var result = repoter.find({});
	result.sort('-errCount');  
	if(req.query.fileName!=null)
	{
		result.find({fileName : req.query.fileName});
	}
	if(req.query.date!=null){
		//result = repoter.find({})
		var now = new Date();
		var dayOfMonth = now.getDate();
		now.setDate(dayOfMonth - req.query.date);
		var range = now.getFullYear() + "-" +(now.getMonth()<10 ? '0' : '')+(now.getMonth()+1)+ "-" + now.getDate();
		result.where('date').gte(range);
	}
	if(req.query.errCount!=null){
		result.where('errCount').gte(req.query.errCount);	
	}
	result.limit(req.query.count);
	result.exec(function(err,result){	
		res.send(result);
	});
});
module.exports = router;