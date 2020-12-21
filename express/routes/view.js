var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login', {
    session: req.session
   });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    session: req.session
   });
});

module.exports = router;
