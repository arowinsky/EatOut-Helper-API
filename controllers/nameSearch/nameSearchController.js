const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");

const getPlace = require("./getData/getPlace");
const getOpinion = require("./getData/getClientOpinon");
const getPostsOwner = require("./getData/getPostsOwner");
const redis = require("redis");
const redisClient = redis.createClient();
router.get("/", async (req, res) => {
  const checFunction = (value) => {

    return value != null
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
  console.log(name);
  try {
let sendArray =[]
    redisClient.get('places', (err, date) => {
      const dates = JSON.parse(date);
      console.log(dates.length)
      for(let i=0; i<dates.length;i++){
        if (dates[i].name.substring(0, name.length) == name) {
          console.log(dates[i])
        
          sendArray[i]={id: dates[i].id,
            name:dates[i].name ,
            restaurantStreet: dates[i].restaurantStreet,
            restaurantBuildingNumber:dates[i].restaurantBuildingNumber,
            restaurantCity:dates[i].restaurantCity,
            avatar:dates[i].avatar
          }
        }
      }
const NewArray = sendArray.filter(checFunction)

      res.json({
        matchingPlaces: NewArray
      })
    })





  } catch (error) {
    console.log(error)
  }

});

module.exports = router;
