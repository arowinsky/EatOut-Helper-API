const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, storage } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;
  if (z != "null") {
    const key = "sess:" + z;
    console.log(key);
    redisClient.get(key, (error, red) => {
      const dates = JSON.parse(red);
      
      
      db.collection("eatingPlaces")
        .where("info.owner", "==", dates.localId)
        .get()
        .then(snapshot => {
          let Opinions;
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }else{
            
       const places = snapshot.docs.map(doc => {
            const dishes = doc.data().dishes;
            const info = doc.data().info;
            const kitchen = doc.data().kitchen;
            const opportunity = doc.data().opportunity;
            const facilities = doc.data().facilities;
            const id = doc.id;
            const avatar = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/avatar.jpg`
            const header = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/header.jpg`
            const menu = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/menu.jpg`

          db.collection("eatingPlaces").doc(id).collection('clientOpinions').orderBy('data').get().then((opinions)=>{
            if(opinions.empty){
              console.log('empty')
            }
            else{
              Opinions = opinions.docs.map(opinion=>{
                const author = opinion.data().author;
                const clientOpinion = opinion.data().clientOpinion;
                const date = opinion.data().data;

                const SendOpinions = {
                  author:author,
                  clientOpinion: clientOpinion,
                  date: date
                }
                //console.log('opinie ', SendOpinions)
                return(SendOpinions)
              })
              console.log(Opinions)
            }

          })
          
            const array = {id:id,
            dishes: dishes,
            info: info,
            kitchen: kitchen,
            opportunity: opportunity,
            facilities: facilities,
            avatar: avatar,
            header: header,
            menu: menu,
            }
            
            return(array)
          
          });
          
          console.log(places);
          res.json({
            places: places,
            opinion: Opinions,
          });
        }
        });
    });
  }
});
module.exports = router;
