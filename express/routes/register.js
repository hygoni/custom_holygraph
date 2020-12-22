var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body); 
  
  /* 패스워드를 sha512로 해싱 */
  const encrypted = crypto.createHash("sha512").update(password).digest("hex");
  console.log(encrypted);

  /* 사용자가 현재 존재하는지 검색 */
  const searched = models.user.findOne({where: {username}})
  .then(function (result) {
    if (result) {
      /* 이미 존재하는 경우 */
      util.alertAndRedirect(res, 'already exists', '/');
    } else {
      /* 없다면 새로 만든다 */
      const created = models.user.create({
        'username': username,
        'password': encrypted
      });
      req.session.username = username;
      util.alertAndRedirect(res, 'successfully registered', '/');
    }
  });
});

module.exports = router;
