module.exports.alertAndRedirect = function (res, msg, location) {
  res.send(`<script>alert("${msg}"); window.location.href = "${location}"</script>`);
}


