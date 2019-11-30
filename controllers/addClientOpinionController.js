const express = require("express");
const router = express.Router();
const { db, admin} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const clientOpinion = req.body.clientOpinion;
  const z = "sess:" + req.body.z;
  const eatingPlaceId = req.body.eatingPlaceId;
  console.log(z);
  redisClient.get(z, (err, session) => {
    session = JSON.parse(session);
    try{
    const username = session.username;


    db.collection("eatingPlaces")
      .doc(eatingPlaceId)
      .collection("clientOpinions")
      .doc()
      .set({ clientOpinion: clientOpinion, author: username, date: new Date() })
      .then(() => {
        res.json({
          isAdded: true
        });
      });
    }
    catch(error){
      res.json({
        error:"wrong_z"
      })
    }
  });
});
module.exports = router;
