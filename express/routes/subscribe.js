var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

router.get('/:title', function(req, res, next) {
  if (!req.session.username) {
    util.alertAndRedirect(res, 'not logged in', '/');
    return;
  }
  
  const title = req.params.title;
  models.subscribe.create({
    'username': req.session.username,
    'title': title,
    'status': 'inprogress',
    'score': 0,
  });

  util.alertAndRedirect(res, 'subject is successfully subscribed', '/');

});

module.exports = router;
