var fetch=require('./fetch');
var buildTime="2014-05-27T22:24:50Z";
exports.inter = setInterval(function(){
	fetch.doThing(buildTime,setTime);
},1000);
function setTime(time){
	buildTime=time;
}