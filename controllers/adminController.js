const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../config/firebaseConfig");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const uid = 'dP6KZLwYh6eLw6egUE7tpOjIJBx1'

  admin
    .auth()
    .getUser(uid)
    .then(user => {
      res.json({
        users: user
      })
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
