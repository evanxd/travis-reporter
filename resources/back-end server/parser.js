

module.exports = {
	findErrFile : function(data){
		var patt=/(\w)*\.js/g;
		var spiltStr=data.substr(data.indexOf("failing"));
        spiltStr=spiltStr.substr(0,spiltStr.indexOf("make"));
       	var result =spiltStr.match(patt);
       	return result;
       }
}