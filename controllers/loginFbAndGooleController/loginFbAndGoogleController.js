const express = require("express");
const router = express.Router();
const axios = require("axios");

const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log('weszło')
    console.log(req.body)
  const uid = req.body.uid;
  const displayName = req.body.displayName;
  const token = req.body.token;
  const newUser = req.body.newUser;

        if(newUser === "true"){
          db.collection('users').doc(uid).set({
            firstName: "",
            lastName:"",
            userData:displayName,
            username:displayName,
            rule:'client'
          })
          .then(()=>{
            req.session.token = token;
            req.session.localId=uid;
            req.session.username= displayName;
            req.session.rule = 'client'

            res.json({
              name: displayName,
              idSession: req.sessionID,
              userId: uid,
              userRule: 'client',
            })
          })
        }
        else{

          db.collection('users').doc(uid).get()
          .then(user=>{
            req.session.token = token;
            req.session.localId=uid;
            req.session.username= displayName;
            req.session.userData = displayName;
            req.session.rule = 'client'
          
            res.json({
              status: true,
              name: user.data().UserData,
              idSession: req.sessionID,
              userId: uid,
              userRule: user.data().rule,
            })
          })



        }

});
module.exports = router;
