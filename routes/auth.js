const router = require('express').Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        // isAdmin: req.body.password
    });

    try {
        // console.log("Backened");
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials!");
        user.password !== req.body.password && res.status(401).json("Wrong Credentials!");
        res.status(200).json("Access Granted!");
        console.log(req.session);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;
