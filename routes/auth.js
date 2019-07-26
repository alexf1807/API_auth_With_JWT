const router = require("express").Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValFunc, loginValFunc } = require('../validation');
// const {loginValFunc} = require('../validation');


// ====== REGISTER ===========
router.post('/register', async (req, res) => {

// Validate the user input
    const { error } = registerValFunc(req.body) 
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
// Check if user email already exits
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(400).send('Email Already Exists')
    }

// Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


// Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        // res.send(savedUser)
        res.send({user:user._id})
    }catch(err){
        escape.satus(400).send(err);
    }
})



// ====== REGISTER ===========
router.post('/login', async (req, res) => {

// Validate the user input
    const { error } = loginValFunc(req.body) 
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
// Check if user email already exits
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send('Email Does Not Exist')
    }



// Check if user password is correct
    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!passwordCorrect) {
        return res.status(400).send('Password is incorrect')
    }

// Create and assign a JWT token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);    

// All validations are complete
    res.send("SUCCESS")




})



module.exports = router;