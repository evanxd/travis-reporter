
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var insertData = require('./updateBase');
var interval = require('./runTimer');
var fetch=require('./fetch-log')
fetch.lastBuildLog();
var app = express();
http.createServer(app).listen(app.get(4000), function(){
  console.log('Express server listening on port ' + 4000);
});
