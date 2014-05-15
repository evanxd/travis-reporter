var fetch=require('./fetch-log')
exports.inter = setInterval(function(){
	console.log('it is timer run with ten second');
},10000);
