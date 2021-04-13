const Collection = require('../model/Collection');

exports.newCollection = (req, res) => {
    const newCollection = new Collection({
        name: req.body.name,
        website: req.body.website
    })

    newCollection.save()
        .then(() => res.status(201).json({ message: "Collection successfully created" }))
        .catch(err => res.status(500).json({ error: err.message }));
}