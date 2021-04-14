const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    collections: [{
        collId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            required: true
        }
    }]
}, {timestamp: true});

module.exports = mongoose.model('User', userSchema);