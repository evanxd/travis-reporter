var express = require('express');
var search =require('../private/search.js');
var mongoose = require('mongoose');
var repoter = mongoose.model('data');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET detail DIV. */
router.get('/detail', function(req, res) {
	res.render('detail');
});

/* GET selfDefine DIV */
router.get('/selfDefine', function(req, res) {
	res.render('selfDefine');
});
/*GET data*/
router.get('/data', function(req, res) {
	search.getData(req,res);
});
/*GET detail data*/
router.get('/data/detail', function(req, res) {
	search.getDetail(req,res);
});

module.exports = router;