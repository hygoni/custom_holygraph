var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body); 
  const encrypted = crypto.createHash("sha512").update(password).digest("hex");
  console.log(encrypted);

  const searched = models.user.findOne({where: {username}})
  .then(function (result) {
    if (result) {
      /* already exists */
      util.alertAndRedirect(res, 'already exists', '/');
    } else {
      /* create new one */
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
