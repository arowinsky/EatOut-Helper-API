const app = require("./app");
const firebaseToRedis = require('./controllers/serchPlacesForRedis/SerchPlacesForRedisController');
app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
 firebaseToRedis()
  console.log(`Listen ${server.address().port}`);
});
