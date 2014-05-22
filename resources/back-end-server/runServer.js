
/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var http = require('http');
// var insertData = require('./updateBase');
var interval = require('./runTimer');
app.set("port",process.env.PORT||4000);
var server = app.listen(app.get("port"),function(){
	console.log("Server now is create ");
});