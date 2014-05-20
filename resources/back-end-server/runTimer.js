var fetch=require('./fetch');
var buildTime;
exports.inter = setInterval(function(){
	console.log('it is timer run with ten second');
	fetch.doThing(buildTime,setTime);
},10000);
function setTime(time){
	console.log(time);
	buildTime=time;
}

