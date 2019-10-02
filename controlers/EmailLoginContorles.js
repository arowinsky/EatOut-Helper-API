const firebase =require('../config/firebaseConfig')
require('firebase');
exports.LoginEmail = (req,res)=>{
    const email= req.body.email;
    const password = req.body.password;

    res.setHeader('Access-Control-Allow-Origin', '*')
const auth = firebase.auth();
      auth.signInWithEmailAndPassword(email, password)
      .then(Response=>{
        console.log("zalogowano");
        res.json({Response})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(errorMessage);
      }) 
      
  


};





