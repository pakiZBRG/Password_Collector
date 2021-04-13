const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Password", passwordSchema);