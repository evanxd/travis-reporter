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
	var json={"errDate":"2013/12/11","errName":"as.js","errCount":5};
	update(json);
});
function update(json){
	data.findOne({errName:json.errName}).exec(function(err,ob){
		if(err){
			console.error(err);
			insertData(json);
		}
		else{
			if(ob!=null){
			ob.errCount+=json.errCount;
			data.remove({errName:ob.errName})
			.exec(insertData(ob));
				}
			else
				insertData(json);
			console.log(ob);
			}
		});
	}
function insertData(json){
	var test = new data({errDate:json.errDate,
	errName:json.errName,errCount:json.errCount});
	test.save();
	}