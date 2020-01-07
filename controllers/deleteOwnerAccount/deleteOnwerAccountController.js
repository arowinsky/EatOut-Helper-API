const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
const removeImages = require('../../upload/remove');
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;

  const key = "sess:" + z;
  console.log(key);
  redisClient.get(key, (err, red) => {
    red = JSON.parse(red);

    db.collection("eatingPlaces").where('info.owner','==', red.localId).get()
    .then((places)=>{
        places.forEach(doc=>{
            db.collection("eatingPlaces").doc(doc.id).delete().then(async()=>{
                await removeImages('avatar.jpg', red.localId, doc.id);
                await removeImages('header.jpg', red.localId, doc.id);
                await removeImages('menu.jpg', red.localId, doc.id);


            })
    })
})
    .then(()=>{

        db.collection('users').doc(red.localId).delete()
       admin.auth().deleteUser(red.localId).then(()=>{
           redisClient.del(key)
           res.json({
               ownerDeleted: true
           })
       })
    })


    });
});

module.exports = router;
