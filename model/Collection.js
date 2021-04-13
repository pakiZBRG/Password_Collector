const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    website: String
})

module.exports = mongoose.model("Collection", collectionSchema);