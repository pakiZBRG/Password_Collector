const User = require('../model/User');
const Collection = require('../model/Collection');
const Password = require('../model/Password');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.userRegister = (req, res) => {
    // Validation and error handling
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(err => err.msg)[0];
        return res.status(422).json({ error: firstError });
    }

    // if no errors does the user exist in DB
    User.find({email: req.body.email})
        .then(user => {
            if(user.length > 0) {
                return res.status(409).json({ message: "User exists" });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({ error: err.message });
                    } else {
                        const newUser = new User({
                            email: req.body.email,
                            password: hash
                        });

                        newUser.save()
                            .then(() => res.status(201).json({ message: "User created" }))
                            .catch(err => res.status(500).json({ error: err.message }))
                    }
                })
            }
        });
}

exports.userLogin = (req, res) => {
    // Validation and error handling
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(err => err.msg)[0];
        return res.status(422).json({ error: firstError });
    }

    // if no errors does the user exist in DB
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(409).json({
                    message: "No user with given email",
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message: "Unauthorized user cant access."
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_SECRET, {expiresIn: "1h"});
                    return res.status(200).json({
                        message: "Signin successful",
                        token,
                        user
                    })
                } else {
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

exports.getUser = (req, res) => {
    const token = jwt.decode(req.headers.token);
    
    if(token){
        User.find({_id: token.userId})
            .select('-__v')
            // Populate a populated document
            .populate({
                path: 'collections',
                select: '-__v',
                populate: {
                    path: 'passwords',
                    select: '-__v'
                }
            })
            .then(user => {
                if(user){
                    res.status(200).json({
                        user
                    })
                } else {
                    return res.status(410).json({ message: "No user with given id" })
                }
            })
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        return res.status(401).json({ message: "Login or create an account" })
    }
    
}

exports.userDelete = (req, res) => {
    const userId = req.params.id;

    User.findById({_id: userId})
        .then(user => {
            if(!user) {
                return res.status(200).json({ message: "No user was found" });
            }
            // Delete user's collections
            return Collection.deleteMany({userId: userId});
        })
        // Delete user's password
        .then(() => Password.deleteMany({ userId: userId }))
        // Delete user
        .then(() => User.findByIdAndRemove(userId))
        .then(() => {
            res.status(200).json({ message: "Deleted user and its collections" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
}