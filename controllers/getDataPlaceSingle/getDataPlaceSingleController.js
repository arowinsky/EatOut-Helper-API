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

  const {placeId,z} = req.body
  console.log('z', z)
  console.log('id',placeId)
  const Place = await getPlace(placeId);
  const Opinion = await getOpinion(Place);
  //console.log(Opinion);
  const Posts = await getPostsOwner(Opinion);
  //console.log("opinie", Place);
console.log('z',z)
  if (z === 'null' || z === 'undefined'){

    res.json({
      place: Posts
    });

  }
  else{
const key = "sess:"+z
  redisClient.get(key, (error, data)=>{
    try{
    data = JSON.parse(data);
    console.log("ssss", placeId)

    db.collection('users').doc(data.localId).collection('follow').where("placeId", '==', placeId).get()
    .then(follow =>{
      if(follow.empty){
        Posts.following = false
        res.json({
          place: Posts
        });
      }
      else {
        Posts.following = true
        res.json({
          place: Posts
        });
      }
    })
  }
  catch(error){
    console.log('error redis')
  }
  })
}


});

module.exports = router;
