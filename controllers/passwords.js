const Password = require('../model/Password');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../utils/errorHandler');

exports.newPassword = (req, res) => {
    // Validation and error handling
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array().map(err => err.msg)[0];
        return res.status(422).json({ error: firstError });
    }

    const newPassword = new Password({
        webiste: req.body.website,
        email: req.body.email,
        password: req.body.password
    })

    newPassword.save()
        .then(() => res.status(201).json({ message: "Password successfully added!" }))
        .catch(err => res.status(500).json({ error: err.message }))
}