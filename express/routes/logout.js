var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

router.get('/', function(req, res, next) {
  req.session.username = null;
  util.alertAndRedirect(res, 'logged out', '/');
});

module.exports = router;
