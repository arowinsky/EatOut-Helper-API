const { db, admin} = require("../config/firebaseConfig");
const getOpinion = require('./getClientOpinon')
    const place = (localId) => new Promise((resolve , reject) =>{
localId = "E8H5KGqs14bQJt1LorrTuCmkc812"
    db.collection("eatingPlaces")
      .where("info.owner", "==", localId)
      .get()
      .then( async (places) => {
        if (places.empty) {
            resolve('empty places')
        } else {
           const Places = await places.docs.map( doc => {
            const {
              dishes,
              info,
              kitchen,
              opportunity,
              facilities
            } = doc.data();
      
            const id = doc.id;
            const avatar = `https://storage.cloud.google.com/eatout/${localId}/${id}/avatar.jpg`;
            const header = `https://storage.cloud.google.com/eatout/${localId}/${id}/header.jpg`;
            const menu = `https://storage.cloud.google.com/eatout/${localId}/${id}/menu.jpg`;
    
            const array = {
              id: id,
              dishes: dishes,
              info: info,
              kitchen: kitchen,
              opportunity: opportunity,
              facilities: facilities,
              avatar: avatar,
              header: header,
              menu: menu,

            };
            return array;
          }
          )
          resolve(Places)
        }
      })
      .catch(err=>{
        reject(err)
      })
      
      



})

    module.exports = place
