var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;
var dataSchema = mongoose.Schema({
	errDate:String,
	errName:String,
	errCount:Number
},{versionKey:false})
var data = mongoose.model('datas',dataSchema);
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
	console.log('db link and update fake data done');
	updateData('2013/12/11','errr.js',5);
});
function updateData(date,name,count){
	data.findOne({errName:name}).exec(function(err,ob){
		if(err)
			console.error(err);
		else{
			ob.errCount+=count;
			data.remove({errName:ob.errName})
			.exec(insertData(ob.errDate,ob.errName,ob.errCount));
			console.log(ob);
		}
	});
}
function insertData(date,name,count){
	var test = new data({errDate:date,
	errName:name,errCount:count});
	test.save();
}