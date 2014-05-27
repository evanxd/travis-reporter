var fetch=require('./fetch');
var buildTime="2014-05-26T17:24:50Z";
exports.inter = setInterval(function(){
	fetch.doThing(buildTime,setTime);
},300000);
function setTime(time){
	buildTime=time;
}

