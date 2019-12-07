const express = require("express");
const router = express.Router();
const uploadImg = require("../upload/upload");

router.post("/", async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const idUser = req.body.user[0];
    const idPlace = req.body.user[1];
    const avatar = req.files.photo[0];
    const header = req.files.photo[1];
    const menu = req.files.photo[2];
    
    if(req.files.photo.length < 3 || req.body.user.length <2){
      res.json({
        noAllImagesSended:true
      })
    }
    else{
      let statusType = true

      for(let i = 0; i< req.files.photo.length; i++){
        if(req.files.photo[i].mimetype ===  'image/jpeg' || req.files.photo[i].mimetype ===  'image/png' ||req.files.photo[i].mimetype ===  'image/bmp' ){
        }
        else{
          switch(i){
            case 0:
              statusType = false
              res.json({
              invalidFormatFile: "INVALID_AVATAR",
              noValidFormatFiles:true,
              })
            break;

            case 1 : 
              statusType = false
              res.json({
              invalidFormatFile: "INVALID_HEADER",
              noValidFormatFiles:true,
              })
            break;

            case 2 : 
              statusType = false
              res.json({
                invalidFormatFile: "INVALID_MENU",
                noValidFormatFiles:true,
              })
            break;
          }
      break;
    }
  }
      if(statusType === true){
        await uploadImg(avatar, "avatar.jpg", idUser, idPlace);
        await uploadImg(header, "header.jpg", idUser, idPlace);
        await uploadImg(menu, "menu.jpg", idUser, idPlace);

        res.json({
          uploadSuccess: true
        });
      }
    }
  }catch (error) {
    console.log(error)
    res.send("error");
  }
});

module.exports = router;
