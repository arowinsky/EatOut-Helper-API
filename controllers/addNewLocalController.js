const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const test = JSON.stringify(req.body.values);
  console.log(test);
});
module.exports = router;
