const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const uid = "Ii8t0OZ88TRI5tnD6SwP8NOSw3q1";

  admin
    .auth()
    .updateUser(uid, {
      disabled: false
    })
    .then(user => {
      console.log(user.toJSON());
      res.json({
        users: user
      });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
