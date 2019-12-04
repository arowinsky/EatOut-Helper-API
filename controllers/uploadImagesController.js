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

    await uploadImg(avatar, "avatar.jpg", idUser, idPlace);
    await uploadImg(header, "header.jpg", idUser, idPlace);
    await uploadImg(menu, "menu.jpg", idUser, idPlace);

    res.json({
      uploadSuccess: true
    });
  } catch (error) {
    res.send("error");
  }
});

module.exports = router;
