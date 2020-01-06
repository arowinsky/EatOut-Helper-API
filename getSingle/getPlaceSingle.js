const { db, admin} = require("../config/firebaseConfig");

    const placeOnes = (id) => new Promise((resolve , reject) =>{
    db.collection("eatingPlaces")
      .doc(id)
      .get()
      .then( async (place) => {
        if (place.empty) {
            resolve('false')
        } else {
          
          
          Place = place.data();
          Place.id = id
          //console.log(Place)
          resolve(Place)
        }
      })
      .catch(err=>{
        console.log(err)
        reject(err)
      })
      
      



})

    module.exports = placeOnes
