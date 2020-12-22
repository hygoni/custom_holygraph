var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  
  const subjects = models.subject.findAll()
  .then(function(result) {
    console.log(result);
    res.render('index', {
      session: req.session,
      subjects: result
     });
  });
  
});

module.exports = router;
