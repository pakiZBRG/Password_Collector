const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../utils/errorHandler');

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
                        return res.status(500).json({ error: errorHandler(err) });
                    } else {
                        const newUser = new User({
                            email: req.body.email,
                            password: hash
                        });

                        newUser.save()
                            .then(() => res.status(201).json({ message: "User created" }))
                            .catch(err => res.status(500).json({ error: errorHandler(err) }))
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
                    message: "No user with given email"
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
                        token
                    })
                } else {
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            })
        })
        .catch(err => res.status(500).json({ error: errorHandler(err) }))
}

exports.getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {
            if(user){
                res.status(200).json({
                    _id: user._id,
                    email: user.email
                })
            } else {
                return res.status(410).json({ message: "No user with given id" })
            }
        })
        .catch(err => res.status(500).json({ error: errorHandler(err) }));
}

exports.userDelete = (req, res) => {
    User.findByIdAndRemove({_id: req.params.id})
        .then(user => {
            if(user) {
                res.status(200).json({ message: "User deleted" });
            } else {
                res.status(401).json({ message: "No user was found" });
            }
        })
        .catch(err => res.status(500).json({ error: errorHandler(err) }));
}