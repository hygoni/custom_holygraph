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
  if (!req.session.username)
    util.alertAndRedirect(res, 'not logged in', '/');

  console.log(req.file);
  console.log(req.body);
  const title = req.body.title;
  const desc = req.body.desc;
  const filename = req.file.originalname;
  const filepath = req.file.path;
  const exp = Number(req.body.exp);

  if (!title || !desc || !filename || !filepath || !exp)
    util.alertAndRedirect(res, 'invalid input', '/new');

  models.subject.create({
    'title': title,
    'desc': desc,
    'filename': filename,
    'filepath': filepath,
    'author': req.session.username,
    'exp': exp
  });

  util.alertAndRedirect(res, 'subject is successfully created', '/');

});

module.exports = router;
