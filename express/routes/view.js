var express = require('express');
var router = express.Router();
var models = require('../models');

/*
  view.js
  ejs를 사용하는 모든 uri가 여기에 정의되어있습니다.
*/

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

router.get('/eval/:title', function(req, res, next) {
  /* model에서 subscribe, subject를 불러온 후 템플릿 엔진 렌더링 */
  models.subscribe.findOne({where: {'username': req.session.username, 'title': req.params.title}})
  .then(function(subscribe) {
    models.subject.findOne({where: {'title': req.params.title}})
    .then(function(subject) {
      res.render('eval', {
        session: req.session,
        subscribe: subscribe.dataValues,
        subject: subject.dataValues
       }); 
    });
  });
});

router.get('/graph', function(req, res, next) {
  /* model에서 subscribe를 불러온 후 템플릿 엔진 렌더링 */
  models.subscribe.findAll({where: {'username': req.session.username, 'status': 'success'}})
  .then(function(data) {
      res.render('graph', {
        session: req.session,
        data: data
       });
    });
});

router.get('/subject/:title', function(req, res, next) {
  models.subject.findOne({where: {'title': req.params.title}})
  .then(function(subject) { 
    models.subscribe.findOne({where: {'title': req.params.title, 'username': req.session.username}})
    .then(function(subscribe) {
      
      let status;
      if (!subscribe)
        status = '';
      else
        status = subscribe.status;
      
      res.render('subject', {
        session: req.session,
        title: req.params.title,
        subject: subject,
        status: status
       }); 
    });
  });
});

router.get('/mine', function(req, res, next) { 
  models.subscribe.findAll({where: {'username': req.session.username}})
  .then(function(result) {
    res.render('mine', {
      session: req.session,
      subjects: result
     });
  });
});

router.get('/submit/:title', function(req, res, next) { 
  res.render('submit', {
    session: req.session,
    title: req.params.title
   });
});

module.exports = router;
