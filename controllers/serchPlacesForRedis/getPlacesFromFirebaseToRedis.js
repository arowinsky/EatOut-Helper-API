const { db, admin} = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient()


    const place = () => new Promise((resolve , reject) =>{
    db.collection("eatingPlaces")
      .get()
      .then( async (places) => {
        if (places.empty) {
            resolve('empty places')
        } else {
           const Places = await places.docs.map( doc => {
            const {
              info,
            } = doc.data();

            const id = doc.id;
            const avatar = `https://storage.cloud.google.com/eatout/${info.owner}/${id}/avatar.jpg`;

            const array = {
              id: id,
              name: info.restaurantName,
              restaurantStreet:info.restaurantStreet,
              avatar: avatar,
              restaurantBuildingNumber: info.restaurantBuildingNumber,
              restaurantCity: info.restaurantCity,
            };
            return array;
          }
          )
         let  RedisPlaces = JSON.stringify(Places)
        redisClient.set('places',RedisPlaces , 'Ex', 3600 ) 
          console.log(Places)
          resolve(Places)
        }
      })
      .catch(err=>{
        reject(err)
      })
})

    module.exports = place
