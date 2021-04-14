const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    website: String,
    passwords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password",
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Collection", collectionSchema);