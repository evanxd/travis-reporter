var fetch=require('./fetch');
var buildTime="2014-06-07T14:20:00Z";
var ids;
//fetch.doThing(buildTime,ids,setTime);
exports.inter = setInterval(function(){
	fetch.doThing(buildTime,ids,setInfo);
},600000);
function setInfo(time,IDs){
	buildTime=time;
	ids=IDs;
}
