const User = require('../model/User');
const Collection = require('../model/Collection');
const Password = require('../model/Password');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
                return res.status(409).json({ error: "User with given email exists" });
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
                    error: "No user with given email",
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        error: "Unauthorized user cant access."
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
                        user: {
                            id: user._id,
                            email: user.email
                        }
                    })
                } else {
                    return res.status(401).json({ error: "Invalid credentials" })
                }
            })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

exports.forgotPassword = async (req, res) => {
    // Validation and error handling
    const errors = validationResult(req);
    const email = req.body.email;

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({ error: firstError })
    }
    else {
        //If user with given email exists
        const user = await User.findOne({email});
        if(user){
            //Generate token for 15 minutes
            const token = jwt.sign({_id: user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '15min'});
            
            //Send email with this token
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: req.body.email,
                subject: "Reset password link",
                html: `
                    <h4>Please Click on Link to Reset Password:</h4>
                    <p>http://localhost:5000/users/resetpassword/${token}</p>
                `
            }
    
            const transport = {
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.EMAIL_PASSWORD
                }
            };
            const transporter = nodemailer.createTransport(transport);
    
            transporter.verify((err, success) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Server is ready to take messages");
                }
            });
    
            transporter.sendMail(emailData, function(err, info){
                if(err) {
                    console.log(err);
                } else {
                    console.log(`Email send to ${info.response}`);
                    res.status(200).json({ message: `Email has been sent to ${email}` });
                }
            });
        } else {
            return res.status(401).json({ message: "No user with given email" });
        }
    }
}

exports.resetPassword = (req, res) => {
    const link = req.params.link;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({ error: firstError })
    } else {
        jwt.verify(link, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if(err) {
                return res.status(400).json({ error: "Expired Link, send another one." })
            }
            User.findOne({_id: decoded._id}, async (err, user) => {
                if(err || !user){
                    return res.status(400).json({ error: "Error occured. Try again by sending another reset password link." });
                }
                
                const newHashPassword = await bcrypt.hash(req.body.password, 10);
                const updatedUser = {
                    password: newHashPassword,
                }

                user = _.extend(user, updatedUser);
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({ error: 'Error resetting user password' });
                    }
                    res.json({message: 'Password successfully reseted'});
                });
            });
        });
    }
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