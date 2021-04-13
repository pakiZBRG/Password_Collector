const Password = require('../model/Password');
const { validationResult } = require('express-validator');

exports.newPassword = (req, res) => {
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
            res.status(201).json({ 
                message: "Password successfully added!",
                password: pass
            })
        })
        .catch(err => res.status(500).json({ error: err.message }))
}

exports.getPasswords = (req, res) => {
    Password.find({userId: req.params.userId})
        .select("-__v")
        .populate('userId', '-__v')
        .populate('collector', '-__v')
        .then(pass => {
            return res.status(200).json({
                count: pass.length,
                passwords: pass
            })
        })
        .catch(err => res.status(500).json({ error: err.message }));
}