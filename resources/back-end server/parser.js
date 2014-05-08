

module.exports = {
	findErrFile : function(data,callback){
		var patt=/(\w)*\.js/g;
		console.log(data);
		var spiltStr=data.substr(data.indexOf("failing"));
        spiltStr=spiltStr.substr(0,spiltStr.indexOf("make"));
       	var result =spiltStr.match(patt);
        return result;
	}

}
