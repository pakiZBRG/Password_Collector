const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: String,
    website: String
})

module.exports = mongoose.model("Collection", collectionSchema);