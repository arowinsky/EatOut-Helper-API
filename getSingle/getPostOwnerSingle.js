const { db, admin} = require("../config/firebaseConfig");

    const postOwnerOnes = (places) => new Promise((resolve , reject) =>{
      
  db.collection("eatingPlaces")
      .doc(places.id)
      .collection('postsOwner')
      .orderBy('date', "desc")
      .get()
      .then(post => {
        if (post.empty) {
            console.log('empty owner')
          places.postsOwner = false
        const NewPostsOwner = places
        resolve(NewPostsOwner)
        } else {
          const postsOwner = post.docs.map(doc => {
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
       
          places.ownerPosts = postsOwner
        const NewPlace = places
         resolve(NewPlace)
       }
     })
    
})
    module.exports = postOwnerOnes;
