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
      axios({
        method: "POST",
        url:
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
        data: {
          idToken: user.data.idToken
        }
      }).then(users => {
        console.log(users.data.users[0].emailVerified);
        if (users.data.users[0].emailVerified === false) {
          res.json({
            emailUnverified: "unverified"
          });
        } else {
          req.session.Token = user.data.idToken;
          req.session.email = user.data.email;
          req.session.localId = user.data.localId;
          req.session.expiresIn = user.data.expiresIn;
          db.collection("users")
            .doc(req.session.localId)
            .get()
            .then(doc => {
              let userData = doc.data().userData;
              req.session.userData = userData;
              console.log(req.sessionID);
              res.json({
                status: true,
                name: userData,
                idSession: req.sessionID
              });
            });
        }
      });
    })
    .catch(error => {
      res.status(201);
      res.json({ error: true });
    });
}),
  app.post("/autoLogin", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    const id = req.body.sid;
    const reSend = req.body.pleaseReSend;
    if (id != "null") {
      store.get(id, (err, session) => {
        if (id != "undefined" && reSend) {
          console.log("Resending" + session.userData);
          res.json({
            userInfo: session.userData
          });
        }
        if (err) {
          console.log("error");
          res.json({
            session: "TimeOut"
          });
        }
      });
    } else {
      console.log("lack sid");
      res.json({
        session: "TimeOut"
      });
    }
  });
(module.exports = app), session;
