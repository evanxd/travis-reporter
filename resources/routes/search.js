var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
/*
 * @param {repoter} a Schema ,The it's structure is declared from the ./model/db.js document.
 */
var repoter = mongoose.model('data');
router.get('/',function(req, res) {
	var result = repoter.find({});
	var data=[];
	result.exec(function(err,result){	
		data=find(result);
		data=sortByErrCount(data);
		data=search(data,req.query.count,req.query.errCount,req.query.date);
		res.send(data);
	});
});
router.get('/detail',function(req, res) {
	var result = repoter.find({filePath:req.query.filePath});
	result.sort('-date');
	result.exec(function(err,result){	
		res.send(result);
	});
});

function find(result)
{
	var data=[];
	for(x in result)
	{
		var temp=result[x];
		//console.log("x"+x+"\n");
		//console.dir(temp);
		var dataNumber=checkNumber(data,temp.filePath,temp.date);
		//console.log("dataNumber = "+dataNumber);
		if(dataNumber==null)
		{
			//console.log("date: "+result[x].date+ "\n");
			data.push(insert(temp,temp.filePath,temp.date));
			
		}
		else
		{
			data[x]=insert(data[dataNumber],temp.filePath,temp.date);
		}
	}
	return data;
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

//search
function search(json,count,errCount,range)
{
	/*console.log("count"+count+"\n");
	console.log("errCount"+errCount+"\n");
	console.log("range"+range+"\n");*/
	var temp={};
	if(errCount!=undefined)
	{
		//console.log("errorCount");
		json=errCountRange(json,errCount);
	}	
	if(range!=undefined)
	{
		//console.log("range");
		json=dateRange(json,range);
	}

	if(count!=undefined)
	{
		//console.log("count");
		json=countRange(json,count)
	}
	return json;
}

function dateRange(json,date)
{
	var now = new Date();
	var dayOfMonth = now.getDate();
	now.setDate(dayOfMonth - date-1);
	var range = now.getFullYear() + "-" +(now.getMonth()<10 ? '0' : '')+(now.getMonth()+1)+ "-" +(now.getDate()<10 ? '0' : '')+ now.getDate();
	console.log(range);
	var result=[];
	for(x in json)
	{
		console.log("\n");
		var temp=json[x];
		if(temp.date>range)
		{
			//console.dir(temp);
			//console.log("\n");
			result.push(temp);
			//console.dir(temp);
			//console.log("\n");
		}
	}
	return result;
}
function countRange(json,count)
{	
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
function errCountRange(json,errCount)
{
	var result=[];
	for(x in json)
	{
		//console.log("\n");
		var temp=json[x];
		if(temp.errCount>errCount)
		{
			//console.dir(temp);
			//console.log("\n");
			result.push(temp);
			//console.dir(temp);
			//console.log("\n");
		}
	}
	return result;
}
module.exports = router;