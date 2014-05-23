var mongoose = require('mongoose');
var db = mongoose.connection;
var data = mongoose.model('data');
/*db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
	console.log('db link and update fake data done');
	var json={"date":"2013/12/4","fileName":"as.js","errCount":5};
	update(json);
});*/
module.exports={
update:function (json){
	data.findOne({date:json.date,fileName:json.fileName}).exec(function(err,ob){
		if(err){
			console.error(err);
			insertData(json);
		}
		else{
			if(ob!=null){
			ob.errCount+=json.errCount;
			data.remove({date:json.date,fileName:ob.fileName})
			.exec(insertData(ob));
			}
			else
				insertData(json);
			}
		});
	}
,
}
function insertData(json){
	var test = new data({date:json.date,
	fileName:json.fileName,errCount:json.errCount});
	test.save();
	}

