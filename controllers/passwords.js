const Password = require('../model/Password');
const Collection = require('../model/Collection');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.newPassword = (req, res) => {
    let passId;
    const { userId } = jwt.decode(req.headers.token);
    console.log(userId)
    // Validation and error handling
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(err => err.msg)[0];
        return res.status(422).json({ error: firstError });
    }

    const newPassword = new Password({
        collector: req.body.collector,
        userId: req.loggedUser.userId,
        email: req.body.email,
        password: req.body.password
    })

    newPassword.save()
        .then(pass => {
            passId = pass._id;
            res.status(201).json({ 
                message: "Password successfully added!",
                password: pass
            })
        })
        // Add created password to the Collection passwords references
        .then(() => {
            Collection.findById(req.body.collector)
                .then(user => {
                    console.log(user)
                    const updatedPasswords = [...user.passwords];
                    updatedPasswords.push(passId);

                    user.passwords = updatedPasswords;
                    return user.save();
                })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

// user passwords
exports.getPasswords = (req, res) => {
    Password.find({userId: req.params.userId})
        .select("-__v")
        .populate('userId', '-__v')
        // Populate a populated document
        .populate({
            path: 'collector',
            select: '-__v',
            populate: {
                path: 'passwords',
                select: '-__v'
            }
        })
        .then(pass => {
            return res.status(200).json({
                count: pass.length,
                userPasswords: pass
            })
        })
        .catch(err => res.status(500).json({ error: err.message }));
}