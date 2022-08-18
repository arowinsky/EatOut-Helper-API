const firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  credential: admin.credential.cert(serviceAccount)
};
firebase.initializeApp(config);
admin.initializeApp(config);
let db = firebase.firestore();
let auth = firebase.auth();
module.exports = { db, admin, auth };
