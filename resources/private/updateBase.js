var mongoose = require('mongoose');
var db = mongoose.connection;
var data = mongoose.model('data');
module.exports={
insertData:function (json){
	var insData = new data({buildID:json.buildID,jobID:json.jobID,date:json.date,
	filePath:json.filePath});
	insData.save();
	};
}
/*update:function (json){
	data.findOne({buildID:json.buildID,date:json.date,fileName:json.fileName}).exec(function(err,ob){
		if(err){
			console.error(err);
			insertData(json);
		}
		else{
			if(ob!=null){
			ob.errCount+=json.errCount;
			data.remove({buildID:json.buildID,date:json.date,fileName:ob.fileName})
			.exec(insertData(ob));
			}
			else
				insertData(json);
			}
	});*/


