const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { z } = req.query;

  const key = "sess:" + z;
  redisClient.get(key, (err, data) => {
    try {
      data = JSON.parse(data);

      db.collection("users")
        .doc(data.localId)
        .collection("follow")
        .get()
        .then(follow => {
          if (follow.empty) {
            res.json({
              follow: null
            });
          } else {
            const Follow = follow.docs.map(follows => {
              const { placeId, placeName, avatar } = follows.data();

              const array = {
                placeId: placeId,
                placeName: placeName,
                avatar
              };

              return array;
            });

            res.json({
              follow: Follow
            });
          }
        });
    } catch (error) {
      res.json({
        error: "I don't reading data from redis"
      });
    }
  });
});

module.exports = router;
