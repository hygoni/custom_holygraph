var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');
var multer = require('multer');
var fs = require('fs');
var uploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    }
  }),
});


/* upload subject files */

router.post('/', uploader.single('file'), function(req, res, next) {
  if (!req.session.username) {
    util.alertAndRedirect(res, 'not logged in', '/');
    return ;
  }

  const title = req.body.title;
  const username = req.session.username;
  const filename = req.file.originalname;
  const filepath = req.file.path;

  if (!title || !filename || !filepath || !username)
    util.alertAndRedirect(res, 'invalid input', '/view/submit');

  models.subscribe.findOne({where: {'title': title, 'username': username}})
  .then(function(subscribe) {
    subscribe.update({'filename': filename, 'filepath': filepath, 'status': 'closed'});
    util.alertAndRedirect(res, 'successfully submitted', '/');
  });  
});

module.exports = router;
