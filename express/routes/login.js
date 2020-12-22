var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const encrypted = crypto.createHash("sha512").update(password).digest("hex");
  /* model에서 id, pw로 user를 검색해, 일치하는지 확인 */
  models.user.findOne({where: {'username': username, 'password': encrypted}})
  .then(function (result) {
    if (result) {
      req.session.username = username;
      res.redirect('/');
    } else {
      util.alertAndRedirect(res, 'id or password is wrong', '/login');
    }
   });
});

module.exports = router;
