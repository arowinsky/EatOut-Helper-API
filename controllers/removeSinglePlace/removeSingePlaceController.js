const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.delete("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;
  const id = req.body.id;

  const key = "sess:" + z;

  redisClient.get(key, (err, red) => {
    red = JSON.parse(red);

    db.collection('eatingPlaces').doc(id).get()
    .then(doc=>{
   

        if(red.localId === doc.data().info.owner ){

            db.collection('eatingPlaces').doc(id).delete().then(()=>{

                res.json({
                    removePlace: true,
                })
            })

        }
        else{
            res.json({
                removePlace: false,
                message: 'You are not the onwer of this place'
            })
        }

    })




  });
});

module.exports = router;
     