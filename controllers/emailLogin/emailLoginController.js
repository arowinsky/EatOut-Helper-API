const express = require("express");
const router = express.Router();
const axios = require("axios");
const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
        if (users.data.users[0].emailVerified === false) {
          res.json({
            emailUnverified: true
          });
        } else {
          req.session.Token = user.data.idToken;
          req.session.email = user.data.email;
          req.session.localId = user.data.localId;
          req.session.expiresIn = user.data.expiresIn;
          req.session.provider = "email"
          db.collection("users")
            .doc(req.session.localId)
            .get()
            .then(doc => {
              let userData = doc.data().userData;
              req.session.userData = userData;
              let localId = user.data.localId;
              req.session.username = doc.data().username;
              req.session.rule = doc.data().rule;
              res.json({
                provider: req.session.provider,
                status: true,
                name: userData,
                idSession: req.sessionID,
                userId: localId,
                userRule: doc.data().rule
              });
            });
        }
      });
    })
    .catch(error => {
      res.status(201);
      res.json({ error: error.response.data.error.message });
    });
});
module.exports = router;
