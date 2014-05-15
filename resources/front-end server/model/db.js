var mongoose =require('mongoose');
var Schema=mongoose.Schema;

/*
 *Structure of schema
*/
var repoter=new Schema(
{
	fileName:String,
	errorCount:Number,
	date:String
},{versionKey: false});
mongoose.model('repoter',repoter);
//connect to mongodb , select database "myData"
mongoose.connect('mongodb://localhost/myData');