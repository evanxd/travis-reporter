var mongoose = require('mongoose');
var repoter = mongoose.model('data');

module.exports={
	getData:function(req,res)
	{
		var result = repoter.find({});
		var data=[];
		result.exec(function(err,result){	
			data=find(result);
			data=setFilePath(data,req.query.filePath);
			data=setDate(data,req.query.date);
			data=setCount(data,req.query.count);
			data=setErrCount(data,req.query.errCount);
		res.send(data);
		});
	},
	getDetail:function(req,res)
	{
		var result = repoter.find({filePath:req.query.filePath});
			result.sort('-date');
			result.exec(function(err,result){	
			res.send(result);
		});
	}
}

function find(result)
	{
		var data=[];
		for(x in result)
		{
			var temp=result[x];
			var dataNumber=checkNumber(data,temp.filePath,temp.date);
			if(dataNumber==null)
			{

			data.push(insert(temp,temp.filePath,temp.date));
			}
			else
			{
				data[x]=insert(data[dataNumber],temp.filePath,temp.date);
			}
		}
		data=sortByErrCount(data);
		return data;
	}
function setFilePath(json,filePath)
	{
		if(filePath==undefined || filePath=='')
		{
			return json;
		}
		else
			//console.log("test\n"+filePath);
			var result=[];
			for(x in json)
			{
				var temp=json[x];
				if(temp.filePath==filePath)
				{

					result.push(temp);
				}
			}
			return result;
	}
	
function setDate(json,date)
	{
		if(date==undefined)
		{
			return json;
		}
		else	
		var now = new Date();
		var dayOfMonth = now.getDate();
		now.setDate(dayOfMonth - date);
		var range = now.getFullYear() + "-" +(now.getMonth()<10 ? '0' : '')+(now.getMonth()+1)+ "-" +(now.getDate()<10 ? '0' : '')+ now.getDate();
		console.log(range);
		var result=[];
		for(x in json)
		{
			var temp=json[x];
			if(temp.date>range)
			{
			result.push(temp);
			}
		}
		return result;
	}
	
function setCount(json,count)
	{	
		if(count==undefined)
		{
			return json;
		}	
		else
		var result=[];
		//console.log(count);
		for(var x=0;x<count;x++)
		{
			var temp=json[x];
			if(temp!=null)
			{
				result.push(temp);
			}
		

		}
		return result;
	}
function setErrCount(json,errCount)
	{
		if(errCount==undefined)
		{
			return json;
		}	
		else
		var result=[];
		for(x in json)
		{
			var temp=json[x];
			if(temp.errCount>=errCount)
			{
			result.push(temp);
			}
		}
	return result;
	}


function insert(array,filePath,date)
{
	var result={};
	//console.dir(array);
	result["filePath"]=filePath;
	result["date"]=date;
	var count=array["errCount"];
	if(count==undefined)
	{
		count=0;
	}
	count=count+1;
	result["errCount"]=count;
	
	return result;
}
function checkNumber(array,_filePath,_date)
{
	for(x in array)
	{
		if (array[x].filePath==_filePath && array[x].date==_date)
		{
			return x;
		}
	}
	return null;
}

function sortByErrCount(json)
{

    json.sort(function (a, b) {
    if (a.errCount < b.errCount)
      return 1;
    if (a.errCount > b.errCount)
      return -1;
    // a must be equal to b
    return 0;
	});
	return json;
}
