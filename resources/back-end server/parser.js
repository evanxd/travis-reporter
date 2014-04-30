

module.exports = {
	findErrFile : function(data,callback){
		var patt=/(\w)*\.js/g;
		var spiltStr=data.substr(data.indexOf("failing"));
        spiltStr=spiltStr.substr(0,spiltStr.indexOf("make"));
       	var result =spiltStr.match(patt);
       	if(callback&&typeof(callback)==="function")
       		callback(result);
       	
	}

}


// function findErrorFile(data){
// 	var patt=/(\w)*\.js/g;
// 	var spiltStr=data.substr(data.indexOf("failing"));
//             spiltStr=spiltStr.substr(0,spiltStr.indexOf("make"));
//             return spiltStr.match(patt);
// }