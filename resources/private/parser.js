module.exports = {
	findErrFile : function(data,callback){
		/*var patt=/gaia(\w)*\.js/g;
		var spiltStr=data.substr(data.indexOf("failing"));
        spiltStr=spiltStr.substr(0,spiltStr.indexOf("make"));
       	var result =spiltStr.match(patt);
        return result;*/
        var patt=/gaia\/.*_test\.js/g;
		var result=data.match(patt);
		if(result==null)
			return null;
		var json ={"Path":{},"Name":{},"length":result.length};
		for(var i=0;i<result.length;i++){
			var name = result[i].substring(result[i].lastIndexOf("/")+1,result[i].length);
			var path = result[i].substring(result[i].indexOf("/"),result[i].indexOf(name));
			json.Path[i]=path;
			json.Name[i]=name;
		}
		return json;
	}
}