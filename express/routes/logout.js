var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

/* 로그아웃은 세션상에서 사용자 이름을 지운다.  */
router.get('/', function(req, res, next) {
  req.session.username = null;
  util.alertAndRedirect(res, 'logged out', '/');
});

module.exports = router;
