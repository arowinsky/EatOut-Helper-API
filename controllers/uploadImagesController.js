const express = require("express");
const router = express.Router();
const uploadImg = require("../upload/upload");

router.post("/", async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let statusType = true;
  try {
    if (req.files.photo === null || req.files.photo === undefined) {
      statusType = false;
      res.json({
        noAllImagesSended: true
      });
    } else {
      const idUser = req.body.user[0];
      const idPlace = req.body.user[1];
      const avatar = req.files.photo[0];
      const header = req.files.photo[1];
      const menu = req.files.photo[2];
      let unavailable = {
        erroravatar: false,
        errorHeader: false,
        errorMenu: false
      };
      for (let i = 0; i < req.files.photo.length; i++) {
        if (
          req.files.photo[i].mimetype === "image/jpeg" ||
          req.files.photo[i].mimetype === "image/png" ||
          req.files.photo[i].mimetype === "image/bmp"
        ) {
        } else {
          switch (i) {
            case 0:
              statusType = false;
              unavailable.errorAvatar = true;
              break;

            case 1:
              statusType = false;
              unavailable.errorHeader = true;
              break;

            case 2:
              statusType = false;
              unavailable.errorMenu = true;
              break;
          }
        }
      }
      if (statusType === true) {
        await uploadImg(avatar, "avatar.jpg", idUser, idPlace);
        await uploadImg(header, "header.jpg", idUser, idPlace);
        await uploadImg(menu, "menu.jpg", idUser, idPlace);

        res.json({
          uploadSuccess: true
        });
      } else {
        res.json({
          invalidFormatFile: unavailable
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
