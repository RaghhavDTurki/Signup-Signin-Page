const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyToken");

router.get('/private',verify, async (req,res) => {
    // res.json({total_users:"3", view_access:true});
    // res.send(req.user);
    const user = await User.findOne({_id:req.user._id});
    res.send({username:user.username ,email:user.email});
    // console.log(user);

});

module.exports = router;