const express = require("express");
const router = express.Router();
const {db, admin} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const post = req.body.post;
    const nameLocal = req.body.nameLocal;
    const local = req.body.local;
    

        db.collection('eatingPlace').doc(local).collection('posts_owner').doc().set({ post: post, author: nameLocal, data: new Date() })
            .then(() => {
                res.json({
                    addedPost:true
                })
            })

});
module.exports = router;