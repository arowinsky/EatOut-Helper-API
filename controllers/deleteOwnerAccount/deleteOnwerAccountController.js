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
        places.forEach(Places=>{
           
           
            db.collectionGroup('follow').where('placeId', '==', Places.id).get()
            .then(follow =>{     
                follow.forEach((Follow) =>{
                db.collection('users').doc(Follow.data().uid).collection('follow').doc(Follow.id).delete();
                })
            })

            db.collection('eatingPlaces').doc(Places.id).collection('postsOwner').get()
            .then((posts)=>{
                posts.forEach(Posts=>{
                db.collection('eatingPlaces').doc(Places.id).collection('postsOwner').doc(Posts.id).delete();
            })
        })

            db.collection('eatingPlaces').doc(Places.id).collection('clientOpinions').get()
            .then((opinion)=>{
                opinion.forEach(Opinion=>{
                db.collection('eatingPlaces').doc(Places.id).collection('clientOpinions').doc(Opinion.id).delete();
            })
        })


            db.collection("eatingPlaces").doc(Places.id).delete().then(async()=>{
                await removeImages('avatar.jpg', red.localId, Places.id);
                await removeImages('header.jpg', red.localId, Places.id);
                await removeImages('menu.jpg', red.localId, Places.id);


            })
    })
})
    .then(()=>{

        db.collection('users').doc(red.localId).collection('follow').get()
            .then((follow)=>{
                follow.forEach(Follow=>{
                db.collection('users').doc(red.localId).collection('follow').doc(Follow.id).delete();
            })
        })

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
