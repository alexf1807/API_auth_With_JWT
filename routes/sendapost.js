const router = require("express").Router();
const verify = require("./verifyToken");

router.get('/', verify, (req,res) => {
    res.json({posts: {title: "My First Response Post", description: "It's just for a test, but you must be logged in!"}})
})

module.exports = router