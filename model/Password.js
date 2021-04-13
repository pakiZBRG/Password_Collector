const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    webiste: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Password", passwordSchema);