const express = require("express");
const router = express.Router();
const axios = require("axios");
const {db, admin} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const username = req.body.userName;
  console.log(req.body);
  const authData = {
    email: req.body.email,
    password: req.body.password
  };

  res.setHeader("Access-Control-Allow-Origin", "*");

  db.collection("users")
    .where("username", "==", username)
    .get()
    .then(docs => {
      if (docs.size >= 1) {
        res.json({
          usernameTaken: true
        });
      } else {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
            authData
          )
          .then(response => {
            db.collection("users")
              .doc(response.data.localId)
              .set({
                firstName: firstname,
                lastName: lastname,
                username: username,
                userData: firstname + " " + lastname
              })
              .then(() => {
                axios({
                  method: "post",
                  url:
                    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
                  headers: {},
                  data: {
                    requestType: "VERIFY_EMAIL",
                    idToken: response.data.idToken
                  }
                }).then(() => {
                  res.json({
                    isRegistered: true
                  });
                });
              })

              .catch(err => {
                res.json({
                  error: "error write to database"
                });
              });
          })
          .catch(err => {
            res.json({
              emailTaken: true
            });
          });
      }
    })
    .catch(err => {
      res.json({
        error: "error read username from database"
      });
    });
});
module.exports = router;
