/* 클라이언트에게 alert와 redirect를 동시에 하기 위해 만든 util입니다. */

module.exports.alertAndRedirect = function (res, msg, location) {
  res.send(`<script>alert("${msg}"); window.location.href = "${location}"</script>`);
}


