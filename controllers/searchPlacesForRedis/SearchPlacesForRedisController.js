const express = require("express");
const getPlacesFromFirebaseToRedis = require('./getPlacesFromFirebaseToRedis');




const SearchPlacesForRedisController = async ()=>{

const Place = await getPlacesFromFirebaseToRedis();
var interval = setInterval(getPlacesFromFirebaseToRedis, 3600*1000)

//console.log(Place)
//   redisClient.set('places',Place , 'Ex', 3600 ) 

};
module.exports = SearchPlacesForRedisController;
