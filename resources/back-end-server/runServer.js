
/**
 * Module dependencies.
 */
var db=require('./model/db.js');
var express = require('express');
var app = express();
var http = require('http');
var insertData = require('./updateBase');
var interval = require('./runTimer');
var searchs = require('./routes/search.js');
var app = express();

app.use('/data',searchs);
app.set('port', process.env.PORT || 4000);
var server = app.listen(app.get('port'), function() {
  console.log("Server now is create ");
});
