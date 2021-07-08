module.exports.requireLogin = function (req, res, next) {
  if (!req.session.user_id) {
    return res.send("You must be logged in");
  }
  next();
};
