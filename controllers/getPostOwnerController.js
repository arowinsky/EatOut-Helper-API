const express = require("express");
const router = express.Router();
const { db, admin} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
    const place = req.body.placesId 

    db.collection("eatingPlaces")
    .doc(place)
    .collection('postsOwner')
    .orderBy('date', "desc")
      .get()
      .then(post => {
        if (post.empty) {
          res.json({
            post: false
          });
        } else {
          const posts = post.docs.map(doc => {
            const {
              author,
              post,
              date,
            } = doc.data();
            
            const newDate = date.toDate();
            const DateString = newDate.toISOString()
            const year = DateString.substr(0,4);
            const month = DateString.substr(5,2)
            const day = DateString.substr(8,2)
            const hour = DateString.substr(11,2)
            const minute = DateString.substr(14,2)

          
            const sendDate= day+'.'+ month+'.'+year +' '+ hour+':'+minute;

            const array = {
              author: author,
              post: post,
              date: sendDate
            }
            return array;
          });

          res.json({
            posts: posts
          });
        }
      })
      .catch(err=>{
        res.json({
          error:err
        })
      })
  });

module.exports = router;
