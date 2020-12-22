var express = require('express');
var router = express.Router();
var models = require('../models');

/* resolve filename */

router.get('/:file', function(req, res, next) {
  const filepath = 'uploads/' + req.params.file;
  console.log(filepath);
  const subject = models.subject.findOne({where: {'filepath': filepath}})
  .then(function (result) {
    console.log(result.filename);
    const encoded = encodeURIComponent(result.filename);
    res.setHeader('Content-Disposition', 'attachment; filename=' + encoded + ';');
    next();
  });
});

module.exports = router;
