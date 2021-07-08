const bcrypt = require("bcryptjs");
const User = require("../models/users");
module.exports.signup = async function (req, res) {
  const { name, email, role, password } = req.body;
  const code = await bcrypt.hash(password, 10);
  const user = new User({ name, password: code, email, role });
  await user.save();
  req.session.user_id = user._id;
  res.send(user);
};
module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user_id = user._id;
      console.log(req.session.user_id);
      res.send(user);
    } else {
      res.status(401).send({ message: "Invalid password" });
    }
  } else {
    res.status(401).send({ message: "Invalid email" });
  }
};
module.exports.logout = async function (req, res) {
  req.session.user_id = null;
  res.send({ message: "Logged out" });
};
module.exports.edit = async function (req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    res.send(user);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};
module.exports.delete = async function (req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    await user.remove();
    res.send({ message: "User deleted" });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};
module.exports.getAll = async function (req, res) {
  const users = await User.find({});
  res.send(users);
};
