var fetch=require('./fetch-log')
//var addr='https://s3.amazonaws.com/archive.travis-ci.org/jobs/23735955/log.txt';
exports.inter = setInterval(function(){
	//fetch.lastBuildLog();
	console.log('it is timer run with ten second');
},10000);
