module.exports = {
	findErrFile : function(data,callback){
        var temp=data.substr(data.indexOf("failing"),data.lastIndexOf("make"));
        var patt=/gaia\/.*_test\.js/g;
		var result=temp.match(patt);
		if(result==null)
			return null;
		for(var i=0;i<result.length;i++){
			result[i]=result[i].substring(result[i].indexOf("/"),result[i].length);
		}
		return result;
	}
}