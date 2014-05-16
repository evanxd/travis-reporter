var express = require('express');
var mongoose= require('mongoose');
var router = express.Router();
/*
 * @param {repoter} a Schema ,The it's structure is declared from the ./model/db.js document.
 */
var repoter=mongoose.model('repoter');


/**
 * local:3000/data/
 * Find all data from database and sort it by "errorCount".
 * @param {errorCount} a number,the error count of file.
 * @return {JSON} result of repoter.
 */

router.get('/', function(req,res){
	repoter.find({},null,{sort: {'errorCount': -1}}).exec(function(err,repoter)
	{
		res.send(JSON.parse(JSON.stringify(repoter)));
		//console.dir(JSON.parse(JSON.stringify(repoter)));
	});
});
/**
 * local:3000/data/create/fileName/errorCount/date
 * Create the data and insert into database.
 * @param {fileName} a string,the error file name.
 * @param {errorCount} a number,the error count of file.
 * @param {date} a string,created date(20XX-YY-DD).
 */
router.get('/crate/:fileName/:errorCount/:date', function(req,res){
	new repoter({
    	fileName : req.params.fileName,
    	errorCount : req.params.errorCount,
    	date: req.params.date

  	}).save( function( err, repoter, count ){
    //res.send(repoter);
  });
});
/**
 * local:3000/data/find/fileName
 * Find the fileName from database
 * @return {JSON} result of repoter.
 */
router.get('/find/:fileName', function(req,res){
	var result=repoter.find({fileName:req.params.fileName});
		result.exec(function(err,result)
		{
			res.send(JSON.parse(JSON.stringify(result)));
			//console.dir(JSON.parse(JSON.stringify(result)));
		})
});

/**
 * local:3000/data/range/rangeStartNumber/rangeEnd/Number
 * Find the the error count from rangeStartNumber to rangeEnd
 * and sort it by error Count.
 * @return {JSON} result of repoter.
 */
router.get('/range/:range_start/:range_end', function(req,res){
	var	result = repoter.find({},null, {sort: {"errorCount": -1}});
		result = result.where('errorCount').lte(req.params.range_end).gte(req.params.range_start);
	result.exec(function(err,result)
	{
		res.send(JSON.parse(JSON.stringify(result)));
		//console.dir(JSON.parse(JSON.stringify(result)));
	});
});
module.exports = router;