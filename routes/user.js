const express = require("express");
const router = express.Router();
const User = require("../models/users");
const userController = require("../controller/users");
const { requireLogin } = require("../middleware");
router.get("/", (req, res) => {
  console.log(req.session.user_id);
  console.log("User route");
  res.send("user");
});
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", requireLogin, userController.logout);
router.post("/:id/edit", requireLogin, userController.edit);
router.post("/:id/delete", requireLogin, userController.delete);
router.get("/protected", requireLogin, (req, res) => {
  console.log(req.session.user_id);
  console.log("Protected");
  res.send("Protected");
});
module.exports = router;
