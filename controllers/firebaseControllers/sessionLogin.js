exports.sessionLogin = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(req.cookie);
  res.json({ data: "sended" });
};
