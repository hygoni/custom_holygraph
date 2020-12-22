var express = require('express');
var router = express.Router();
var models = require('../models');

/* 실제 파일이름과 uploads 폴더에 존재하는 파일이 다르기 때문에, 
   DB상에서 실제 파일 이름을 가져오고, HTTP Header를 수정하여
   실제 파일 이름으로 다운로드 받을 수 있게 하였다.

   예를들어 uploads/c08fa3bdc6259b5bc371f3b135d1e706 에 저장된 실제 파일의 이름은
   HW1_201902722_유형곤.zip이므로 실제 이름으로 바꾸어서 다운로드하게 한다.

*/

router.get('/:file', function(req, res, next) {
  const filepath = 'uploads/' + req.params.file;
  console.log(filepath);
  const subject = models.subject.findOne({where: {'filepath': filepath}})
  .then(function (result) {
    if (!result) {
      models.subscribe.findOne({where: {'filepath': filepath}})
      .then(function(result2) {
        console.log(result2.filename);
        const encoded = encodeURIComponent(result2.filename);
        /* HTTP 헤더 변경 - 파일이름 명시 */
        res.setHeader('Content-Disposition', 'attachment; filename=' + encoded + ';');
        next();
      });
    } else {
      console.log(result.filename);
      const encoded = encodeURIComponent(result.filename);
      /* HTTP 헤더 변경 - 파일이름 명시 */
      res.setHeader('Content-Disposition', 'attachment; filename=' + encoded + ';');
      next();
    }
  });
});

module.exports = router;
