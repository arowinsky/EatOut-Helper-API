const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const app = express();
const axios = require("axios");
const db = require("./config/firebaseConfig");
const FileStore = require("session-file-store")(session);
const register = require("./controllers/registerController");
const reset_password = require("./controllers/resetPasswordController");
const login = require("./controllers/emailLoginController");
const autoLogin = require("./controllers/autoLoginController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());
const option = {
  path: "./session",
  ttl: 3600
};
const store = new FileStore(option);

app.use(
  session({
    secret: "mySessionCode",
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.use("/register", register);
app.use("/reset-password", reset_password);
app.use("/loginEmail", login);
app.use("/autoLogin", autoLogin);

app.post("/logout", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const id = req.body.sid;

  store.destroy(id, err => {
    console.log(err);
  });
  res.json({
    userLogOut: true
  });
});

module.exports = app;
