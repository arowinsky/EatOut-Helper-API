const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin} = require("../config/firebaseConfig");
const getPlace = require('../getAll/getPlace');
const getOpinion = require('../getAll/getClientOpinon');
const getPostsOwner = require('../getAll/getPostsOwner');
router.post("/", async (req, res) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;

  const key = "sess:" + z;
  console.log(key);
//redisClient.get(key, async (err, red)=>{
  // red = JSON.parse(red);
 const w = "E8H5KGqs14bQJt1LorrTuCmkc812"
  const Place =  await getPlace(w )
  const Opinion = await getOpinion(Place)
  const Posts = await getPostsOwner(Opinion)
console.log('opinie', Place[0])


res.json({
  send:Posts
})

})

//});

module.exports = router;
