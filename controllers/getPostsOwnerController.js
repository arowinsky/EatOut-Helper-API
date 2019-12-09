const { db, admin} = require("../config/firebaseConfig");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const id = req.body.currentEatingPlaceProfileId ;

    db.collection("eatingPlaces")
      .doc(id)
      .collection('postsOwner')
      .orderBy('date', "desc")
      .get()
      .then(posts => {
       const postsOwner = posts.docs.map(doc => {
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
              return(array)

        })

        res.json({
            postsForCurrentProfile: postsOwner
        })
      })


})


module.exports = router;