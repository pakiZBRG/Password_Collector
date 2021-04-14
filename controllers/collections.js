const Collection = require('../model/Collection');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

exports.newCollection = (req, res) => {
    let collId;
    const { userId } = jwt.decode(req.headers.token);

    const newCollection = new Collection({
        userId: userId,
        name: req.body.name,
        website: req.body.website
    })

    // save new Collection
    newCollection.save()
        .then(collection => {
            collId = collection._id;
            res.status(201).json({ 
                message: "Collection successfully created",
                collection
            })
        })
        // Add it to the User collections references
        .then(() => {
            User.findById(userId)
                .then(user => {
                    const updatedCollection = [...user.collections];
                    updatedCollection.push(collId);

                    user.collections = updatedCollection;
                    return user.save();
                })
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getCollection = (req, res) => {
    Collection.findOne({_id: req.params.id})
        .select("-__v")
        .populate('userId')
        .then(coll => {
            if(coll){
                res.status(200).json({ collection: {
                    _id: coll._id,
                    name: coll.name,
                    website: coll.website,
                    userId: {
                        _id: coll.userId._id,
                        email: coll.userId.email
                    }
                }})
            } else {
                return res.status(410).json({ error: "No collections with given id" })
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
}