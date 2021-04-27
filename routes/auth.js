const router = require("express").Router();
const User = require("../models/User");
const {registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
router.post('/register', async (req, res) => {

    // Validate Data before making user
    const {error} = registerValidation(req.body);
    if(error) {
        res.status(400)
        return res.json({status:"400", error:error.details[0].message});
    }

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    const usernameExist = await User.findOne({username: req.body.username});
    if(emailExist){
        res.status(400);
        return res.json({status:"400", error:"Email already exists!"});
    }
    if(usernameExist) {
        res.status(400);
        return res.json({status:"400", error:"Username already exists!"});
    }

    // Hashing Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
     });
    try {
        const savedUser = await user.save();
        return res.json({status:"200",user: user._id });
    } catch (error) {
        res.status(400);
        return res.json({status:"400",error:error});
        // console.log(error)
    }
});


// Login
router.post('/login', async (req,res) => {
    // Validate User before login
    const {error} = loginValidation(req.body);
    if(error) {
        res.status(400);
        return res.json({status:"400", error: error.details[0].message});
    }
    // Find if email exists in DB
    const user = await User.findOne({email : req.body.email});
    if(!user) {
        res.status(400);
        return res.json({status:"400", error:"Invalid Email/Password!"});
    }
    // Checking Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        res.status(400);
        return res.json({status:"400",error:"Invalid Email/Password!"});
    }

    // Create a token
    const token = jwt.sign({_id : user._id},process.env.SECRET_TOKEN);
    res.header('auth-token',token);
    res.status(200);
    res.json({status:"200"});
});


module.exports = router;