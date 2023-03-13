const { json } = require('express');
const express = require('express')
const User = require("../models/user.model");
const {jwtGen,jwtVerify} = require("../utils/utils");
const authRouter = express.Router()

authRouter.post("/signup", (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()}).then( existingUser => {

        if (existingUser !== null) {
            return res.status(400).json({error:"That username already exists!"});
        }
        if(!req.body.username||!req.body.password){
            return res.status(406).json({error:"Username or password can't be empty"});
        }
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(500).json({error:err});
            }
            const token = jwtGen(user.toObject());
            return res.status(201).json({success: true, token});
        });
    });
});

authRouter.post("/login", (req, res) => {
    console.log(req.body)
    // bb = JSON.parse(req.body)
    User.findOne({username: req.body.username.toLowerCase()}).then(data => {
        if (!data || data.password !== req.body.password) {
           return res.status(403).json({error:"Username or password are incorrect"});

        }

        const token = jwtGen(data.toObject());

        return res.json({token, success: true})
    });
});

module.exports ={authRouter}