const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, storage } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const clientOpinion = req.body.clientOpinion;
  const z = "sess:" + req.body.z;
  const eatingPlaceId = req.body.eatingPlaceId;
  console.log(z);
  redisClient.get(z, (err, session) => {
    session = JSON.parse(session);
    const username = session.username;
    const data = new Date();
    console.log(data);

    db.collection("eatingPlaces")
      .doc(eatingPlaceId)
      .collection("clientOpinions")
      .doc()
      .set({ clientOpinion: clientOpinion, author: username, data: new Date() })
      .then(() => {
        res.json({
          isAdded: true
        });
      });
  });
});
module.exports = router;
