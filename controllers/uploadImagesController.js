const express = require("express");
const router = express.Router();
const uploadImg = require('../upload/upload')
const redis = require("redis");
const redisClient = redis.createClient();
router.post("/", async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
      try{
        const idUser = req.body.idUser
    

        const idPlace = req.body.idPlace;
          const avatar = req.files.avatar[0];
          const header = req.files.header[0];
          const menu = req.files.menu[0];

        //console.log(avatar)

           await uploadImg(avatar, 'avatar.jpg', idUser, idPlace);
           await uploadImg(header, 'header.jpg',idUser, idPlace);
           await uploadImg(menu, 'menu.jpg',idUser, idPlace)
  
          res.json({
              message: "upload udany",
          })
  
  
      }
      catch(error){
        console.log(error)
        res.send('error')
      }
  });


module.exports = router;
