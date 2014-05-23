var mongoose = require('mongoose');
var db = mongoose.connection;
var data = mongoose.model('data');
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
	console.log('db link and update fake data done');
	updateData('2013-12-11','find.js',5);
});
function updateData(date,name,count){
	data.findOne({fileName:name}).exec(function(err,ob){
		if(err)
			console.error(err);

		else{
			
			ob.errCount+=count;
			data.remove({fileName:ob.fileName})
			.exec(insertData(ob));
			console.log(ob);
		}
	});
}
function insertData(json){

	var test = new data({date:json.date,
	fileName:json.fileName,errCount:json.errCount});
	test.save();
}
