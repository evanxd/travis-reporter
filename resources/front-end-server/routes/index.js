var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET detail page. */
router.get('/detail', function(req, res) {
	res.render('detail');
});

module.exports = router;