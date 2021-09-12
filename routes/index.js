var express = require('express');
var router = express.Router();
var player = require('../player.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/play', function (req, res, next) {
  player.play((result) => res.json({ result }));
});

module.exports = router;
