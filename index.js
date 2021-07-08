//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
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const userRouter = require("./routes/user");
const tripRouter = require("./routes/trips");
const bcrypt = require("bcryptjs");
const DBURL =
  "mongodb+srv://Anubhav:trip@cluster0.m7sr4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const sessionconfig = {
  name: "session",
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionconfig));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use("/users", userRouter);
app.use("/trips", tripRouter);
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

app.get("/", function (req, res) {
  res.send("home");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`On port ${port}`);
});
