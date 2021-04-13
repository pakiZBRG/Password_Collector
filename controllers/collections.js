const Collection = require('../model/Collection');
const jwt = require('jsonwebtoken');

exports.newCollection = (req, res) => {
    const { userId } = jwt.decode(req.headers.token);
    const newCollection = new Collection({
        name: req.body.name,
        website: req.body.website
    })

    newCollection.save()
        .then(coll => {
            res.status(201).json({ 
                message: "Collection successfully created",
                collection: coll
            })
        })
        .catch(err => res.status(500).json({ error: err.message }));
}

exports.getCollection = (req, res) => {
    Collection.findOne({_id: req.params.id})
        .select("-__v")
        .populate('user')
        .then(coll => {
            res.status(200).json({ collection: coll })
        })
        .catch(err => res.status(500).json({ error: err.message }));
}