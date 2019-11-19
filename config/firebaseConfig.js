const firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const config = {
  apiKey: "AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
  authDomain: "eatout-faae0.firebaseapp.com",
  databaseURL: "https://eatout-faae0.firebaseio.com",
  projectId: "eatout-faae0",
  storageBucket: "eatout-faae0.appspot.com",
  messagingSenderId: "734346628660",
  credential: admin.credential.cert(serviceAccount),
};
firebase.initializeApp(config);
admin.initializeApp(config);
let db = firebase.firestore();

module.exports = {db, admin};
