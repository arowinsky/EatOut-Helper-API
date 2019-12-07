const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const app = express();

const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const register = require("./controllers/registerController");
const reset_password = require("./controllers/resetPasswordController");
const login = require("./controllers/emailLoginController");
const autoLogin = require("./controllers/autoLoginController");
const logOut = require("./controllers/logOutController");
const addNewLocal = require("./controllers/addNewLocalController");
const getDataPlace = require("./controllers/getDataPlaceController");
const deleteUser = require("./controllers/adminController");
const addPosts = require("./controllers/addPostOwnerController");
const generationCodeForClient = require("./controllers/generationCodeForClientController");
const verificationClientCode = require("./controllers/verificationClientCodeController");
const addClientOpinion = require("./controllers/addClientOpinionController");
const upload = require("./controllers/uploadImagesController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());

redisClient.on("error", err => {
  console.log("Redis error: ", err);
});
app.use(
  session({
    secret: "mySessionCode",
    resave: false,
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 86400
    }),
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// app.disable('x-powered-by')
app.use(
  multerMid.fields([
    { name: "photo", maxCount: 3 },
    { name: "user", maxCount: 2 }
  ])
);

app.use("/upload-img", upload);
app.use("/register", register);
app.use("/reset-password", reset_password);
app.use("/loginEmail", login);
app.use("/autoLogin", autoLogin);
app.use("/logout", logOut);
app.use("/add-new-local", addNewLocal);
app.use("/get-data-place", getDataPlace);
app.use("/delete-user", deleteUser);
app.use("/add-owner-post", addPosts);
app.use("/generation-code-for-client", generationCodeForClient);
app.use("/verification-client-code", verificationClientCode);
app.use("/add-client-opinion", addClientOpinion);
module.exports = app;
