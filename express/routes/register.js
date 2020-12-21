var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var models = require('../models');

/* register. */
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
      res.status(500).send("already exists");
    } else {
      /* create new one */
      const created = models.user.create({
        'username': username,
        'password': encrypted
      });
      res.send('successfully created!');
    }
  });
});

module.exports = router;
