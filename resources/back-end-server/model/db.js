var mongoose =require('mongoose');
var Schema=mongoose.Schema;

/*
 *Structure of schema
*/
var repoter=new Schema(
{
	fileName:String,
	errCount:Number, 
	date:String
},{versionKey: false});
mongoose.model('data',repoter);
//connect to mongodb , select database "myData"
mongoose.connect('mongodb://localhost/database');

