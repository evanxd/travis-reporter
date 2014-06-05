var express = require('express');
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

module.exports = router;