const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const app = express();
const axios = require("axios");
const db = require("./config/firebaseConfig");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());

app.use(
  session({
    secret: "mySessionCode",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

app.post("/loginEmail", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const authData = {
    email: req.body.email,
    password: req.body.password,
    returnSecureToken: true
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
      authData
    )
    .then(user => {
      console.log("get user");
      req.session.Token = user.data.idToken;
      req.session.email = user.data.email;
      req.session.localId = user.data.localId;
      req.session.expiresIn = user.data.expiresIn;
    })
    .then(() => {
      db.collection("users")
        .doc(req.session.localId)
        .get()
        .then(doc => {
          let userData = doc.data().userData;
          req.session.userData = userData;
          res.status(201).json({
            status: true,
            name: userData
          });
        });
    })

    .catch(error => {
      res.status(401);
      res.send("error");
    });
}),
  (module.exports = app);
