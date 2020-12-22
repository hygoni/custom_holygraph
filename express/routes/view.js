var express = require('express');
var router = express.Router();
var models = require('../models');

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

router.get('/new', function(req, res, next) {
  res.render('new', {
    session: req.session
   });
});

router.get('/graph', function(req, res, next) {
  res.render('graph', {
    session: req.session
   });
});

router.get('/subject/:title', function(req, res, next) { 
  models.subject.findOne({where: {'title': req.params.title}})
  .then(function(result) {
    res.render('subject', {
      session: req.session,
      title: req.params.title,
      subject: result
     });
  });
});

module.exports = router;
