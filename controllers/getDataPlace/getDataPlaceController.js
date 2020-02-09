const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
const getPlace = require("../../getAll/getPlace");
const getOpinion = require("../../getAll/getClientOpinon");
const getPostsOwner = require("../../getAll/getPostsOwner");
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const z = req.query.z;
  const key = "sess:" + z;
  redisClient.get(key, async (err, red) => {
    red = JSON.parse(red);
    const Place = await getPlace(red.localId);
    if (Place != null) {
      const Opinion = await getOpinion(Place);
      const Posts = await getPostsOwner(Opinion);
      res.json({
        places: Posts
      });
    } else {
      res.json({
        places: null
      });
    }
  });
});

module.exports = router;
