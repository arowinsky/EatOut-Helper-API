const { db, admin} = require("../config/firebaseConfig");

    const opinion = (places) => new Promise((resolve , reject) =>{
let i = 0;
    
      for(i ;i< places.length; i++){
     
        
      const licznik = i
  db.collection("eatingPlaces")
      .doc(places[i].id)
      .collection('clientOpinions')
      .orderBy('date', "desc")
      .get()
      .then(post => {
        if (post.empty) {
            console.log('empty')
          places[licznik].clientsOpinions = false
        const NewPlace = places
        } else {
          const clientOpinion = post.docs.map(doc => {
            const {
              author,
              clientOpinion,
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
              clientOpinion: clientOpinion,
              date: sendDate
            }
            return array;
          });

          places[licznik].clientsOpinions = clientOpinion
        const NewPlace = places
         resolve(NewPlace)
       }
     })
    }
})
    module.exports = opinion
