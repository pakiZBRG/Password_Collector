const Collection = require('../model/Collection');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const Password = require('../model/Password');

exports.newCollection = (req, res) => {
    let collId;
    const { userId } = jwt.decode(req.headers.token);

    const newCollection = new Collection({
        userId: userId,
        name: req.body.name,
        website: req.body.website,
        category: req.body.category
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
        // Add created collection to the User collections references
        .then(() => {
            User.findById(userId)
                .then(coll => {
                    const updatedCollection = [...coll.collections];
                    updatedCollection.push(collId);

                    coll.collections = updatedCollection;
                    return coll.save();
                })
        })
        .catch(err => res.status(500).json({ error: err }));
}

exports.getCollection = (req, res) => {
    Collection.findOne({_id: req.params.id})
        .select("-__v")
        .populate('userId')
        .populate("passwords", '-__v')
        .then(coll => {
            if(coll){
                res.status(200).json({ collection: {
                    _id: coll._id,
                    name: coll.name,
                    website: coll.website,
                    category: coll.category,
                    userId: {
                        _id: coll.userId._id,
                        email: coll.userId.email
                    },
                    passwords: coll.passwords
                }})
            } else {
                return res.status(410).json({ error: "No collections with given id" })
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

exports.deleteCollection = (req, res) => {
    const collId = req.params.id;
    let userCollId;

    Collection.findById({_id: collId})
        .then(coll => {
            if(!coll) {
                return res.status(200).json({ message: "No collection was found" });
            }
            userCollId = coll.userId
            // Delete passwords from the collection
            return Password.deleteMany({collector: collId});
        })
        // Find User who has the deleted collection and belongs to him
        .then(() => User.find({ collections: {$in: [collId]}, _id: userCollId }))
        .then(user => {
            user[0].collections.pull(collId);
            return user[0].save();
        })
        // Delete collection
        .then(() => Collection.findByIdAndRemove(collId))
        .then(() => {
            res.status(200).json({ message: "Deleted collection and its passwords" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

exports.updateCollection = (req, res) => {
    const id = req.params.id;
    const update = {};
    for(const i of req.body){
        update[i.name] = i.value;
    }
    Collection.updateOne({_id: id}, {$set: update})
        .exec()
        .then(() => {
            res.status(200).json({
                message: "Collection updated",
                url: `http://${req.get('host')}/collections/${id}`
            })
        })
        .catch(err => res.status(500).json({error: err.message}))
}