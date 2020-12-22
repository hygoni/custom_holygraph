var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('./util');

/* 파일 처리 관련 미들웨어들 */
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
  /* uploads에 저장된 파일 이름과, 실제 파일의 이름을 DB에 저장한다. */
  const filename = req.file.originalname;
  const filepath = req.file.path;
  const exp = Number(req.body.exp);
  const length = Number(req.body.length);

  if (!title || !desc || !filename || !filepath || !exp || !length)
    util.alertAndRedirect(res, 'invalid input', '/new');

  let json = {};
  for (let i = 1; i <= length; i++) {
    json["checklist" + i] = req.body["checklist" + i];
  }

  /* 새 프로젝트를 데이터베이스에 저장 */
  models.subject.create({
    'title': title,
    'desc': desc,
    'filename': filename,
    'filepath': filepath,
    'author': req.session.username,
    'exp': exp,
    'checklist': json
  });

  util.alertAndRedirect(res, 'subject is successfully created', '/');

});

module.exports = router;
