const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");

const getPlace = require("./getData/getPlace");
const getOpinion = require("./getData/getClientOpinon");
const getPostsOwner = require("./getData/getPostsOwner");

router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
  console.log(name);
  try {

    const Place = await getPlace(name);
    const Opinion = await getOpinion(Place);
    const Posts = await getPostsOwner(Opinion);


    res.json({
      send: Posts
    })



  } catch (error) {
    console.log(error)
  }

});

module.exports = router;
