const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body.z);
  const key = "sess:" + req.body.z;

  redisClient.get(key, (error, data) => {
    data = JSON.parse(data);
    console.log("dupa dupa", data);
    db.collection("users")
      .doc(data.localId)
      .get()
      .then(user => {
        res.json({
          firstName: user.data().firstName,
          lastName: user.data().lastName,
          username: user.data().username,
          email: data.email
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
});

module.exports = router;
