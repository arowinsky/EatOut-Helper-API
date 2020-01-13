const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const uid = "esQWDvSANgOpyNSnSnQEv5l9JuE3";

  admin
    .auth()
    .updateUser(uid, {})
    .then(user => {
      console.log(user);
      res.json({
        users: user
      });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
