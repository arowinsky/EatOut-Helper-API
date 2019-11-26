const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, storage } = require("../config/firebaseConfig");
const {Storage} = require('@google-cloud/storage'); 
const key =  require("../config/GoogleCloud.json");

const storageGoogle = new Storage(key);

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const avatar = storageGoogle.bucket('eatout').file('avatar.jpg').download()
  .then((avatar)=>{
  
  const header = storageGoogle.bucket('eatout').file('ps.png').download()
  .then((header)=>{

  
 storageGoogle.bucket('eatout').file('psMenu.jpg').download()
   .then((menu)=>{
    console.log(avatar)


    res.json({
      menu:menu[0],
      header:header[0],
      avatar:avatar[0]
    })
  })
})


})


  // console.log(req.body);
  // const z = req.body.z;
  // if (z != "null") {
  //   const key = "sess:" + z;
  //   console.log(key);
  //   redisClient.get(key, (error, red) => {
  //     const dates = JSON.parse(red);
  //     console.log(dates);
  //     console.log("local ", dates.localId);
  //     db.collection("eatingPlace")
  //       .where("info.owner", "==", dates.localId)
  //       .get()
  //       .then(snapshot => {
  //         if (snapshot.empty) {
  //           console.log("No matching documents.");
  //           return;
  //         }
  //         snapshot.forEach(doc => {
  //           const dishes = doc.data().dishes;
  //           const info = doc.data().info;
  //           const kitchen = doc.data().kitchen;
  //           const opportunity = doc.data().opportunity;
  //           const facilities = doc.data().facilities;
  //           const id = doc.id;
  //           res.json({
  //             dishes: dishes,
  //             info: info,
  //             kitchen: kitchen,
  //             opportunity: opportunity,
  //             facilities: facilities,
  //             id: id,
  //             avatar: avatar,
  //             header: header,
  //             menu : menu,
  //           });
  //         });
  //       });
  //   });
  // }
});
module.exports = router;
