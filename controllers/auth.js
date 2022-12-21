// Require User Model
const User = require('../models/User');

// Require bcrypt
const bcrypt = require('bcrypt');
const salt = 10;

// Require Passport Configurations
let passport = require('../helper/ppConfig');

// API's for registration and Authentication

// HTTP GET - Signup Route -To load the signup form
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

// HTTP POST - Signup Route - To post the data
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);

    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;

    // Save user
    user.save()
    .then(()=>{
        res.redirect("/auth/signin");
    })
    .catch(err => {
        console.log(err);
        res.send("Please try again later.")
    })
}

// HTTP GET - Signin Route - To load the signin form
exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}


// HTTP POST - Signin Route - To post the data
exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
});

// HTTP GET - Logout Route - To logout the user
exports.auth_logout_get = (req, res) => {

    // Invalidate the session
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect("/auth/signin")
    });
}