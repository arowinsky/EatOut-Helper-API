const express = require("express");
const router = express.Router();
const axios = require("axios");

const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { uid, displayName, token, newUser, provider } = req.body;

  if (newUser === "true") {
    db.collection("users")
      .doc(uid)
      .set({
        firstName: "",
        lastName: "",
        userData: displayName,
        username: displayName,
        rule: "client"
      })
      .then(() => {
        req.session.provider = provider
        req.session.token = token;
        req.session.localId = uid;
        req.session.username = displayName;
        req.session.rule = "client";

        res.json({
          provider: provider,
          name: displayName,
          idSession: req.sessionID,
          userId: uid,
          userRule: "client"
        });
      });
  } else {
    db.collection("users")
      .doc(uid)
      .get()
      .then(user => {
        req.session.provider = provider
        req.session.token = token;
        req.session.localId = uid;
        req.session.username = displayName;
        req.session.userData = displayName;
        req.session.rule = user.data().rule;

        res.json({
          provider: provider,
          status: true,
          name: user.data().UserData,
          idSession: req.sessionID,
          userId: uid,
          userRule: user.data().rule
        });
      });
  }
});
module.exports = router;
