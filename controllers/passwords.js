const Password = require('../model/Password');
const Collection = require('../model/Collection');
const { validationResult } = require('express-validator');

exports.newPassword = (req, res) => {
    let passId;
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

exports.deletePassword = (req, res) => {
    const passId = req.params.id;
    
    Password.findById(passId)
        .then(pass => {
            if(!pass){
                return res.status(404).json({ messsage: "No password with given id" })
            }
            // Find collection with password we want to delete and remove its ref
            return Collection.find({ passwords: {$in: [passId]} })
        })
        .then(coll => {
            coll[0].passwords.pull(passId);
            return coll[0].save();
        })
        // Delete password
        .then(() => Password.findByIdAndRemove(passId))
        .then(() => {
            res.status(200).json({ message: "Password successfully deleted" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

exports.updatePassword = (req, res) => {
    const id = req.params.id;
    const update = {};
    for(const i of req.body){
        update[i.name] = i.value;
    }
    Password.updateOne({_id: id}, {$set: update})
        .exec()
        .then(() => {
            res.status(200).json({
                message: "Password updated",
                url: `http://${req.get('host')}/api/products/${id}`
            })
        })
        .catch(err => res.status(500).json({error: err.message}))
}