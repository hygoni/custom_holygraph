var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

/* upload subject files */

router.post('/', function(req, res, next) {
  if (!req.session.username) {
    util.alertAndRedirect(res, 'not logged in', '/');
    return ;
  }

  const title = req.body.title;
  const username = req.body.username;
  const status = req.body.status;
  const score = Number(req.body.score);

  if (!title || !status || !username || !score)
    util.alertAndRedirect(res, 'invalid input', '/view/submit');

  models.subscribe.findOne({where: {'title': title, 'username': username}})
  .then(function(subscribe) {
    subscribe.update({'status': status, 'score': score});
    util.alertAndRedirect(res, status, '/');
  });  
});

module.exports = router;
