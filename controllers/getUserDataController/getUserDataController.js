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

const key ='sess:'+req.body.z;




});

module.exports = router;