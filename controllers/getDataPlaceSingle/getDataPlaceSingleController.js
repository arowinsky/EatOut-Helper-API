const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
const getPlace = require("../../getSingle/getPlaceSingle");
const getOpinion = require("../../getSingle/getClientOpinionSingle");
const getPostsOwner = require("../../getSingle/getPostOwnerSingle");
router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");


  const id = req.body.id;
    const Place = await getPlace(id);
    //console.log(Place)
    const Opinion = await getOpinion(Place);
    console.log(Opinion)
    const Posts = await getPostsOwner(Opinion);
    //console.log("opinie", Place);

    res.json({
      places: Posts
    });
  
});

module.exports = router;
